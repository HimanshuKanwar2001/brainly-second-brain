import express from "express";
import {
  addContent,
  getAllContent,
  shareContentLink,
  someoneSharedLinks,
} from "../controllers/feature.controller.js";
import { protectedRoutes } from "../utils/protectedRoutes.js";

const featureRoute = express.Router();

featureRoute.post("/content",protectedRoutes, addContent);
featureRoute.get("/content",protectedRoutes, getAllContent);
featureRoute.get("/brain/share",protectedRoutes, shareContentLink);
featureRoute.get("/brain/:shareLink",protectedRoutes, someoneSharedLinks);

export default featureRoute;
