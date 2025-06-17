import { Request, Response } from "express";
import User from "../models/User.model";
import Content from "../models/Content.model";
import SharedLink from "../models/Link.model";
import { randomBytes } from "crypto";

export const addContent = async (req: Request, res: Response) => {
  try {
    // Your logic here
    const { type, link, title, tags } = req.body;
    //@ts-ignore
    const userId = req.userId;

    const user = await User.findById({ _id: userId });
    if (!user) {
      res.status(404).json({ message: "Invalid User" });
    }

    const addedContent = await Content.create({
      link: link,
      type: type,
      title: title,
      tags: [...tags],
      userId: userId,
    });

    await addedContent.save();
    res.status(201).json({ message: "Content added", addedContent });
  } catch (error) {
    console.error("Error in addContent controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const getAllContent = async (req: Request, res: Response) => {
  try {
    // Your logic here

    // @ts-ignore

    const contents = await Content.find();

    res.status(200).json({ contents });
  } catch (error) {
    console.error("Error in getAllContent controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const shareContentLink = async (req: Request, res: Response) => {
  try {
    const userId = req.userId; // assuming you're using protectedRoutes middleware

    const hash = randomBytes(24).toString("hex");

    const newLink = await SharedLink.create({
      hash,
      userId,
    });

    const fullUrl = `${process.env.FRONTEND_URL}/brain/${hash}`;

    res.status(201).json({
      message: "Sharable link created successfully",
      url: fullUrl,
    });
  } catch (error) {
    console.error("Error in shareContentLink controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const someoneSharedLinks = async (req: Request, res: Response) => {
  try {
    const { shareLink } = req.params;

    const link = await SharedLink.findOne({ hash: shareLink });

    if (!link) {
      res.status(404).json({ message: "Invalid or expired link" });
      return;
    }

    const userContent = await SharedLink.find({ userId: link.userId });

    if (!userContent) {
      res.status(404).json({ message: "No content found for this user" });
      return;
    }

    res.status(200).json({
      content: userContent,
      isSharedView: true, // helps frontend know it's read-only
    });
  } catch (error) {
    console.error("Error in someoneSharedLink controller:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
