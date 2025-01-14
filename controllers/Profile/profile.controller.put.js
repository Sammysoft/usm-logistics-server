import {
  addCardToProfileService,
  editProfileService,
} from "../../services/user.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const editProfileRequiredController = async (req, res, next) => {
  const { fullName, address } = req.body;
  const data = {
    fullName,
    address,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const editProfileController = async (req, res) => {
  let updatedUser = await editProfileService(req.params.userID, req.body, req);
  if (updatedUser)
    return successMessage(200, "Update Successful 👍🏼", updatedUser)(res);
  if (!updatedUser) return errorMessage(400, "Update Failed 😢", null)(res);
};

export const addCardToProfileRequiredController = async (req, res, next) => {
  const data = {
    address: req.body.address,
    userID: req.params.userID,
    fullName: req.body.fullName,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const addCardToProfileController = async (req, res) => {
  const data = req.body;
  const userID = req.params.userID;
  let updatedUser = await addCardToProfileService(data, userID);

  if (updatedUser)
    return successMessage(200, "Card Added 👍🏻", updatedUser)(res);
  if (!updatedUser) return errorMessage(400, "Add card failed 😢", null)(res);
};
