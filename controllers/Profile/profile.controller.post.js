import { addLocationToProfileService } from "../../services/user.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const addLocationRequiredController = async (req, res, next) => {
  let address = req.body.address;

  const data = {
    label: address.label,
    line1: address.line1,
    line2: address.line2,
    country: address.country,
    state: address.state,
    city: address.city,
    zipCode: address.zipCode,
    accountID: req.params.accountID,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const addLocationToProfileController = async (req, res, next) => {
  const address = req.body.address;
  let updatedAccount = await addLocationToProfileService(
    address,
    req.body.accountID
  );

  if (updatedAccount)
    return successMessage(200, "Address added 👍🏼", updatedAccount)(res);
  if (!updatedAccount)
    return errorMessage(400, "Internal Server Error 😢")(res);
};
