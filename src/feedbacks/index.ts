import axios from "axios";

const fetchFeedbacks = async (id: string) => {
  let response = (await axios.get(`https://feedbacks1.wb.ru/feedbacks/v1/${id}`)).data;
  if (!response.feedbacks) {
    response = (await axios.get(`https://feedbacks2.wb.ru/feedbacks/v1/${id}`)).data;
  }

  return response;
};

const filterFeedbacks = (response: any) => {
  return response.feedbacks.map((item: any) => item.text).slice(0, 100);
};

export { filterFeedbacks, fetchFeedbacks };
