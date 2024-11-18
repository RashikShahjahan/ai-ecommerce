import { z } from "zod";
import { ProductSchema } from "./product";


export const CartResponseSchema = z.object({
  cartId: z.string(),
  userId: z.string(),
  cartItems: z.array(ProductSchema),
  totalPrice: z.number(),
});

export const AddToCartRequestSchema = z.object({
  userId: z.string(),
  productId: z.string(),
  quantity: z.number().int().positive(),
});

export const AddToCartResponseSchema = z.object({
  cartId: z.string(),
  message: z.string(),
});

export const UpdateCartRequestSchema = z.object({
  productId: z.string(),
  quantity: z.number().int().positive(),
});


export const UpdateCartResponseSchema = z.object({
  cartId: z.string(),
  updatedCart: z.array(UpdateCartRequestSchema),
});

export type Cart = z.infer<typeof CartResponseSchema>;
export type AddToCartRequest = z.infer<typeof AddToCartRequestSchema>;
export type AddToCartResponse = z.infer<typeof AddToCartResponseSchema>;
export type UpdateCartRequest = z.infer<typeof UpdateCartRequestSchema>;
export type UpdateCartResponse = z.infer<typeof UpdateCartResponseSchema>;
