import { API } from "../config/axios";

export const getAllReviews = async () => {
    const res = await API.get("/reviews");
    return res.data;
}

export const saveReview = async (data: any) => {
    const res = await API.post("/reviews", data);
    return res.data;
}