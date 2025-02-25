import {
  getAllTrackingPackageService,
  getTrackPackageService,
} from "../../services/track.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getTrackPackageController = async (req, res) => {
  let trackPackage = await getTrackPackageService({
    trackingID: req.query.trackingID,
  });
  if (trackPackage)
    return successMessage(200, "Package Info Loaded...", trackPackage)(res);
  if (!trackPackage)
    return errorMessage(400, "Internal Server Error", null)(res);
};

export const getAllTrackingPackageController = async (req, res) => {
  let track = await getAllTrackingPackageService();
  if (track) return successMessage(200, "Tracks", track)(res);
  if (!track) return errorMessage(400, "Couldn't fetch tracks", null)(res);
};
