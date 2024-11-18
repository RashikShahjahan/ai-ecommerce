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

export const ProductSchema = z.object({
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

export const ProductArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type ProductArray = z.infer<typeof ProductArraySchema>;

