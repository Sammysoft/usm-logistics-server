import nodemailer from "nodemailer";
import { UserModel } from "../models/users.model.js";
import {
  emailVerificationTemplate,
  emailVerifiedTemplate,
  orderCreatedEmailTemplate,
  orderUpdatedEmailTemplate,
  resetPasswordTemplate,
  subscriptionUpdatedEmailTemplate,
} from "../utils/mail.js";
import { AccountModel } from "../models/account.model.js";

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "usmlogisticsapp@gmail.com",
    pass: "lheuyhkuqlqhxtcu",
  },
});

export const orderUpdatedEmailService = async (
  senderMail,
  recieverMail,
  fullName,
  products,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Order Status",
    fullName,
    html: orderUpdatedEmailTemplate(fullName, products),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const subscriptionUpdatedEmailService = async (
  senderMail,
  recieverMail,
  fullName,
  products,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Order Status",
    fullName,
    html: subscriptionUpdatedEmailTemplate(fullName, products),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const orderCreatedEmailService = async (
  senderMail,
  recieverMail,
  fullName,
  products,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Order Details Info",
    fullName,
    html: orderCreatedEmailTemplate(fullName, products),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const sendMailVerificationService = (
  senderMail,
  recieverMail,
  fullName,
  code,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Email Verification",
    fullName: fullName,
    html: emailVerificationTemplate(fullName, code),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const verifyEmailService = async (userID) => {
  try {
    let user = await AccountModel.findById(userID);
    let verify = await sendMailVerificationService(
      "usmlogisticsapp@gmail.com",
      user.email,
      user.fullName,
      user.otpCode,
      (err) => {
        if (err) {
          console.log(err);
          console.log("Mail not sent");
        } else {
          console.log("Mail sent");
        }
      }
    );
    return user.email;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const sendMailVerifiedService = (
  senderMail,
  recieverMail,
  fullName,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Email Verified Successfully",
    fullName: fullName,
    html: emailVerifiedTemplate(fullName),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

// export const verifiedEmailService = async (userID) => {
//   try {
//     let user = await User.findById(userID);
//     await sendMailVerifiedService(
//       "acunningsophia445@gmail.com",
//       user.email,
//       user.first_name,
//       (err) => {
//         if (err) {
//           console.log("Mail not sent");
//         } else {
//           console.log("Mail sent");
//         }
//       }
//     );
//     return user.email;
//   } catch (error) {
//     return false;
//   }
// };

export const sendPasswordResetService = (
  senderMail,
  recieverMail,
  userID,
  otpCode,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Password Reset",
    html: resetPasswordTemplate(userID, otpCode),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const sendResetPasswordMailService = async (userID, otpCode) => {
  try {
    let user = await AccountModel.findById(userID);
    await sendPasswordResetService(
      "usmlogisticsapp@gmail.com",
      user.email,
      user._id,
      otpCode,
      (err) => {
        if (err) {
          console.log(err);
          console.log("Mail not sent");
        } else {
          console.log("Mail sent");
        }
      }
    );
    return user.email;
  } catch (error) {
    console.log(error);
    return false;
  }
};
