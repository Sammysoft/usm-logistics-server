import { AccountModel } from "../models/account.model.js";
import { DriversModel } from "../models/drivers.model.js";
import { OrderModel } from "../models/order.model.js";
import { TrackModel } from "../models/track.model.js";
import { UserModel } from "../models/users.model.js";
import { authRegisterAccountService } from "./auth.service.js";

export const createDriverAdminService = async (userData, data) => {
  try {
    let account = await authRegisterAccountService(userData);
    if (account) {
      let driver = await new DriversModel(data);
      await driver.save();

      let user = await new UserModel({
        account: account._id,
        driver: driver._id,
      });
      await user.save();

      driver = await DriversModel.findByIdAndUpdate(
        driver._id,
        {
          $set: { user: user._id },
        },
        { new: true }
      );

      await AccountModel.findByIdAndUpdate(
        account._id,
        {
          $set: { profile: user._id },
        },
        { new: true }
      );
      return driver;
    } else {
      // console.log("Could not do this");
      return false;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getDriversService = async () => {
  try {
    let drivers = await DriversModel.find({}).populate({
      path: "user",
      select: "account",
      populate: { path: "account", select: "fullName email phoneNumber" },
    });
    if (drivers) return drivers;
    if (!drivers) return [];
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const assignDriverService = async (driverID, orderID, trackingID) => {
  try {
    let driver = await DriversModel.findById(driverID);
    let track = await TrackModel({
      order: orderID,
      trackingID: trackingID,
      driver: { details: driver.user },
    });
    await track.save();
    if (track) {
      await OrderModel.findByIdAndUpdate(orderID, {
        $set: { courier: track._id },
      });

      await DriversModel.findByIdAndUpdate(driverID, {
        $push: {
          orders: orderID,
        },
      });
      return track;
    }
  } catch (error) {
    console.log(error);
    return false;
  }
};



