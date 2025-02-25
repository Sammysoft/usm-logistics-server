import { AccountModel } from "../models/account.model.js";

export const getCustomersService = async (query = { isAdmin: false }) => {
  try {
    let customers = await AccountModel.find(query).populate("profile");
    customers = customers.filter(
      (val) => val?.profile && !val?.profile?.driver
    );
    if (customers) return customers;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getCustomerService = async (customerID) => {
  try {
    let customer = await AccountModel.findById(customerID).populate({
      path: "profile",
      model: "Users",
      select: "avatar driver address orders",
      populate: [
        {
          path: "orders",
          model: "Orders",
          populate: [
            {
              path: "courier",
              model: "Tracks",
              select: "driver.details trackingInfo",
              populate: {
                path: "driver.details",
                select: "account",
                populate: {
                  path: "account",
                  select: "fullName email phoneNumber",
                },
              },
            },
            { path: "quote", model: "Quotes" },
          ],
        },
      ],
    });

    if (customer) return customer;
  } catch (error) {
    console.log(error);
  }
};
