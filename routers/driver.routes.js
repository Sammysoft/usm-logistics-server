import express from "express";
import { createDriversController } from "../controllers/Drivers/drivers.controller.post.js";
import { adminMiddleware } from "../services/admin.middleware.service.js";
import { getDriversController } from "../controllers/Drivers/drivers.controller.get.js";
import { assignDriverController } from "../controllers/Drivers/drivers.controller.put.js";

const DriverRouter = express.Router();

DriverRouter.post("/create", adminMiddleware, createDriversController);
DriverRouter.get("/get", adminMiddleware, getDriversController);
DriverRouter.put("/assign/:driverID", adminMiddleware, assignDriverController);


export default DriverRouter;
