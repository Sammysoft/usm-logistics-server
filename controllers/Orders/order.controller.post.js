import { createOrderService } from "../../services/orders.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const createOrderRequiredController = async (req, res, next) => {
  const { sender, reciever, expressFee, shippingCost, totalCost, _package } =
    req.body;
  let data = {
    sender,
    reciever,
    _package,
    shippingCost,
    totalCost,
    expressFee,
  };
  if (!isRequired(data, res)) return;
  return next();
};

export const createOrderController = async (req, res) => {
  const data = req.body;
  const userID = req.userData.id;

  let updatedUserData = await createOrderService(data, userID, req);
  // console.log(updatedUserData)
  if (updatedUserData)
    return successMessage(200, "Order created", updatedUserData)(res);
  if (!updatedUserData)
    return errorMessage(400, "Order failed, please contact support", null)(res);
};
