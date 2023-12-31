import bcrypt from "bcryptjs";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";

export const createUser = asyncHandler(async (req, res) => {
  const usersCount = await UserModel.countDocuments();
  const { name, email, password, address, isAdmin } = req.body;

  const user = await UserModel.create({
    name,
    email,
    password,
    address,
    isAdmin,
  });

  res.status(201).json({
    success: true,
    user,
  });
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });
console.log(user)
  if (user && (await bcrypt.compare(password, user.password))) {
    res.send(generateTokenReponse(user));
  } else {
    res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
  }
});

export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, address } = req.body;
  const user = await UserModel.findOne({ email });
  if (user) {
    res.status(HTTP_BAD_REQUEST).send("User is already exist, please login!");
    return;
  }

  const encryptedPassword = await bcrypt.hash(password, 10);

  const newUser: User = {
    id: "",
    name,
    email: email.toLowerCase(),
    password: encryptedPassword,
    address,
    isAdmin: false,
  };

  const dbUser = await UserModel.create(newUser);
  res.send(generateTokenReponse(dbUser));
});

const generateTokenReponse = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      isAdmin: user.isAdmin,
    },
    process.env.JWT_SECRET!,
    {
      expiresIn: "30d",
    }
  );

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    address: user.address,
    isAdmin: user.isAdmin,
    token: token,
  };
};
