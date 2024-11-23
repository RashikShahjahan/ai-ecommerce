import { z } from "zod";

// Base schemas for reuse
const baseItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
});

// Essence schemas
export const EssenceSchema = baseItemSchema;
export const EssenceResultSchema = baseItemSchema.extend({
  similarity: z.number(),
});

// Cart schemas
export const CartSchema = z.object({
  id: z.string(),
  userId: z.string(),
  items: z.array(EssenceSchema),
  total: z.number(),
});

// Message schemas
export const MessageRoleSchema = z.enum(["user", "assistant"]);
export const MessageContentSchema = z.object({
  type: z.string(),
  text: z.string(),
});
export const MessageSchema = z.object({
  role: MessageRoleSchema,
  content: z.string(),
});

// Tool schemas
export const ToolResultSchema = z.discriminatedUnion('toolName', [
  z.object({
    toolName: z.literal('searchEssences'),
    data: z.array(EssenceResultSchema)
  }),
  z.object({
    toolName: z.literal('addEssenceToCart'),
    data: CartSchema
  }),
  z.object({
    toolName: z.literal('getCart'),
    data: CartSchema
  })
]);

export const ToolUseSchema = z.object({
  type: z.literal('tool_use'),
  name: z.string(),
  id: z.string(),
  input: z.record(z.any()),
});

// Chat schemas
export const ChatRequestSchema = z.object({
  query: z.string(),
});

export const ChatResponseSchema = z.object({
  message: z.array(MessageContentSchema),
  toolResults: z.array(ToolResultSchema).nullable(),
});

// User schema
export const UserSchema = z.object({
  id: z.string(),
  clerkId: z.string(),
});

// Type exports
export type EssenceResult = z.infer<typeof EssenceResultSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type ToolUse = z.infer<typeof ToolUseSchema>;
export type ChatRequest = z.infer<typeof ChatRequestSchema>;
export type ToolResult = z.infer<typeof ToolResultSchema>;
export type Message = z.infer<typeof MessageSchema>;
export type MessageRole = z.infer<typeof MessageRoleSchema>;
export type User = z.infer<typeof UserSchema>;
export type Cart = z.infer<typeof CartSchema>;