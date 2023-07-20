import { Router } from "express";
import {
  getSeed,
  loginUser,
  registerUser,
} from "../controllers/user.controller";

const router = Router();

router.route("/seed").get(getSeed);

router.route("/login").post(loginUser);

router.route("/sign-up").post(registerUser);

export default router;
