import { Anthropic } from '@anthropic-ai/sdk';
import { ADD_ESSENSE_TO_CART_TOOL, ESSENCE_SEARCH_TOOL } from './tools/tool';
import { addEssenceToCart } from './tools/cart';
import { findSimilarDocuments } from './utils/embeddings';
import type { MessageParam, TextBlockParam } from '@anthropic-ai/sdk/src/resources/messages.js';
import  { 
    type ChatResponse, 
    ToolUseSchema,
    type MessageRole,
    type ToolResult
} from '../schemas/schema';
import prisma from '../../prisma/client';

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY 
});

async function processToolCall(toolName: string, toolInput: Record<string, unknown>, userId: string): Promise<ToolResult> {
    switch (toolName) {
        case "searchEssences": {
            const query = toolInput.query;
            const results = await findSimilarDocuments(query as string);
            return {
                toolName: "searchEssences",
                data: results
            };
        }
        case "addEssenceToCart": {
            const query = toolInput.query;
            const results = await findSimilarDocuments(query as string, 1);
            const essenceId = results[0].id;

            const cart = await addEssenceToCart(essenceId, userId);
            return {
                toolName: "addEssenceToCart",
                data: cart
            };
        }
        default:
            throw new Error(`Unknown tool: ${toolName}`);
    }
}

async function formatToolResult(toolResult: ToolResult): Promise<TextBlockParam> {
    switch (toolResult.toolName) {
        case "searchEssences":
            return {
                type: "text",
                text: `${toolResult.data.map(essence => `
                    Name: ${essence.name}
                    Description: ${essence.description}
                    Price: ${essence.price}
                    Stock: ${essence.stock}
                    Similarity: ${Number((1 - essence.similarity).toFixed(2))}
                `).join('\n')}`
            };
        case "addEssenceToCart":
            return {
                type: "text",
                text: `Added to cart:
                    ${toolResult.data.items.map(item => `
                    - ${item.name}
                      Price: $${item.price}
                      Subtotal: $${item.price}
                    `).join('')}
                    -------------------------
                    Total Items: ${toolResult.data.items.length}
                    Cart Total: $${toolResult.data.total}`
            };
        default:
            throw new Error(`Unknown tool result type: ${toolResult}`);
    }
}

export async function chat(prompt: string, userId: string): Promise<ChatResponse> {
    // Get previous messages for this user
    const previousMessages = await prisma.message.findMany({
        where: { userId: userId },
        orderBy: { id: 'asc' },
        select: { role: true, content: true }
    });

    // Save the new user message
    await prisma.message.create({
        data: {
            content: prompt,
            role: "user",
            userId: userId
        }
    });

    const messages: MessageParam[] = [
        ...previousMessages.map(msg => ({ 
            role: msg.role as MessageRole, 
            content: msg.content 
        })),
        { role: "user", content: prompt }
    ];

    const message = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [ESSENCE_SEARCH_TOOL, ADD_ESSENSE_TO_CART_TOOL],
        messages: messages,
    });

    if (message.stop_reason === "tool_use") {
        const toolUseContent = message.content.find(c => c.type === "tool_use");
        const toolUse = ToolUseSchema.parse(toolUseContent);
        const toolResult = await processToolCall(toolUse.name, toolUse.input, userId);
        
        const formattedToolResult: TextBlockParam = await formatToolResult(toolResult);

        const messages: MessageParam[] = [
            ...previousMessages.map(msg => ({ 
                role: msg.role as MessageRole, 
                content: msg.content 
            })),
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
            tools: [ESSENCE_SEARCH_TOOL, ADD_ESSENSE_TO_CART_TOOL],
            messages: messages
        });


        return {
            message: finalMessage.content.map(block => ({
                type: block.type,
                text: 'text' in block ? block.text : JSON.stringify(block)
            })),
            toolResults: toolResult ? [toolResult] : null
        };
    }

    return {
        message: message.content.map(block => ({
            type: block.type,
            text: 'text' in block ? block.text : JSON.stringify(block)
        })),
        toolResults: null
    };
}

