import { $gpt } from "./index.js";

export const getResponse = async (text: string) => {
  const template = {
    messages: [
      {
        content:
          `Анализируйте содержимое отзывов. Определяй ключевые характеристики товара и основные проблемы, упомянутые в отзывах.
Оценка тональности отзыва:
Определите, положителен, нейтрален, или отрицателен общий тон отзыва.
Анализ содержимого:
Идентифицируйте и выделите ключевые слова и выракования, которые могут указывать на сильные и слабые стороны товара.
Выявление часто упомянутых проблем:
Соберите и суммируйте часто упоминаемые потребителями проблемы или моменты, связанные с товаром.` + text,
        role: "user",
      },
    ],
    model: "gpt-4",
  };
  try {
    const response = await $gpt.post("chat/completions", template);
    return response.data.choices[0].message.content;
  } catch (err) {
    return JSON.stringify(err);
  }
};
