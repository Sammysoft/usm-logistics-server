import express from "express";
import {
  getQuickQuoteContoller,
  getQuickQuoteRequiredController,
} from "../controllers/Quotes/quote.controller.get.js";

const QuoteRouter = express.Router();

QuoteRouter.post(
  "/get/quick-quote",
  getQuickQuoteRequiredController,
  getQuickQuoteContoller
);

export default QuoteRouter;
