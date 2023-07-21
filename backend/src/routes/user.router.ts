import { Router } from "express";
import {
  createUser,
  loginUser,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.route("/register").post(createUser);

router.route("/login").post(loginUser);

router.route("/sign-up").post(registerUser);

export default router;
