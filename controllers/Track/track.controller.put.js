import { updateTrackStateService } from "../../services/track.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const updateTrackStatusRequiredController = async (req, res, next) => {
  let data = {
    trackID: req.params.trackID,
    head: req.body.head,
    content: req.body.content,
  };

  if (!isRequired(data, res)) return;
  return next();
};

export const updateTrackStateController = async (req, res) => {
  let track = await updateTrackStateService(req.params.trackID, req.body);
  if (track) successMessage(200, "Updated Status", track)(res);
  if (!track) errorMessage(400, "Could not update", null)(res);
};
