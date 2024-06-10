import { Router } from "express";
import { googleAuth, googleCallback, login , register } from "../controllers/authControllers.js";
const router = Router();

router.post("/register", register);
router.post("/login", login);
// router.get("/consentScreen", loginWithGoogle);
router.post("/consentScreen", googleAuth);
router.get("/callback", googleCallback);

export default router;
