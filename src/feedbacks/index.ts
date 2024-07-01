import axios from "axios";

const fetchFeedbacks = async (id: string) => {
  const response = (await axios.get(`https://feedbacks1.wb.ru/feedbacks/v1/${id}`)).data;
  console.log(id, response);
  return response;
};

const filterFeedbacks = (response: any) => {
  return response.feedbacks.map((item: any) => item.text).slice(0, 100);
};

export { filterFeedbacks, fetchFeedbacks };
