"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./utils/db"));
const featureRoutes_1 = __importDefault(require("./routes/featureRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.get("/api", (req, res) => {
    res.send("Hello from express + Typescript");
});
app.use("/api/v1/auth", authRoutes_1.default);
app.use("/api/v1/feature", featureRoutes_1.default);
app.listen(PORT, () => {
    (0, db_1.default)();
    console.log(`Server is running on port ${PORT}`);
});
