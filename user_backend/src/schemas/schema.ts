import { z } from "zod";

export const EssenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  distance: z.number(),
});

export const FormattedEssenceSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  similarity: z.number(),
});

export const MessageContentSchema = z.object({
  type: z.string(),
  text: z.string(),
});


export const ProductSearchResultSchema = z.object({
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  similarity: z.number(),
});


export const ToolResultSchema = z.discriminatedUnion('toolName', [
  z.object({
    toolName: z.literal('searchEssences'),
    data: z.array(ProductSearchResultSchema)
  }),
]);

export const ChatResponseSchema = z.object({
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

export const searchEssenceResponseSchema = z.array(EssenceSchema);

export type Essence = z.infer<typeof EssenceSchema>;
export type FormattedEssence = z.infer<typeof FormattedEssenceSchema>;
export type ChatResponse = z.infer<typeof ChatResponseSchema>;
export type ToolUse = z.infer<typeof ToolUseSchema>;
export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type SearchEssencesResponse = z.infer<typeof searchEssenceResponseSchema>;
export type ProductSearchResult = z.infer<typeof ProductSearchResultSchema>;
export type ToolResult = z.infer<typeof ToolResultSchema>;
export type Message = z.infer<typeof messageSchema>;
export type MessageRole = z.infer<typeof messageRoleSchema>;

