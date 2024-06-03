import { Router } from "express";
import { login, loginWithGoogle, register } from "../controllers/authControllers.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/consentScreen", loginWithGoogle);

export default router;
