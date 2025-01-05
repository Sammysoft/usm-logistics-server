import { errorMessage } from "../utils/utils.js";
import { jwtVerifyService } from "./auth.service.js";

let isError = function (e) {
  return e && e.stack && e.message;
};

export const authMiddlewareService = async (header, res) => {
  if (!header || header === "")
    return errorMessage(400, "No token provided")(res);
  header = header.replace("Bearer ", "");

  let jwtVerifier = await jwtVerifyService(header);

  if (isError(jwtVerifier)) throw jwtVerifier;

  if (!jwtVerifier) return errorMessage(400, "Authorization Failed")(res);

  return jwtVerifier;
};

export const blockedUserService = async (req) => {
  if (req.userData.isBlocked)
    return errorMessage(
      400,
      "Your account has been blocked, please contact admin!",
      null
    )(res);
  return true;
};
