import axios from "axios";
import "dotenv/config";
export const $gpt = axios.create({
    baseURL: "https://api.theb.ai/v1/",
    headers: {
        Authorization: `Bearer ${process.env.KEY}`,
        "Content-Type": "application/json",
    },
});
