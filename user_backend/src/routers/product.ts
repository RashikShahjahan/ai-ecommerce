import { Router } from "express";
import prisma from "../../prisma/client";

const router = Router();

router.get("/:productId", async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await prisma.product.findUnique({
    where: { id: productId },
  });
    if (!product) {
    res.status(404).json({ error: "Product not found" });
    return;
  }
  res.status(200).json(product);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});

export default router;