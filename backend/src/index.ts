import express from "express";
import { connectDB } from "./db";
import dotenv from "dotenv";
import { AuthRoutes, CategoryRoutes } from "./routes";

dotenv.config();
const app = express();

app.use(express.json());

// подключаем роуты
app.use("/auth", AuthRoutes);
app.use("/categories", CategoryRoutes);

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port http://localhost:${PORT}`);
  });
});
