import { link } from "fs";
import puppeteer, { Browser } from "puppeteer";

export const scrapHtml = async (link: string, browser: Browser): Promise<string> => {
  const page = await browser.newPage();
  await page.goto(link, { waitUntil: "networkidle2" });

  const linkElement = await page.$("a.product-page__reviews");
  const id = (await linkElement!.evaluateHandle((element) => (element as HTMLAnchorElement).href)).toString().split("?")[1].split("=")[1];
  await page.close();
  return id;
};
