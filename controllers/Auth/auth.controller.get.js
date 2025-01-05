import { successMessage, errorMessage } from "../../utils/utils.js";

export const authUserDetailsController = async (req, res) => {
  let user = req.userData;
  if (user) return successMessage(200, "User Details", user)(res);
  if (!user) return errorMessage(400, "Internal Server Error", null)(res);
};
