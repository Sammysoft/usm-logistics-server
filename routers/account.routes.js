import express from "express";
import {
  VerifyEmailController,
  authLoginController,
  authRegisterController,
  authRegisterUserExists,
  loginRequiredController,
  registerRequiredController,
  forgetPasswordController,
  verifyEmailRequiredController,
  resetPasswordRequiredController,
  resetPasswordController,
  ResendVerifyEmailController,
} from "../controllers/Auth/auth.controller.js";
import { authUserDetailsController } from "../controllers/Auth/auth.controller.get.js";
import { userDetailsMiddleware } from "../services/admin.middleware.service.js";

const AccountRouter = express.Router();

AccountRouter.post(
  "/onboard",
  registerRequiredController,
  authRegisterUserExists,
  authRegisterController
);
AccountRouter.post("/auth", loginRequiredController, authLoginController);
AccountRouter.get("/get", userDetailsMiddleware, authUserDetailsController);
AccountRouter.post(
  "/verify",
  verifyEmailRequiredController,
  VerifyEmailController
);
AccountRouter.post('/verify/resend', ResendVerifyEmailController)
AccountRouter.post("/password/request", forgetPasswordController);
AccountRouter.post(
  "/password/change/:userID",
  resetPasswordRequiredController,
  resetPasswordController
);



export default AccountRouter;
