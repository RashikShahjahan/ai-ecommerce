import express from "express";
import cors from "cors";
import { chatRequestSchema} from "./schemas/schema";
import { chat } from "./chatbot/chat";
import { clerkClient, clerkMiddleware, requireAuth } from '@clerk/express'
import prisma from "../prisma/client";



const app = express();
app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());
app.use(requireAuth());

app.use(async (req, res, next) => {
  try {
    const { userId } = req.auth;
    const clerkUser = await clerkClient.users.getUser(userId);
    
    let user = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          id: userId,
          email: '',
          name: '',
          address: ''
        }
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error('Error in user middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get("/api/chat", async (req, res) => {
  const { query, chatId } = chatRequestSchema.parse(req.query);
  try {
    const response = await chat(query, chatId, req.user.id);
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