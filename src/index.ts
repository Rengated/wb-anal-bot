import axios from "axios";
import TelegramBot from "node-telegram-bot-api";
import { getResponse } from "./gpt-api/getReponse.js";
import { parse } from "node-html-parser";
import { fetchFeedbacks, filterFeedbacks } from "./feedbacks/index.js";

import "dotenv/config";
import { scrapHtml } from "./parser/index.js";
import puppeteer from "puppeteer";

const bot = new TelegramBot(process.env.BOT_KEY!, {
  polling: true,
});

const browser = await puppeteer.launch({
  headless: true, // Runs Chromium in headless mode.
  args: ["--no-sandbox", "--disable-setuid-sandbox"],
});

bot.on("text", async (message: any) => {
  if (message.text == "/start") {
    await bot.sendMessage(message.chat.id, "Привет, это бот для аналитики товаров, чтобы получить ответ, используй команду /article [ваш артикул]");
  }
  if (message.text.startsWith("/article")) {
    const [, aritcle] = message.text.split(" ");
    if (aritcle) {
      try {
        const feedbackId = await scrapHtml(aritcle, browser);
        const feedbacks = await fetchFeedbacks(feedbackId);
        const filteredFeedbacks = await filterFeedbacks(feedbacks);
        const gptResponse = await getResponse(filteredFeedbacks.join("\n\n"));
        await bot.sendMessage(message.chat.id, gptResponse);
      } catch (err) {
        console.log(err);
        await bot.sendMessage(message.chat.id, "Произошла ошибка, или отзывы не найдены");
      }
    }
  }
});
