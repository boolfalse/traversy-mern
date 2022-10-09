
import axios from "axios";

const API_URL = "/api/goals/";

const httpOptions = (token) => {
    return {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    };
};

const goalService = {
    create: async (goalData, token) => {
        const response = await axios.post(API_URL, goalData, httpOptions(token));

        return response.data.data;
    },
    update: async (goalData, token) => {
        const response = await axios.put(API_URL + goalData.id, goalData, httpOptions(token));

        return response.data.data;
    },
    delete: async (goalId, token) => {
        const response = await axios.delete(API_URL + goalId, httpOptions(token));

        return response.data.data;
    },
    all: async (token) => {
        const response = await axios.get(API_URL, httpOptions(token));

        return response.data.data;
    },
    single: async (goalId, token) => {
        const response = await axios.get(API_URL + goalId, httpOptions(token));

        return response.data.data;
    }
};

export default goalService;
