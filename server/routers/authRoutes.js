import { Router } from "express";
import { login, refreshToken, register } from "../controllers/authControllers.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.post("/refresh", refreshToken);

export default router;
