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

export const getProductRequestSchema = z.object({
  productId: z.string(),
});

export const ProductArraySchema = z.array(getProductResponseSchema);

export type GetProductResponse = z.infer<typeof getProductResponseSchema>;
export type GetProductRequest = z.infer<typeof getProductRequestSchema>;
export type GetProductArrayResponse = z.infer<typeof ProductArraySchema>;

