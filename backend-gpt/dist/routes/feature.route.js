"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feature_controller_js_1 = require("../controllers/feature.controller.js");
const featureRoute = express_1.default.Router();
featureRoute.post("/content", feature_controller_js_1.addContent);
featureRoute.get("/content", feature_controller_js_1.getAllContent);
featureRoute.get("/brain/share", feature_controller_js_1.shareContentLink);
featureRoute.get("/brain/:shareLink", feature_controller_js_1.someoneSharedLink);
exports.default = featureRoute;
