import { z } from "zod";

const ProductVariantSchema = z.object({
  id: z.string(),
  color: z.string().optional(),
  size: z.string().optional(),
  sku: z.string(),
  stock: z.number().int().nonnegative(),
  price: z.number().nonnegative(),
});

const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  slug: z.string(),
});

const ProductIdSchema = z.object({
  id: z.string(),
});

export const getProductResponseSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  imageUrl: z.string(),
  category: CategorySchema,
  variants: z.array(ProductVariantSchema),
  featured: z.boolean(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const getProductRequestSchema = ProductIdSchema;

const ProductFiltersSchema = z.object({
  categoryIds: z.array(z.string()).optional(),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  minPrice: z.string().transform((val) => Number(val)).optional(),
  maxPrice: z.string().transform((val) => Number(val)).optional(),
  inStock: z.boolean().optional(),
});

export const filterProductsRequestSchema = ProductFiltersSchema;

export const filterProductsResponseSchema = z.array(ProductIdSchema);

export type GetProductResponse = z.infer<typeof getProductResponseSchema>;
export type GetProductRequest = z.infer<typeof getProductRequestSchema>;
export type FilterProductsRequest = z.infer<typeof filterProductsRequestSchema>;
export type FilterProductsResponse = z.infer<typeof filterProductsResponseSchema>;

