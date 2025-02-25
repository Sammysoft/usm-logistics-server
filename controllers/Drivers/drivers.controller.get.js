import { getDriversService } from "../../services/drivers.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getDriversController = async (req, res, next) => {
  let drivers = await getDriversService();
  if (drivers) return successMessage(200, "Drivers", drivers)(res);
  if (!drivers) return errorMessage(400, "Could not fetch drivers", null)(res);
};
