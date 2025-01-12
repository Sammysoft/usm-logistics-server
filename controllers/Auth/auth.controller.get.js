import { successMessage, errorMessage } from "../../utils/utils.js";

export const authUserDetailsController = async (req, res) => {
  console.log(req.userData)
  let user = req.userData;
  if (user) return successMessage(200, "Welcome 👍🏼", user)(res);
  if (!user) return errorMessage(400, "Internal Server Error", null)(res);
};
