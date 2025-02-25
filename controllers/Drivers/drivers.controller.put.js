import { assignDriverService } from "../../services/drivers.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const assignDriverController = async (req, res, next) => {
  let track = await assignDriverService(
    req.params.driverID,
    req.query.order,
    req.query.trackingID
  );

  if (track) return successMessage(200, "Track", track)(res);
  if (!track) return errorMessage(400, "Could not assign order", null)(res);
};
