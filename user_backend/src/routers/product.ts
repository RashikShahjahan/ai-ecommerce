import { Router } from "express";
import prisma from "../../prisma/client";
import { getProductRequestSchema, getProductResponseSchema, filterProductsRequestSchema, filterProductsResponseSchema } from "../schemas/product";
const router = Router();

router.get("/:id", async (req, res) => {
    const { id } = getProductRequestSchema.parse(req.params);
    
    try {
        const product = await prisma.product.findUnique({
            where: { id: id },
        });
        if (!product) {
            res.status(404).json({ error: "Product not found" });
            return;
        }

        const category = await prisma.category.findUnique({
            where: { id: product?.categoryId },
        });

        const variants = await prisma.productVariant.findMany({
            where: { productId: id },
        });

      
        const validatedProduct = getProductResponseSchema.parse({
            ...product,
            category,
            variants,
        });
    
        res.status(200).json(validatedProduct);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        throw error;
    }
});

router.get("/", async (req, res) => {
    const { categoryIds, colors, sizes, minPrice, maxPrice, inStock } = filterProductsRequestSchema.parse(req.query);

    try {
        const products = await prisma.product.findMany({
            where: { 
                categoryId: { in: categoryIds },
                variants: { some: { 
                    color: { in: colors },
                    size: { in: sizes },
                    price: { gte: minPrice, lte: maxPrice },
                    ...(inStock ? { stock: { gte: 1 } } : {}),
                } },
            },
            select: {
                id: true
            }
        });

        const validatedProducts = filterProductsResponseSchema.parse(products);

        res.status(200).json(validatedProducts);
    } catch (error) {
        res.status(500).json({ error: "Internal server error" });
        throw error;
    }
});


export default router;