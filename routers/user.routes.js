import express from "express";
import {
  addLocationRequiredController,
  addLocationToProfileController,
} from "../controllers/Profile/profile.controller.post.js";
import {
  addCardToProfileController,
  addCardToProfileRequiredController,
  editProfileController,
  editProfileRequiredController,
} from "../controllers/Profile/profile.controller.put.js";
import { userMiddleware } from "../services/user.middleware.service.js";

const UserRouter = express.Router();

UserRouter.post(
  "/profile/location/add/:accountID",
  addLocationRequiredController,
  addLocationToProfileController
);

UserRouter.put(
  "/profile/edit/:userID",
  editProfileRequiredController,
  userMiddleware,
  editProfileController
);
UserRouter.put(
  "/profile/cards/add/:userID",
  addCardToProfileRequiredController,
  userMiddleware,
  addCardToProfileController
);

export default UserRouter;
