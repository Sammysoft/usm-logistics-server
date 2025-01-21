import { OrderModel } from "../models/order.model.js";
import { UserModel } from "../models/users.model.js";
import { QuoteModel } from "../models/quote.model.js";
import { formatUserService } from "./user.service.js";


export const createOrderService = async (data, userID, req) => {
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

    let user = await UserModel.findByIdAndUpdate(
      userID,
      {
        $push: { orders: order._id },
      },
      { new: true }
    ).populate(["cards", "account", "orders"]);

    let formattedUser = formatUserService(user);
    return formattedUser;
  } catch (error) {
    return false;
  }
};
