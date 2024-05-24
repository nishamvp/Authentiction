import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { connect } from "./db/connect.js";
import authRoutes from "./routers/authRoutes.js";
import postRoutes from "./routers/postRoutes.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    allowedHeaders: ['Content-Type', '*']
  })
);
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on", PORT);
  });
});
