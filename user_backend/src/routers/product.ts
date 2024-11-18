import { Router } from "express";
import prisma from "../../prisma/client";
import { getProductRequestSchema, getProductResponseSchema, ProductArraySchema } from "../schemas/product";
const router = Router();

router.get("/:productId", async (req, res) => {
  try {
    const { productId } = getProductRequestSchema.parse(req.params);
    
    const product = await prisma.product.findUnique({
    where: { id: productId },
  });
    if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
    }
    res.status(200).json(getProductResponseSchema.parse(product));
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/", async (req, res) => {
  const products = await prisma.product.findMany();
  res.status(200).json(ProductArraySchema.parse(products));
});

export default router;