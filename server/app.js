import express from "express";
import authRoutes from "./routers/authRoutes.js";
import {connect} from "./db/connect.js";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/auth", authRoutes);

connect().then(() => {
  app.listen(PORT, () => {
    console.log("Server is running on", PORT);
  });
});
