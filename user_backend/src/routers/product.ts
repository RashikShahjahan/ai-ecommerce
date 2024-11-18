import { Router } from "express";
import prisma from "../../prisma/client";
import { ProductSchema } from "../schemas/product";

const router = Router();

router.get("/api/products/:productId", async (req, res) => {
  const productId = req.params.productId;
  const product = await prisma.product.findUnique({
    where: { id: parseInt(productId) },
  });
  res.json(ProductSchema.parse(product));
});

export default router;