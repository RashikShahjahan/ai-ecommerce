import express from "express";
import cors from "cors";
import prisma from "../../user_backend/prisma/client"; // Note - this will need to be changed in the future

const app = express();
const PORT = process.env.PORT || 3001; // Changed from 3000 to avoid conflict with user backend

app.use(cors());
app.use(express.json());

// Get all essences
app.get("/api/essences", async (req, res) => {
  try {
    const essences = await prisma.essence.findMany();
    res.json(essences);
  } catch (error) {
    console.error("Error fetching essences:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Admin server is running on http://localhost:${PORT}`);
});
