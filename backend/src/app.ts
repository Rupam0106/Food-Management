import path from "path";
import express from "express";
import cors from "cors";

import foodRouter from './routes/food.router';
import userRouter from './routes/user.router';
import orderRouter from './routes/order.router';

export const app = express();
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:4200"],
  })
);

app.use("/api/v1/foods", foodRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/orders", orderRouter);

app.use(express.static("public"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});




