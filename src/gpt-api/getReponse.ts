import { $gpt } from "./index.js";

export const getResponse = async (text: string) => {
  const template = {
    messages: [
      {
        content: "Пришли аналитику отзывов по товару, выдели плюсы и минусы, о чем пишут чаще, пришли самый лучший положительный и отрицательный отзывы, пиши максимально подробно" + text,
        role: "user",
      },
    ],
    model: "gpt-4",
  };
  try {
    const response = await $gpt.post("chat/completions", template);
    return response.data.choices[0].message.content;
  } catch (err) {
    return "Произошла ошибка";
  }
};
