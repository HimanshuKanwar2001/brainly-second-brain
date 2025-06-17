import express, { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controller";

const authRoute: Router = express.Router();

authRoute.post("/sign-up", signUp);
authRoute.post("/sign-in", signIn);

export default authRoute;
