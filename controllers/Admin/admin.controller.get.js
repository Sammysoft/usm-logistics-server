import {
  getCustomerService,
  getCustomersService,
} from "../../services/admin.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getCustomersController = async (req, res, next) => {
  let customers = await getCustomersService();
  if (customers) successMessage(200, "Customers", customers)(res);
  if (!customers) errorMessage(400, "Could get customers", null)(res);
};

export const getCustomerController = async (req, res, next) => {
  let customer = await getCustomerService(req.params.customerID);
  if (customer) successMessage(200, "Customer Detail", customer)(res);
  if (!customer)
    errorMessage(400, "Could not fetch customer detail", null)(res);
};
