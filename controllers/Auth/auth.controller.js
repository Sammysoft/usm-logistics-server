import {
  forgotPasswordService,
  getUserByEmailService,
  resendVerificationEmailService,
  resetPasswordService,
  verifiedEmailService,
} from "../../services/auth.service.js";
import { authRegisterAccountService } from "../../services/auth.service.js";
import bcrypt from "bcrypt";
import { blockedUserService } from "../../services/middleware.service.js";

import {
  emailValidatorHelper,
  errorMessage,
  successMessage,
} from "../../utils/utils.js";
import { isRequired } from "../../utils/required.js";
import { getUserService } from "../../services/user.service.js";
import {
  sendMailVerificationService,
  sendMailVerifiedService,
  verifyEmailService,
} from "../../services/email.service.js";
import { jwtService } from "../../services/auth.service.js";

export const registerRequiredController = (req, res, next) => {
  const data = {
    email: req?.body?.email,
    password: req?.body?.password,
    fullName: req?.body?.fullName,
    phone: req?.body?.phone,
  };

  if (!isRequired(data, res)) return;
  if (!emailValidatorHelper(req.body.email, res)) return;
  next();
};

export const authRegisterUserExists = async (req, res, next) => {
  const user = await getUserService({ email: req.body.email });
  if (user) return errorMessage(409, "This user already exists", user._id)(res);
  return next();
};

export const authRegisterController = async (req, res, next) => {
  const { email, password, fullName, phone, isAdmin } = req.body;

  let user = await authRegisterAccountService(
    {
      email,
      password,
      fullName,
      phoneNumber: phone,
      isAdmin,
    },
    res
  );
  if (!user) return errorMessage(400, "Could not register user", null)(res);
  if (user) {
    let isVerified = await verifyEmailService(user._id);
    if (isVerified)
      return successMessage(
        200,
        "Account created successfully, check your mail to verify email address",
        { email: user.email }
      )(res);
    if (!isVerified)
      return errorMessage(400, "Could not verify Account", null)(res);
  }
};

export const loginRequiredController = (req, res, next) => {
  const data = {
    email: req.body.email,
    password: req.body.password,
  };

  if (!isRequired(data, res)) return;
  next();
};

export const authLoginController = async (req, res, next) => {
  let user = await getUserByEmailService(req.body.email, res);
  if (!user) return;
  let decrypt = await bcrypt.compareSync(req.body.password, user.password);
  if (!decrypt) return errorMessage(401, "Invalid Credentials", req.body)(res);

  let id = user;

  const token = jwtService({
    id: id?._id,
    email: id?.email,
    isAdmin: id?.isAdmin,
  });
  return successMessage(200, "Logged in", { token })(res);
};

export const blockedUserController = async (req, res, next) => {
  if (!blockedUserService(req)) return;
  return next();
};

export const verifyEmailRequiredController = async (req, res, next) => {
  const data = {
    otpCode: req.body.otpCode,
    email: req.body.email,
  };
  if (!isRequired(data, res)) return;
  return next();
};

export const VerifyEmailController = async (req, res) => {
  let verified = await verifiedEmailService(req, res);
  await sendMailVerifiedService(verified.email, verified.fullName, (err) => {
    if (err) {
      console.log("Mail not sent");
    } else {
      console.log("Mail sent");
    }
  });

  if (verified)
    return successMessage(200, "User Email Verified 👍", {
      accountID: verified._id,
    })(res);
  if (!verified)
    return errorMessage(400, "Could not verify user email 😢", null)(res);
};

export const ResendVerifyEmailController = async (req, res) => {
  let verify = await resendVerificationEmailService(req, res);
  if (verify) {
    await sendMailVerificationService(
      verify.email,
      verify.fullName,
      verify.otpCode,
      (err) => {
        if (err) {
          console.log("Mail not sent");
        } else {
          console.log("Mail sent");
        }
      }
    );
    return successMessage(
      200,
      `OTP sent to ${verify.email} 👍`,
      verify._id
    )(res);
  }
  if (!verify) return errorMessage(400, "Could not generate OTP 😢", null)(res);
};

export const forgetPasswordController = async (req, res) => {
  let mail = await forgotPasswordService(req.body.email, res);
  if (mail)
    return successMessage(
      200,
      "Check your mail to reset your password",
      mail
    )(res);
  if (!mail)
    return errorMessage(
      400,
      "Could not complete password reset request",
      null
    )(res);
};

export const resetPasswordRequiredController = async (req, res, next) => {
  const data = {
    userID: req.params.userID,
    password: req.body.password,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const resetPasswordController = async (req, res) => {
  let user = await resetPasswordService(req.params.userID, req.body.password);
  if (user)
    return successMessage(200, "Password Reset Successful", user._id)(res);
  if (!user) return errorMessage(400, "Could not reset Password", null)(res);
};
