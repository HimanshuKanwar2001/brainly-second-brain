"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protectedRoutes = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const protectedRoutes = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) {
            res.status(401).json({ message: "Authorization header missing" });
            return;
        }
        const token = authHeader.split(" ")[1]; // expecting 'Bearer <token>'
        if (!token) {
            res.status(401).json({ message: "Token not provided" });
            return;
        }
        const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
        req.userId = decoded.userId;
        next();
    }
    catch (error) {
        console.error("Error in protectedRoutes Middleware:", error);
        res.status(403).json({ message: "Invalid or expired token", error });
    }
};
exports.protectedRoutes = protectedRoutes;
