import express from "express";
import {
  createTrackController,
  createTrackRequiredController,
} from "../controllers/Track/track.controller.post.js";
import { adminMiddleware } from "../services/admin.middleware.service.js";
import { getTrackPackageController } from "../controllers/Track/track.controller.get.js";

const TrackRouter = express.Router();

TrackRouter.post(
  "/create/:orderID/:driverID",
  createTrackRequiredController,
  adminMiddleware,
  createTrackController
);

TrackRouter.get("/get/:trackingID", getTrackPackageController);

export default TrackRouter;
