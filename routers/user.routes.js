import express from "express";
import {
  addLocationRequiredController,
  addLocationToProfileController,
} from "../controllers/Profile/profile.controller.post.js";

const UserRouter = express.Router();

UserRouter.post(
  "/profile/location/add/:accountID",
  addLocationRequiredController,
  addLocationToProfileController
);



export default UserRouter;
