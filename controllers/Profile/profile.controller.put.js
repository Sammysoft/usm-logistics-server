import {
  addCardToProfileService,
  editProfileService,
} from "../../services/user.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const editProfileRequiredController = async (req, res, next) => {
  const { fullName, address, avatar } = req.body;
  const data = {
    fullName,
    address,
    avatar,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const editProfileController = async (req, res) => {
  let updatedUser = await editProfileService(req.params.userID, req.body, req);
  // console.log(updatedUser);
  if (updatedUser)
    return successMessage(200, "Update Successful 👍🏼", updatedUser)(res);
  if (!updatedUser) return errorMessage(400, "Update Failed 😢", null)(res);
};

export const addCardToProfileRequiredController = async (req, res, next) => {
  const card = req.body;
  const data = {
    cvv: card.cvv,
    userID: req.params.userID,
    cardName: card.cardName,
    cardNumber: card.cardNumber,
    expiryDate: card.expiryDate,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const addCardToProfileController = async (req, res) => {
  // console.log(req.body);
  const data = req.body;
  const userID = req.params.userID;
  let updatedUser = await addCardToProfileService(data, userID);

  if (updatedUser)
    return successMessage(200, "Card Added 👍🏻", updatedUser)(res);
  if (!updatedUser) return errorMessage(400, "Add card failed 😢", null)(res);
};
