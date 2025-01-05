import { errorMessage } from "../utils/utils.js";
import { UserModel } from "../models/users.model.js";

import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
import jwt from "jsonwebtoken";
import { AccountModel } from "../models/account.model.js";

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
    //   if (user.isVerified !== true) {
    //     console.log(user);
    //     await sendMailVerificationService(
    //       "samuelbibilade@gmail.com",
    //       user.email,
    //       user.fullName,
    //       user._id
    //     );
    //     return errorMessage(
    //       400,
    //       `Email Not Verified, check your mail @${user.email} to verify account`,
    //       null
    //     )(res);
    //   }

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
    let user = new UserModel(data);
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
    //   if (user) {
    //     let mail = await sendResetPasswordMailService(user._id);
    //     return mail;
    //   } else {
    //     return false;
    //   }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const verifiedEmailService = async (userID) => {
  try {
    let user = await UserModel.findByIdAndUpdate(userID, {
      $set: { isVerified: true },
    });
    return user;
  } catch (error) {
    return false;
  }
};

export const resetPasswordService = async (userID, data) => {
  try {
    let user = await UserModel.findById(userID);
    let salt = await bcrypt.genSalt(data, 10);
    let hash = await bcrypt.hash(salt);
    user.password = hash;
    user = await user.save();
    return user;
  } catch (error) {
    return false;
  }
};
