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

export const getChatResponse = async (query: string, chatId: string) => {    
    const response = await client.get("/chat", {
        params: {
            query,
            chatId,
        }
    });
    return response.data;
};


