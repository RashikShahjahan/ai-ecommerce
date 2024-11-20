import { pool } from './vectordb';
import { VoyageAIClient } from "voyageai";

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

  
function arrayToVector(arr: number[]): string {
  const formattedNumbers = arr.map(num => num.toFixed(8));
  return `[${formattedNumbers.join(',')}]`;
}

export async function storeEssenceEmbedding(essenceId: string, content: string): Promise<void> {
  const embedding = await generateEmbedding(content);
  const vectorString = arrayToVector(embedding);
  await pool.query(
    'INSERT INTO essenceEmbeddings (essenceId, content, embedding) VALUES ($1, $2, $3::vector)',
    [essenceId, content, vectorString]
  );
}

export async function findSimilarDocuments(essenceId: string, query: string, limit: number = 1): Promise<string[]> {
  const queryEmbedding = await generateEmbedding(query);
  const vectorString = arrayToVector(queryEmbedding);
  const result = await pool.query(
    `SELECT content, embedding <-> $1::vector as distance
     FROM essenceEmbeddings
     WHERE essenceId = $2
     ORDER BY distance ASC
     LIMIT $3`,
    [vectorString, essenceId, limit]
  );

  return result.rows.map((row) => row.content);
}