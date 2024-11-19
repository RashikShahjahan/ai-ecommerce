import { Anthropic } from '@anthropic-ai/sdk';
import { PRODUCT_SEARCH_TOOL } from './tools';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY 
});



async function toolCall(prompt: string): Promise<void> {
    const message = await client.messages.create({
        model: "claude-3-5-sonnet",
        max_tokens: 1024,
        tools: [PRODUCT_SEARCH_TOOL],
        messages: [
            { 
                role: "user", 
                content: `Search for products matching: ${prompt}` 
            }
        ],
    });

    console.log(message.content[0].type);
}

