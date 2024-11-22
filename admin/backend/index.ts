import express from "express";
import cors from "cors";
import prisma from "../../user_backend/prisma/client";

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

    // Transform the data to match the frontend structure
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      userId: order.userId,
      userName: "John Doe", // TODO: Integrate with Clerk to get actual user names
      products: order.items.map((item) => ({
        name: item.name,
        quantity: 1, // Note: Current schema doesn't track quantity
        price: item.price,
      })),
      totalAmount: order.totalPrice,
      status: order.orderStatus,
      createdAt: new Date().toISOString(), // Note: Adding current date since schema doesn't have createdAt
    }));

    res.json(formattedOrders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Admin server is running on http://localhost:${PORT}`);
});
