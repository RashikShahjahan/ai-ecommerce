import { Anthropic } from '@anthropic-ai/sdk';
import { PRODUCT_SEARCH_TOOL } from './tools/product';
import { findSimilarDocuments } from './utils/embeddings';
import type { MessageParam, TextBlockParam } from '@anthropic-ai/sdk/src/resources/messages.js';
import  { 
    type Essence, 
    type ChatResponse, 
    ToolUseSchema,
    ChatResponseSchema,
    type Message,
    type MessageRole
} from '../schemas/schema';
import prisma from '../../prisma/client';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY 
});

async function processToolCall(toolName: string, toolInput: Record<string, unknown>): Promise<Essence[]> {
    switch (toolName) {
        case "searchEssences":
            const query = toolInput.query;
            if (typeof query !== 'string') {
                throw new Error('Query must be a string');
            }
            const essences = await findSimilarDocuments(query);
            return essences.map(essence => ({
                id: essence.id,
                name: essence.description,
                description: essence.description,
                price: essence.price,
                stock: essence.stock,
                distance: essence.distance
            }));
        default:
            throw new Error(`Unknown tool: ${toolName}`);
    }
}

export async function chat(prompt: string, chatId: string): Promise<ChatResponse> {
    if (chatId === "") {
        const newChat = await prisma.chatHistory.create({
            data: {
                messages: {
                    create: [{ content: prompt, role: "user" }]
                },
                userId: "1"
            }
        });
        chatId = newChat.id;
    }

    const chatHistory = await prisma.chatHistory.findUnique({
        where: {
            id: chatId
        },
        select: {
            messages: true
        }
    });

    if (!chatHistory) {
        throw new Error("Chat history not found");
    }

    const previousMessages: Message[] = chatHistory.messages.map((message) => ({ 
        role: message.role as MessageRole, 
        content: message.content 
    }));

    const message = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [PRODUCT_SEARCH_TOOL],
        messages: [...previousMessages, { role: "user", content: prompt }],
        });

        if (message.stop_reason === "tool_use") {
            const toolUseContent = message.content.find(c => c.type === "tool_use");
            if (!toolUseContent) {
                throw new Error("Tool use content not found");
            }
            const toolUse = ToolUseSchema.parse(toolUseContent);
            
            const toolResult = await processToolCall(toolUse.name, toolUse.input);
            if (!toolResult) {
                throw new Error("Tool result is null");
            }

            const formattedToolResult: TextBlockParam = {
                type: "text",
                text: `${toolResult.map(essence => `
                    Name: ${essence.name}
                    Description: ${essence.description}
                    Price: ${essence.price}
                    Stock: ${essence.stock}
                    Similarity: ${Number((1 - essence.distance).toFixed(2))}
                `).join('\n')}`
            };

            const messages: MessageParam[] = [
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
                messages: messages
            });

            const response = {
                message: [finalMessage.content[0]],
                toolResults: [{
                    toolName: toolUse.name,
                    data: toolResult.map(essence => ({
                        name: essence.name,
                        description: essence.description,
                        price: essence.price,
                        stock: essence.stock,
                        similarity: Number((1 - essence.distance).toFixed(2))
                    }))
                }]
            };

            return ChatResponseSchema.parse(response);
        }

        return ChatResponseSchema.parse({
            message: message.content,
            toolResults: null
        });

}

