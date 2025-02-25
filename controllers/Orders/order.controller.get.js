import { getAllOrdersService } from "../../services/orders.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getAllOrdersController = async (req, res, next) => {
  const query = { deliveryStatus: req.query.filter };
  const orders = await getAllOrdersService(req.query.filter ? query : {});
  if (orders) return successMessage(200, "Orders", orders)(res);
  if (!orders) return errorMessage(400, "Could not fetch orders", null)(res);
};
