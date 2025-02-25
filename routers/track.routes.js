import express from "express";
import {
  createTrackController,
  createTrackRequiredController,
} from "../controllers/Track/track.controller.post.js";
import { adminMiddleware } from "../services/admin.middleware.service.js";
import {
  getAllTrackingPackageController,
  getTrackPackageController,
} from "../controllers/Track/track.controller.get.js";
import { userMiddleware } from "../services/user.middleware.service.js";
import {
  updateTrackStateController,
  updateTrackStatusRequiredController,
} from "../controllers/Track/track.controller.put.js";

const TrackRouter = express.Router();

TrackRouter.post(
  "/create/:orderID/:driverID",
  createTrackRequiredController,
  adminMiddleware,
  createTrackController
);

TrackRouter.get("/get", getTrackPackageController);
TrackRouter.get("/get-all", adminMiddleware, getAllTrackingPackageController);
TrackRouter.put(
  "/update/:trackingID",
  updateTrackStatusRequiredController,
  userMiddleware,
  updateTrackStateController
);

export default TrackRouter;
