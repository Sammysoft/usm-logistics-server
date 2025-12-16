import {
  emailVerificationTemplate,
  emailVerifiedTemplate,
  orderCreatedEmailTemplate,
  orderUpdatedEmailTemplate,
  resetPasswordTemplate,
  subscriptionUpdatedEmailTemplate
} from "../utils/mail.js";

import { AccountModel } from "../models/account.model.js";
import { sendEmail } from "./mailing.service.js";

const FROM_EMAIL = process.env.EMAIL_FROM;

/* ---------------- ORDER UPDATED ---------------- */
export const orderUpdatedEmailService = async (
  receiverMail,
  fullName,
  products,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Order Status",
    html: orderUpdatedEmailTemplate(fullName, products),
    text: `Hello ${fullName}, your order status has been updated.`,
    cb,
  });
};

/* ---------------- SUBSCRIPTION UPDATED ---------------- */
export const subscriptionUpdatedEmailService = async (
  receiverMail,
  fullName,
  products,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Subscription Update",
    html: subscriptionUpdatedEmailTemplate(fullName, products),
    text: `Hello ${fullName}, your subscription has been updated.`,
    cb,
  });
};

/* ---------------- ORDER CREATED ---------------- */
export const orderCreatedEmailService = async (
  receiverMail,
  fullName,
  products,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Order Details Info",
    html: orderCreatedEmailTemplate(fullName, products),
    text: `Hello ${fullName}, your order has been created.`,
    cb,
  });
};

/* ---------------- EMAIL VERIFICATION ---------------- */
export const sendMailVerificationService = async (
  receiverMail,
  fullName,
  otpCode,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Email Verification",
    html: emailVerificationTemplate(fullName, otpCode),
    text: `Hello ${fullName}, your verification code is ${otpCode}`,
    cb,
  });
};

/* ---------------- VERIFY EMAIL FLOW ---------------- */
export const verifyEmailService = async (userID) => {
  try {
    const user = await AccountModel.findById(userID);
    if (!user) throw new Error("User not found");

    await sendMailVerificationService(
      user.email,
      user.fullName,
      user.otpCode,
      (err) => {
        if (err) {
          console.log("❌ Mail not sent");
        } else {
          console.log("✅ Verification mail sent");
        }
      }
    );

    return user.email;
  } catch (error) {
    console.error(error);
    return false;
  }
};

/* ---------------- EMAIL VERIFIED ---------------- */
export const sendMailVerifiedService = async (
  receiverMail,
  fullName,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Email Verified Successfully",
    html: emailVerifiedTemplate(fullName),
    text: `Hello ${fullName}, your email has been verified successfully.`,
    cb,
  });
};

/* ---------------- PASSWORD RESET ---------------- */
export const sendPasswordResetService = async (
  receiverMail,
  userID,
  otpCode,
  cb
) => {
  return sendEmail({
    from: FROM_EMAIL,
    to: receiverMail,
    subject: "Password Reset",
    html: resetPasswordTemplate(userID, otpCode),
    text: `Use this code to reset your password: ${otpCode}`,
    cb,
  });
};

/* ---------------- RESET PASSWORD FLOW ---------------- */
export const sendResetPasswordMailService = async (
  userID,
  otpCode
) => {
  try {
    const user = await AccountModel.findById(userID);
    if (!user) throw new Error("User not found");

    await sendPasswordResetService(
      user.email,
      user._id,
      otpCode,
      (err) => {
        if (err) {
          console.log("❌ Mail not sent");
        } else {
          console.log("✅ Password reset mail sent");
        }
      }
    );

    return user.email;
  } catch (error) {
    console.error(error);
    return false;
  }
};
