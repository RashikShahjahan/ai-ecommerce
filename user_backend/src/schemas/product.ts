import { z } from "zod";

const ManifestationSchema = z.object({
  id: z.string(),
  intensity: z.string(),
  clarity: z.string(),
  frequency: z.string(),
  price: z.number(),
  stock: z.string(),
});

const EssenceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  energySignature: z.string(),
  manifestation: z.array(ManifestationSchema),
  duration: z.enum(['EPHEMERAL', 'TEMPORAL', 'PERSISTENT', 'ETERNAL']),
  origin: z.string(),
  sideEffects: z.array(z.string()),
});

export const chatRequestSchema = z.object({
  query: z.string(),
});

export const searchEssenceResponseSchema = z.array(EssenceSchema);


export type ChatRequest = z.infer<typeof chatRequestSchema>;
export type SearchEssencesResponse = z.infer<typeof searchEssenceResponseSchema>;


