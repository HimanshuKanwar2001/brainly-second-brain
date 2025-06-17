"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const contentSchema = new mongoose_1.default.Schema({
    link: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        enum: ["images", "video", "article", "audio"],
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    tagsId: [
        {
            type: mongoose_1.default.Schema.Types.ObjectId,
            ref: "Tags",
        },
    ],
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
    },
});
const Content = mongoose_1.default.model("Content", contentSchema);
exports.default = Content;
