import express from "express";

import { signIn, signUp } from "../controllers/auth.controller";

const router = express.Router();

router.post("/sign-up", signUp);
router.post("/sign-in", signIn);

router.get("/users", (req, res) => {
  res.json([{ name: "himanshu" }]);
});

export default router;
