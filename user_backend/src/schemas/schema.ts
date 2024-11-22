import { z } from "zod";

export const EssenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  distance: z.number(),
});

export const MessageContentSchema = z.object({
  type: z.string(),
  text: z.string(),
});

export const ToolResultSchema = z.discriminatedUnion('toolName', [
  z.object({
    toolName: z.literal('searchEssences'),
    data: z.array(EssenceSchema)
  }),
]);

export const ChatResponseSchema = z.object({
  chatId: z.string(),
  message: z.array(MessageContentSchema),
  toolResults: z.array(ToolResultSchema).nullable(),
});

export const ToolUseSchema = z.object({
  type: z.literal('tool_use'),
  name: z.string(),
  id: z.string(),
  input: z.record(z.any()),
});

export const chatRequestSchema = z.object({
  query: z.string(),
  chatId: z.string(),
});

export const messageRoleSchema = z.enum(["user", "assistant"]);

export const messageSchema = z.object({
  role: messageRoleSchema,
  content: z.string(),
});

export const userSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  address: z.string(),
});


export type Essence = z.infer<typeof EssenceSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type ToolUse = z.infer<typeof ToolUseSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type ToolResult = z.infer<typeof ToolResultSchema>;
export type Message = z.infer<typeof messageSchema>;
export type MessageRole = z.infer<typeof messageRoleSchema>;
export type User = z.infer<typeof userSchema>;

