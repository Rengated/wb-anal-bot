import TelegramBot from "node-telegram-bot-api";
import { getResponse } from "./gpt-api/getReponse.js";
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
    await bot.sendMessage(message.chat.id, "Привет, это бот для аналитики товаров, чтобы получить ответ, используй команду /link [ссылка на ваш товар]");
  }
  if (message.text.startsWith("/link")) {
    const [, link] = message.text.split(" ");
    if (link.includes("https://www.wildberries.ru/")) {
      try {
        const feedbackId = await scrapHtml(link, browser);
        const feedbacks = await fetchFeedbacks(feedbackId);
        const filteredFeedbacks = await filterFeedbacks(feedbacks);
        const gptResponse = await getResponse(filteredFeedbacks.join("\n\n"));
        await bot.sendMessage(message.chat.id, gptResponse);
      } catch (err) {
        console.log(err);
        await bot.sendMessage(message.chat.id, "Произошла ошибка, или отзывы не найдены");
      }
    } else {
      await bot.sendMessage(message.chat.id, "Пришлите валидную ссылку на товар");
    }
  }
});
