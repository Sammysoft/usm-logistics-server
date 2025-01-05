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

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "samuelbibilade@gmail.com",
    pass: "yklplzvhffxptqoq",
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
  userID,
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Email Verification",
    fullName: fullName,
    html: emailVerificationTemplate(fullName, userID),
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
    let user = await UserModel.findById(userID);

    let verify = await sendMailVerificationService(
      "samuelbibilade@gmail.com",
      user.email,
      user.fullName,
      user._id,
      (err) => {
        if (err) {
          console.log(err);
          console.log("Mail not sent");
        } else {
          console.log("Mail sent");
        }
      }
    );
    console.log(verify);
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
  cb
) => {
  const mailOptions = {
    from: senderMail,
    to: recieverMail,
    subject: "Password Reset",
    html: resetPasswordTemplate(userID),
  };

  transporter.sendMail(mailOptions, function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, data);
    }
  });
};

export const sendResetPasswordMailService = async (userID) => {
  try {
    let user = await UserModel.findById(userID);
    await sendPasswordResetService(
      "samuelbibilade@gmail.com",
      user.email,
      user._id,
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
