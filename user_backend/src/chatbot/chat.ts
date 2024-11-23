import { Anthropic } from '@anthropic-ai/sdk';
import { ADD_ESSENSE_TO_CART_TOOL, ESSENCE_SEARCH_TOOL, GET_CART_TOOL } from './tools/tool';
import { addEssenceToCart, getCart } from './tools/cart';
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
        case "getCart": {
            const cart = await getCart(userId);
            
            return {
                toolName: "getCart",
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
                text: toolResult.data.map(essence => 
                    `Name: ${essence.name}\nDescription: ${essence.description}\nPrice: ${essence.price}\nStock: ${essence.stock}\nSimilarity: ${Number((1 - essence.similarity).toFixed(2))}`
                ).join('\n').trim()
            };
        case "addEssenceToCart":
            return {
                type: "text",
                text: `Added to cart:${toolResult.data.items.map(item => 
                    `\n- ${item.name}\n  Price: $${item.price}\n  Subtotal: $${item.price}`
                ).join('')}\n-------------------------\nTotal Items: ${toolResult.data.items.length}\nCart Total: $${toolResult.data.total}`.trim()
            };
        case "getCart":
            return {
                type: "text",
                text: `Current cart:${toolResult.data.items.map(item => 
                    `\n- ${item.name}\n  Price: $${item.price}\n  Subtotal: $${item.price}`
                ).join('')}\n-------------------------\nTotal Items: ${toolResult.data.items.length}\nCart Total: $${toolResult.data.total}`.trim()
            };
        default:
            throw new Error(`Unknown tool result type: ${toolResult}`);
    }
}

export async function chat(prompt: string, userId: string): Promise<ChatResponse> {
    await prisma.message.create({
        data: {
            content: prompt,
            role: "user",
            userId: userId
        }
    });

    const previousMessages = await prisma.message.findMany({
        where: { userId: userId },
        orderBy: { id: 'asc' },
        select: { role: true, content: true }
    });
 

    const messages: MessageParam[] = [
        ...previousMessages.map(msg => ({ 
            role: msg.role as MessageRole, 
            content: msg.content 
        })),
    ];

    const callToolResponse = await client.messages.create({
        model: "claude-3-5-sonnet-20241022",
        max_tokens: 1024,
        tools: [ESSENCE_SEARCH_TOOL, ADD_ESSENSE_TO_CART_TOOL, GET_CART_TOOL],
        messages: messages,
    });

    await prisma.message.create({
        data: {
            content: JSON.stringify(callToolResponse.content),
            role: "assistant",
            userId: userId
        }
    });



    if (callToolResponse.stop_reason === "tool_use") {
        const toolUseContent = callToolResponse.content.find(c => c.type === "tool_use");
        const toolUse = ToolUseSchema.parse(toolUseContent);
        const toolResult = await processToolCall(toolUse.name, toolUse.input, userId);
        const formattedToolResult = await formatToolResult(toolResult);

    
        // Make another call to Claude with the updated conversation
        const finalResponse = await client.messages.create({
            model: "claude-3-5-sonnet-20241022",
            max_tokens: 1024,
            tools: [ESSENCE_SEARCH_TOOL, ADD_ESSENSE_TO_CART_TOOL, GET_CART_TOOL],
            messages: [
                ...messages,
                { role: "assistant", content: [callToolResponse.content[0]] },
                { role: "user", content: [formattedToolResult] }
            ],
        });

        return {
            message: finalResponse.content.map(block => ({
                type: block.type,
                text: 'text' in block ? block.text : JSON.stringify(block)
            })),
            toolResults: [toolResult]
        };
    }

    return {
        message: callToolResponse.content.map(block => ({
            type: block.type,
            text: 'text' in block ? block.text : JSON.stringify(block)
        })),
        toolResults: null
    };
}

