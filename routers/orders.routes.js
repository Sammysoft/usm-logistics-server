import express from "express";
import {
  createOrderController,
  createOrderRequiredController,
} from "../controllers/Orders/order.controller.post.js";
import { userMiddleware } from "../services/user.middleware.service.js";

const OrderRouter = express.Router();

OrderRouter.post(
  "/create",
  createOrderRequiredController,
  userMiddleware,
  createOrderController
);

export default OrderRouter;
