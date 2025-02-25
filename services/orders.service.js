import { OrderModel } from "../models/order.model.js";
import { UserModel } from "../models/users.model.js";
import { QuoteModel } from "../models/quote.model.js";
import { formatUserService } from "./user.service.js";

export const createOrderService = async (data, userID, req) => {
  console.log(req.userData.id, req.query.admin);

  try {
    const { shippingCost, totalCost, expressFee, ...rest } = data;

    let orderQuote = await new QuoteModel({
      shipping: shippingCost,
      cost: totalCost,
      express: expressFee,
      user: req.userData.id,
    });

    await orderQuote.save();

    let order = await new OrderModel({
      ...rest,
      quote: orderQuote._id,
      user: req.userData.id,
    });
    await order.save();

    await QuoteModel.findByIdAndUpdate(
      orderQuote._id,
      { $set: { order: order._id } },
      { new: true }
    );

    let user = req.query.admin
      ? order
      : await UserModel.findByIdAndUpdate(
          userID,
          {
            $push: { orders: order._id },
          },
          { new: true }
        ).populate(["cards", "account", "orders"]);

    let formattedUser = req.query.admin ? user : formatUserService(user);
    return formattedUser;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getAllOrdersService = async (query = {}) => {
  try {
    const orders = await OrderModel.find(query)
      .populate({ path: "quote", select: "cost charges express shipping" })
      .populate({
        path: "user",
        select: "avatar",
        populate: { path: "account", select: "fullName email phoneNumber" },
      })
      .populate({
        path: "courier",
        select: "driver user",
        populate: [
          {
            path: "driver.details",
            select: "account",
            populate: { path: "account", select: "fullName phoneNumber email" },
          },
          {
            path: "user",
            select: "account",
            populate: { path: "account", select: "fullName phoneNumber email" },
          },
        ],
      });

    return orders;
  } catch (error) {
    console.log(error);
    return false;
  }
};
