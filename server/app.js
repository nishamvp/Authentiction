import express from "express";
import authRoutes from "./routers/authRoutes.js";
import postRoutes from "./routers/postRoutes.js";
import { connect } from "./db/connect.js";
import cookieParser from "cookie-parser"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

app.use("/auth", authRoutes);
app.use("/post", postRoutes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on", PORT);
  });
});
