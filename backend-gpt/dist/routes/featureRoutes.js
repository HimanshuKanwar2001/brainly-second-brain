"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feature_controller_js_1 = require("../controllers/feature.controller.js");
const protectedRoutes_js_1 = require("../utils/protectedRoutes.js");
const featureRoute = express_1.default.Router();
featureRoute.post("/content", protectedRoutes_js_1.protectedRoutes, feature_controller_js_1.addContent);
featureRoute.get("/content", protectedRoutes_js_1.protectedRoutes, feature_controller_js_1.getAllContent);
featureRoute.get("/brain/share", protectedRoutes_js_1.protectedRoutes, feature_controller_js_1.shareContentLink);
featureRoute.get("/brain/:shareLink", protectedRoutes_js_1.protectedRoutes, feature_controller_js_1.someoneSharedLinks);
exports.default = featureRoute;
