import axios from "axios";
const fetchFeedbacks = async (id) => {
    const response = (await axios.get(`https://feedbacks1.wb.ru/feedbacks/v1/${id}`)).data;
    console.log(id, response);
    return response;
};
const filterFeedbacks = (response) => {
    return response.feedbacks.map((item) => item.text).slice(0, 100);
};
export { filterFeedbacks, fetchFeedbacks };
