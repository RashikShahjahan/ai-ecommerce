export const PRODUCT_SEARCH_TOOL = {
  name: "search_products",
  description: "Search for products in the database based on various criteria",
  input_schema: {
    type: "object" as "object",
    properties: {
      query: {
        type: "string",
        description: "The search query (product name, category, or description)"
      },
      category: {
        type: "string",
        description: "Optional category to filter products"
      },
      maxPrice: {
        type: "number",
        description: "Optional maximum price filter"
      },
      sortBy: {
        type: "string",
        enum: ["price_asc", "price_desc", "name", "relevance"],
        description: "Sort order for results"
      }
    },
    required: ["query"]
  }
};