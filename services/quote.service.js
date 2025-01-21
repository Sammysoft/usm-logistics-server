import { getQuote } from "../utils/strings.js";

export const getQuickQuoteService = async (
  weight,
  container,
  express = false
) => {
  try {
    let shippingCost = await getQuote(weight, container);
    let expressFee = express ? (Number(shippingCost) * 10) / 100 : null;
    return {
      shippingCost,
      expressFee,
      totalCost: Number(shippingCost + expressFee),
    };
  } catch (error) {
    console.log(error);
    return false;
  }
};
