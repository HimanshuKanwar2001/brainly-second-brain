"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const ConnectToDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;
        if (!mongoURI) {
            throw new Error("MONGO_URI is not defined in environment variables.");
        }
        await mongoose_1.default.connect(mongoURI);
        console.log("Connected to database");
    }
    catch (error) {
        console.error("Error connecting to database:", error.message);
    }
};
exports.default = ConnectToDB;
