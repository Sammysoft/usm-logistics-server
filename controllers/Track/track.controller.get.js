import { getTrackPackageService } from "../../services/track.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getTrackPackageController = async (req, res) => {
  let trackPackage = await getTrackPackageService({
    trackingID: req.params.trackingID,
  });
  if (trackPage)
    return successMessage(200, "Package Info Loaded...", trackPackage)(res);
  if (!trackPackage)
    return errorMessage(400, "Internal Server Error", null)(res);
};
