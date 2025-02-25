import express from "express";
import { adminMiddleware } from "../services/admin.middleware.service.js";
import {
  getCustomerController,
  getCustomersController,
} from "../controllers/Admin/admin.controller.get.js";

const AdminRouter = express.Router();

AdminRouter.get("/get/all/customers", adminMiddleware, getCustomersController);
AdminRouter.get(
  "/get/customer/:customerID",
  adminMiddleware,
  getCustomerController
);
export default AdminRouter;
