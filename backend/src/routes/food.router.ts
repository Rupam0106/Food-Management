import { Router } from "express";
import {
  createFood,
  getFoodById,
  getFoodBySearch,
  getFoodByTagName,
  getFoodByTags,
  getFoods,
} from "../controllers/food.controller";
const router = Router();

router.route("/create").post(createFood);

router.route("/").get(getFoods);

router.route("/search/:searchTerm").get(getFoodBySearch);

router.route("/tags").get(getFoodByTags);

router.route("/tag/:tagName").get(getFoodByTagName);

router.route("/:foodId").get(getFoodById);

export default router;
