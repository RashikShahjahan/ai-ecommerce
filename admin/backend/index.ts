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

app.listen(PORT, () => {
  console.log(`Admin server is running on http://localhost:${PORT}`);
});
