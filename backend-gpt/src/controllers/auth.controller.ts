import { Request, Response } from "express";
import User from "../models/User.model";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

interface AuthRequestBody {
  email: string;
  username: string;
  password: string;
}

export const signUp = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { email, username, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res
        .status(200)
        .json({ message: "Username is already present in database" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      username,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User is created", newUser });
  } catch (error) {
    console.error("Error in signUp controller", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const signIn = async (
  req: Request<{}, {}, AuthRequestBody>,
  res: Response
): Promise<void> => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      res
        .status(404)
        .json({ message: "User not found. Please create a new account." });
      return;
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid username or password" });
      return;
    }

    const token = jwt.sign(
      { userId: user._id.toString() },
      process.env.JWT_SECRET as string,
      { expiresIn: "2h" } // optional: recommended to add expiry
    );

    res.status(200).json({
      message: "Sign in successful",
      jwt: token,
    });
  } catch (error) {
    console.error("Error in signIn controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};