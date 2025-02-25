import { createDriverAdminService } from "../../services/drivers.service.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const createDriversController = async (req, res, next) => {
  let { fullName, email, vehicle, vehicleID, document, phone } = req.body;
  let userData = {
    fullName,
    email,
    password: email,
    phoneNumber: {
      numberCode: phone,
    },
    isVerified: true,
  };
  let data = {
    isVerified: true,
    documents: {
      vehicle: {
        name: vehicle,
        plate_number: vehicleID,
      },
      license: {
        type: document,
      },
    },
  };
  let driver = await createDriverAdminService(userData, data);
  console.log(driver)
  if (driver)
    return successMessage(200, "Driver Added Successfully", driver)(res);
  if (!driver) return errorMessage(400, "Could not create Driver", null)(res);
};
