import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const setAuthToken = (token: string) => {
    client.interceptors.request.use((config) => {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
    });
};

export const getChatResponse = async (query: string) => {    
    const response = await client.post("/chat", {
        query,
    });
    return response.data;
};


