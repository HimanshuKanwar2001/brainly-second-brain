import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

// Interface for JWT payload
interface JwtPayload {
  userId: string;
}

// Extend Express Request to include userId
declare module "express" {
  interface Request {
    userId?: string;
  }
}

export const protectedRoutes = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
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

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.error("Error in protectedRoutes Middleware:", error);
    res.status(403).json({ message: "Invalid or expired token", error });
  }
};
