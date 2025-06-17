"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const User_model_1 = __importDefault(require("../models/User.model"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const signUp = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const existingUser = await User_model_1.default.findOne({ email });
        if (existingUser) {
            res
                .status(200)
                .json({ message: "Username is already present in database" });
            return;
        }
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(password, salt);
        const newUser = new User_model_1.default({
            email,
            username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({ message: "User is created", newUser });
    }
    catch (error) {
        console.error("Error in signUp controller", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signUp = signUp;
const signIn = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User_model_1.default.findOne({ username });
        if (!user) {
            res
                .status(404)
                .json({ message: "User not found. Please create a new account." });
            return;
        }
        const isValidPassword = await bcrypt_1.default.compare(password, user.password);
        if (!isValidPassword) {
            res.status(401).json({ message: "Invalid username or password" });
            return;
        }
        const token = jsonwebtoken_1.default.sign({ userId: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: "2h" } // optional: recommended to add expiry
        );
        res.status(200).json({
            message: "Sign in successful",
            jwt: token,
        });
    }
    catch (error) {
        console.error("Error in signIn controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
exports.signIn = signIn;
