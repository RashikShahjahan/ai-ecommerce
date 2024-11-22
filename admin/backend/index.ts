import express from "express";
import cors from "cors";
import prisma from "../../user_backend/prisma/client";
import type {
  Request as ExpressRequest,
  Response as ExpressResponse,
} from "express";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Get all orders with customer and product details
app.get("/api/orders", async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
        items: true,
      },
      orderBy: {
        id: "desc",
      },
    });

    const formattedOrders = orders.map((order) => ({
      ...order,
      userName: "John Doe", // Only transformation needed for now
      createdAt: new Date().toISOString(), // Temporary fallback date since we don't have it in schema
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Create new order
// POST /api/orders
// Creates a new order for a user
// Required fields:
// - userId: string (must be a valid user ID from the database)
// - items: string[] (array of valid essence/item IDs from the database)
// - totalPrice: number
// Example request:
// {
//   "userId": "cm3rzkska0000him7m9pge11y",
//   "items": ["cm3rzl5ka0002him7hy8qxp4q"],
//   "totalPrice": 99.99
// }

app.post(
  "/api/orders",
  async (req: ExpressRequest, res: ExpressResponse): Promise<void> => {
    try {
      const { userId, items, totalPrice } = req.body;

      // First check if user exists
      const userExists = await prisma.user.findUnique({
        where: { id: userId },
      });

      if (!userExists) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const order = await prisma.order.create({
        data: {
          userId,
          totalPrice,
          items: {
            connect: items.map((itemId: string) => ({ id: itemId })),
          },
          paymentStatus: "pending",
          orderStatus: "pending",
        },
        include: {
          items: true,
          user: true,
        },
      });

      res.status(201).json(order);
    } catch (error) {
      console.error("Order creation error:", error);
      res.status(500).json({ error: "Failed to create order" });
    }
  }
);

app.listen(PORT, () => {
  console.log(`Admin server is running on http://localhost:${PORT}`);
});
