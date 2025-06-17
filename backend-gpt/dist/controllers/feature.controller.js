"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.someoneSharedLinks = exports.shareContentLink = exports.getAllContent = exports.addContent = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const Content_model_1 = __importDefault(require("../models/Content.model"));
const Link_model_1 = __importDefault(require("../models/Link.model"));
const crypto_1 = require("crypto");
const addContent = async (req, res) => {
    try {
        // Your logic here
        const { type, link, title, tags } = req.body;
        //@ts-ignore
        const userId = req.userId;
        const user = await User_model_1.default.findById({ _id: userId });
        if (!user) {
            res.status(404).json({ message: "Invalid User" });
        }
        const addedContent = await Content_model_1.default.create({
            link: link,
            type: type,
            title: title,
            tags: [...tags],
            userId: userId,
        });
        await addedContent.save();
        res.status(201).json({ message: "Content added", addedContent });
    }
    catch (error) {
        console.error("Error in addContent controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.addContent = addContent;
const getAllContent = async (req, res) => {
    try {
        // Your logic here
        // @ts-ignore
        const contents = await Content_model_1.default.find();
        res.status(200).json({ contents });
    }
    catch (error) {
        console.error("Error in getAllContent controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.getAllContent = getAllContent;
const shareContentLink = async (req, res) => {
    try {
        const userId = req.userId; // assuming you're using protectedRoutes middleware
        const hash = (0, crypto_1.randomBytes)(24).toString("hex");
        const newLink = await Link_model_1.default.create({
            hash,
            userId,
        });
        const fullUrl = `${process.env.FRONTEND_URL}/brain/${hash}`;
        res.status(201).json({
            message: "Sharable link created successfully",
            url: fullUrl,
        });
    }
    catch (error) {
        console.error("Error in shareContentLink controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.shareContentLink = shareContentLink;
const someoneSharedLinks = async (req, res) => {
    try {
        const { shareLink } = req.params;
        const link = await Link_model_1.default.findOne({ hash: shareLink });
        if (!link) {
            res.status(404).json({ message: "Invalid or expired link" });
            return;
        }
        const userContent = await Link_model_1.default.find({ userId: link.userId });
        if (!userContent) {
            res.status(404).json({ message: "No content found for this user" });
            return;
        }
        res.status(200).json({
            content: userContent,
            isSharedView: true, // helps frontend know it's read-only
        });
    }
    catch (error) {
        console.error("Error in someoneSharedLink controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.someoneSharedLinks = someoneSharedLinks;
