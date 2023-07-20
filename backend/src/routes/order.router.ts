import { Router } from "express";

import auth from "../middlewares/auth.mid";
import {
  createOrder,
  currentUserOrder,
  orderStatus,
  trackOrder,
} from "../controllers/order.controller";

const router = Router();
router.use(auth);

router.route("/create").post(createOrder);

router.route("/newOrderForCurrentUser").get(currentUserOrder);

router.route("/pay").get(orderStatus);

router.route("/track/:id").get(trackOrder);

export default router;
