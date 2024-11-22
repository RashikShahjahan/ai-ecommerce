import { VoyageAIClient } from "voyageai";
import pgvector from 'pgvector';
import prisma from '../../../prisma/client';

const client = new VoyageAIClient({ apiKey: process.env.VOYAGE_API_KEY });

async function generateEmbedding(text: string): Promise<number[]> {
    try {
        const response = await client.embed({
            input: text,
            model: "voyage-3",
        });
        if (response.data && response.data[0] && response.data[0].embedding) {
            return response.data[0].embedding;
        }
        console.error("No embedding data found in the response", response);
        return [];
    } catch (error) {
        console.error("Error generating embedding", error);
        return [];
    }
}


export async function storeEssenceEmbedding(essenceId: string, content: string): Promise<void> {
  const embedding = await generateEmbedding(content);
  const vectorString = pgvector.toSql(embedding);
  await prisma.$executeRaw`
    UPDATE "Essence" 
    SET embedding = ${vectorString}::vector
    WHERE id = ${essenceId}
  `;
}

export async function findSimilarDocuments(query: string, limit: number = 3): Promise<any[]> {
  const queryEmbedding = await generateEmbedding(query);
  const vectorString = pgvector.toSql(queryEmbedding);
  const result = await prisma.$queryRaw<Array<any>>`
    SELECT 
      id,
      name,
      description,
      price,
      stock,
      1 - (embedding <-> ${vectorString}::vector) as similarity
    FROM "Essence"
    ORDER BY similarity DESC
    LIMIT ${limit}
  `;

  return result;
}