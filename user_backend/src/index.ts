import express from "express";
import cors from "cors";
import { ChatRequestSchema, ChatResponseSchema } from "./schemas/schema";
import { chat } from "./chatbot/chat";
import {requireAuth, getAuth } from '@clerk/express'
import prisma from "../prisma/client";

declare global {
  namespace Express {
    interface Request {
      userId: string;
    }
  }
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(requireAuth());

app.use(async (req, res, next) => {
  try {
    const auth = getAuth(req);
    const clerkId = auth.userId;
    
    if (!clerkId) {
      throw new Error("User not authenticated");
    }

    let user = await prisma.user.findUnique({
      where: { clerkId: clerkId }
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          clerkId: clerkId,
        }
      });
    }

    req.userId = user.id;

    next();
  } catch (error) {
    console.error('Error in user middleware:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { query } = ChatRequestSchema.parse(req.body);
    const rawResponse = await chat(query, req.userId);
    console.log(rawResponse);
    const validatedResponse = ChatResponseSchema.parse(rawResponse);
    
    res.status(200).json({ message: validatedResponse });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.error(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;