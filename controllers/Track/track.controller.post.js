import { createTrackPackageService } from "../../services/track.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const createTrackRequiredController = async (req, res, next) => {
  const data = {
    trackingID: req.body.trackingID,
    orderID: req.params.orderID,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const createTrackController = async (req, res) => {
  let trackingID = req.query.trackingID;

  let track = await createTrackPackageService(trackingID, req);
  if (track) return successMessage(200, "Synced Track", track)(res);
  if (!track)
    return errorMessage(
      400,
      "Internal Server Error, please contact support",
      null
    )(res);
};
