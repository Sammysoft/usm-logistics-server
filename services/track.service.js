import { TrackModel } from "../models/track.model.js";

export const getTrackPackageService = async (query) => {
  try {
    let track = await TrackModel.findOne(query).populate([
      { path: "driver", model: "Users" },
      { path: "order", model: "Orders" },
      { path: "user", model: "Users" },
    ]);
    return track;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const createTrackPackageService = async (trackingID, req) => {
  try {
    let trackPackage = await new TrackModel();
    trackPackage.user = req.userData.id;
    trackPackage.trackingID = trackingID;
    trackPackage.order = req.params.orderID;
    trackPackage.driver = req.params.driverID;
    await trackPackage.save();

    return trackPackage;
  } catch (error) {
    console.log(error);
    return false;
  }
};
