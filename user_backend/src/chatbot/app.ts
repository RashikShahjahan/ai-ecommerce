import { Anthropic } from '@anthropic-ai/sdk';
import { PRODUCT_SEARCH_TOOL } from './tools/product';
import { findSimilarDocuments } from './utils/embeddings';
import type { MessageParam } from '@anthropic-ai/sdk/src/resources/messages.js';
const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY 
});

async function processToolCall(toolName: string, toolInput: any) {
    if (toolName === "searchEssences") {
        return await findSimilarDocuments(toolInput.query);
    }
    return null;
}

export async function chat(prompt: string): Promise<{ message: any[] }> {
    try {
        const message = await client.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            tools: [PRODUCT_SEARCH_TOOL],
            messages: [{ role: "user", content: prompt }],
        });

        // If tool use is requested
        if (message.stop_reason === "tool_use") {
            const toolUse = message.content.find(c => c.type === "tool_use");
            
            if (!toolUse) {
                throw new Error("Tool use object not found in message content");
            }
            
            const toolResult = await processToolCall(toolUse.name, toolUse.input);
            if (!toolResult) {
                throw new Error("Tool result is null");
            }



            const formattedToolResult = {
                type: "text",
                text: toolResult.map(essence => (
                    `Name: ${essence.name}\n` +
                    `Description: ${essence.description}\n` +
                    `Price: $${essence.price}\n` +
                    `Stock: ${essence.stock}\n` +
                    `Similarity: ${(1 - essence.distance).toFixed(2)}`
                )).join('\n\n')
            };

            const messages = [
                { role: "user", content: prompt },
                { role: "assistant", content: message.content },
                { 
                    role: "user", 
                    content: [
                        {
                            type: "tool_result",
                            tool_use_id: toolUse.id,
                            content: [formattedToolResult]
                        }
                    ]
                },
                {
                    role: "user",
                    content: "Use the tool result to answer the question."
                }
            ];

            const finalMessage = await client.messages.create({
                model: "claude-3-5-sonnet-20241022",
                max_tokens: 1024,
                tools: [PRODUCT_SEARCH_TOOL],
                messages: messages as MessageParam[]
            });

            return {
                message: [finalMessage.content[0]]
            };
        }

        return {
            message: message.content
        };
    } catch (error) {
        console.error(error);
        return {
            message: ["An error occurred while processing your request."]
        };
    }
}

