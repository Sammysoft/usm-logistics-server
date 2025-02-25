import express from "express";
import {
  createOrderController,
  createOrderRequiredController,
} from "../controllers/Orders/order.controller.post.js";
import { userMiddleware } from "../services/user.middleware.service.js";
import { adminMiddleware } from "../services/admin.middleware.service.js";
import { getAllOrdersController } from "../controllers/Orders/order.controller.get.js";

const OrderRouter = express.Router();

OrderRouter.post(
  "/create",
  createOrderRequiredController,
  userMiddleware,
  createOrderController
);

OrderRouter.post(
  "/admin/create",
  createOrderRequiredController,
  adminMiddleware,
  createOrderController
);

OrderRouter.get("/admin/get", adminMiddleware, getAllOrdersController);

export default OrderRouter;
