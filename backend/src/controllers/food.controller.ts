import asyncHandler from "express-async-handler";
import { FoodModel } from "../models/food.model";

export const createFood = asyncHandler(async (req, res, next) => {
  let imageUrl = "default";
  const { name, cookTime, price, favorite, origins, stars, tags } = req.body;

  const food = await FoodModel.create({
    name,
    cookTime,
    price,
    imageUrl,
    favorite,
    origins,
    stars,
    tags,
  });

  const foodsCount = await FoodModel.countDocuments();
  res.status(201).json({
    success: true,
    food,
  });
});

export const getFoods = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find();
  res.send("foods");
});

export const getFoodBySearch = asyncHandler(async (req, res) => {
  const searchRegex = new RegExp(req.params.searchTerm, "i");
  const foods = await FoodModel.find({ name: { $regex: searchRegex } });
  res.send(foods);
});

export const getFoodByTags = asyncHandler(async (req, res) => {
  const tags = await FoodModel.aggregate([
    {
      $unwind: "$tags",
    },
    {
      $group: {
        _id: "$tags",
        count: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        name: "$_id",
        count: "$count",
      },
    },
  ]).sort({ count: -1 });

  const all = {
    name: "All",
    count: await FoodModel.countDocuments(),
  };

  tags.unshift(all);
  res.send(tags);
});

export const getFoodByTagName = asyncHandler(async (req, res) => {
  const foods = await FoodModel.find({ tags: req.params.tagName });
  res.send(foods);
});

export const getFoodById = asyncHandler(async (req, res) => {
  const food = await FoodModel.findById(req.params.foodId);
  res.send(food);
});
