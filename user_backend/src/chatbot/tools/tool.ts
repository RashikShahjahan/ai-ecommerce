export const ESSENCE_SEARCH_TOOL = {
  name: "searchEssences",
  description: "Performs a semantic similarity search across the essence database using only the 'name' and 'description' fields of each essence. The search converts the user's query into a vector embedding and compares it against the pre-computed embeddings of essence names and descriptions. This tool is ideal for finding essences based on their names (e.g., 'Teenage Angst') or their descriptive text (e.g., 'feeling of disappointment'). It does not search through other fields like price or stock levels. The tool returns matches ordered by semantic similarity to the query. For best results, queries should focus on describing the desired emotional state, life experience, or conceptual essence rather than physical properties.",
  input_schema: {
    type: "object" as "object",
    properties: {
      query: {
        type: "string",
        description: "A natural language search query that will be compared against essence names and descriptions. Example queries: 'something that captures the feeling of regret', 'essences related to Monday mornings', 'teenage-themed experiences'."
      }
    },
    required: ["query"]
  }
};

export const ADD_ESSENSE_TO_CART_TOOL = {
  name: "addEssenceToCart",
  description: "Adds an essence to the user's cart. The essence is specified by its ID. The tool returns the updated cart.",
  input_schema: {
    type: "object" as "object",
    properties: {
      query: { type: "string", description: "A natural language search query that will be compared against essence names and descriptions. Example queries: 'something that captures the feeling of regret', 'essences related to Monday mornings', 'teenage-themed experiences'." }
    },
    required: ["query"]
  }
};

export const GET_CART_TOOL = {
  name: "getCart",
  description: "This tool takes no input, it returns the users cart when asked",
  input_schema: {
    type: "object" as "object",
    properties: {},
    required: []
  }
};