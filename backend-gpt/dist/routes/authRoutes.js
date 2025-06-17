"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const router = express_1.default.Router();
router.post("/sign-up", auth_controller_1.signUp);
router.post("/sign-in", auth_controller_1.signIn);
router.get("/users", (req, res) => {
    res.json([{ name: "himanshu" }]);
});
exports.default = router;
