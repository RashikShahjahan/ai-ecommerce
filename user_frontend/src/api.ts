import axios from "axios";

export const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

export const getChatResponse = async (query: string, chatId: string) => {
    const response = await client.get("/chat", {
        params: {
            query,
            chatId,
        },
    });
    return response.data;
};

