import { Router } from "express";
import { AuthController } from "../controllers";
import { CheckAuth } from "../middlewares";

const router = Router();

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", CheckAuth, AuthController.logout);

export const AuthRoutes = router;
