import { Anthropic } from '@anthropic-ai/sdk';
import { PRODUCT_SEARCH_TOOL } from './tools/product';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY 
});

export async function chat(prompt: string): Promise<string> {
    try {
        const message = await client.messages.create({
            model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [PRODUCT_SEARCH_TOOL],
        messages: [
            { 
                role: "user", 
                content: `Use the relevant tool to follow the user's command and respond in a friendly and helpful manner: ${prompt}` 
            }
        ],
    });

    if (message.content[0].type === "text") {
        return message.content[0].text;
    }

        return "No response from the chatbot.";
    } catch (error) {
        console.error(error);
        return "An error occurred while processing your request.";
    }
}

