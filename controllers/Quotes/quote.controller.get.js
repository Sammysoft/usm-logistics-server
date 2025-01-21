import { getQuickQuoteService } from "../../services/quote.service.js";
import { isRequired } from "../../utils/required.js";
import { errorMessage, successMessage } from "../../utils/utils.js";

export const getQuickQuoteRequiredController = async (req, res, next) => {
  const { weight, container } = req.body;
  let data = { weight, container };

  if (!isRequired(data, res)) return;
  return next();
};

export const getQuickQuoteContoller = async (req, res) => {
  let { weight, container, express } = req.body;
  let quickQuote = await getQuickQuoteService(
    weight,
    container,
    (express = !!express)
  );
  if (quickQuote) return successMessage(200, "Quote Created", quickQuote)(res);
  if (!quickQuote) return errorMessage(400, "Error creating Quote", null)(res);
};
