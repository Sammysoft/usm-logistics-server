import { errorMessage } from "../utils/utils.js";
import { UserModel } from "../models/users.model.js";
import { AccountModel } from "../models/account.model.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  sendMailVerificationService,
  sendResetPasswordMailService,
} from "./mailing.service.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;

export const saveUserService = async (data, res) => {
  try {
    let user = await new UserModel(data);
    user = await user.save();
    return user;
  } catch (error) {
    return errorMessage(400, error._message)(res);
  }
};

export const getUserByEmailService = async (email, res, bool = false) => {
  try {
    let user = await AccountModel.findOne({ email });
    if (!bool && !user) return errorMessage(400, "Invalid Credentials")(res);
    if (user.isVerified !== true) {
      // console.log(user);
      await sendMailVerificationService(
        "usmlogisticsapp@gmail.com",
        user.email,
        user.fullName,
        user._id
      );
      return errorMessage(
        400,
        `Email Not Verified, check your mail @${user.email} to verify account`,
        null
      )(res);
    }

    if (user) return user;
    if (user) return user;
  } catch (error) {
    return errorMessage(400, error._message)(res);
  }
};

export const jwtService = (payload) => {
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
};

export const jwtVerifyService = async (token) => {
  try {
    let ver = jwt.verify(token, SECRET_KEY);
    return ver;
  } catch (e) {
    console.log("Jwt Verification Failed");
    return false;
  }
};

export const authRegisterAccountService = async (data, res) => {
  const { password } = data;
  let encrypted = await bcrypt.hash(password, 10);
  data.password = encrypted;
  try {
    let user = new AccountModel(data);
    await user.save();
    return user;
  } catch (error) {
    console.log(error);
    return errorMessage(409, error._message, error)(res);
  }
};

export const forgotPasswordService = async (data, res) => {
  try {
    let user = await AccountModel.findOne({ email: data });
    // console.log(user)
    if (user) {
      let mail = await sendResetPasswordMailService(user._id, user.otpCode);
      return mail;
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifiedEmailService = async (req, res) => {
  let account = await AccountModel.findOne({
    email: req.body.email,
    otpCode: req.body.otpCode,
  });


  try {
    if (account) {
      let isVerified = account.updateOtpIfExpired();
      if (isVerified) {
        let user = await AccountModel.findByIdAndUpdate(account._id, {
          $set: { isVerified: true },
        });
        return user;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const resendVerificationEmailService = async (req, res) => {
  try {
    let account = await AccountModel.findOne({ email: req.body.email });
    if (account) {
      return account;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

export const resetPasswordService = async (userID, data) => {
  // console.log(data)
  try {
    let user = await AccountModel.findById(userID);
    let salt = await bcrypt.genSalt(10);
    let hash = await bcrypt.hash(data, salt);
    user.password = hash;
    user = await user.save();
    return user;
  } catch (error) {
    console.log(error)
    return false;
  }
};
