import { OrderModel } from "../models/order.model.js";
import { TrackModel } from "../models/track.model.js";

export const getTrackPackageService = async (query) => {
  try {
    let track = await TrackModel.findOne(query).populate([
      {
        path: "driver.details",
        select: "account",
        populate: {
          path: "account",
          select: "fullName email phoneNumber profile",
          populate: {
            path: "profile",
            select: "driver",
            populate: { path: "driver", select: "documents" },
          },
        },
      },
      {
        path: "order",
        select: "_package quote paymentStatus deliveryStatus reciever sender",
        populate: { path: "quote" },
      },
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

    await OrderModel.findByIdAndUpdate(
      req.params.orderID,
      { $set: { track: trackPackage._id } },
      { new: true }
    );

    return trackPackage;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllTrackingPackageService = async (query = {}) => {
  try {
    let track = await TrackModel.find(query).populate([
      {
        path: "driver.details",
        select: "account",
        populate: {
          path: "account",
          select: "fullName email phoneNumber profile",
          populate: {
            path: "profile",
            select: "driver",
            populate: { path: "driver", select: "documents" },
          },
        },
      },
      {
        path: "order",
        select: "_package quote paymentStatus deliveryStatus reciever sender",
        populate: { path: "quote" },
      },
    ]);

    return track;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const updateTrackStateService = async (trackID, data) => {
  try {
    let track = await TrackModel.findOneAndUpdate(
      { trackID, "trackingInfo.head": data.head },
      {
        $set: {
          "trackingInfo.$.isDone": true,
          "trackingInfo.$.content": data.content,
          "trackingInfo.$.createdDate": new Date(),
        },
      },
      { new: true }
    );
    return track;
  } catch (error) {
    console.log(error);
    return false;
  }
};
