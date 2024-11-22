import prisma from "../../../prisma/client";
import { type Cart } from "../../schemas/schema";

async function addEssenceToCart(essenceId: string, userId: string): Promise<Cart> {
    try {
        const essence = await prisma.essence.findUnique({
            where: { id: essenceId }
        });

        if (!essence) {
            throw new Error(`Essence with ID ${essenceId} not found`);
        }

        // Find or create cart
        let cart = await prisma.cart.findUnique({
            where: { userId: userId },
            include: { items: true }
        });
        
        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: userId
                },
                include: { items: true }
            });
        }

        // Update the essence to point to this cart
        await prisma.essence.update({
            where: { id: essenceId },
            data: {
                cartId: cart.id
            }
        });

        // Refresh cart to get updated items
        cart = await prisma.cart.findUnique({
            where: { id: cart.id },
            include: { items: true }
        });

        const total = (cart?.items || []).reduce((acc, item) => acc + item.price, 0);

        return {
            ...cart!,
            total
        };
    } catch (error) {
        console.error('Error in addEssenceToCart:', error);
        throw error;
    }
}

export { addEssenceToCart };