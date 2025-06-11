import axios from "axios";

const PREFIX_URL = 'http://localhost:8000/series/api/v1/series/'; 

export const getAllCategoryService = async () => {
    const response = await axios.get(PREFIX_URL);
    return response;
}