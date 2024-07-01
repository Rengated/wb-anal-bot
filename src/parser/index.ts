import puppeteer, { Browser } from "puppeteer";

export const scrapHtml = async (aritcle: number, browser: Browser): Promise<string> => {
  const page = await browser.newPage();
  await page.goto(`https://www.wildberries.ru/catalog/${aritcle}/detail.aspx`, { waitUntil: "networkidle2" });

  const linkElement = await page.$("a.product-page__reviews");
  const id = (await linkElement!.evaluateHandle((element) => (element as HTMLAnchorElement).href)).toString().split("?")[1].split("=")[1];
  await page.close();
  return id;
};
