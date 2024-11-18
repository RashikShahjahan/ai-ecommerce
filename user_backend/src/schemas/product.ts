import { z } from "zod";

const CustomizationSchema = z.object({
  color: z.string(),
  size: z.string(),
});

export const ProductSchema = z.object({
  productId: z.string(),
  name: z.string(),
  description: z.string(),
  price: z.number(),
  inventory: z.number().int(),
  customization: CustomizationSchema,
});

export const ProductArraySchema = z.array(ProductSchema);

export type Product = z.infer<typeof ProductSchema>;
export type ProductArray = z.infer<typeof ProductArraySchema>;

