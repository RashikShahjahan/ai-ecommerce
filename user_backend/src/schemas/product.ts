import { z } from "zod";


const EssenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
});

export const chatRequestSchema = z.object({
  query: z.string(),
});

export const searchEssenceResponseSchema = z.array(EssenceSchema);


export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type SearchEssencesResponse = z.infer<typeof searchEssenceResponseSchema>;


