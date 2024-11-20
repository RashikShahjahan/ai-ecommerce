import express from "express";
import cors from "cors";
import { chatRequestSchema } from "./schemas/product";
import { chat } from "./chatbot/app";
const app = express();
app.use(express.json());
app.use(cors());


app.get("/api/chat", async (req, res) => {
  const { query } = chatRequestSchema.parse(req.query);
  try {
    const response = await chat(query);
    res.status(200).json({ message: response });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;