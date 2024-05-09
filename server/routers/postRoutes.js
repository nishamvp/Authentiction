import { Router } from "express";
import verifyToken from "../middleware/verifyToken.js";
import { createPost } from "../controllers/postControllers.js";

const router = Router()

router.post("/create",verifyToken,createPost)


export default router
