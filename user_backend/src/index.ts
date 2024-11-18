import express from "express";
import cors from "cors";
import productRouter from "./routers/product";
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/products", productRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

export default app;