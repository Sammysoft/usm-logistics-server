import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import winston from "winston";
import morgan from "morgan";
import dbInit from "./utils/dbInit.js";

import AccountRouter from "./routers/account.routes.js";
import UserRouter from "./routers/user.routes.js";
import QuoteRouter from "./routers/quotes.routes.js";
import OrderRouter from "./routers/orders.routes.js";
import TrackRouter from "./routers/track.routes.js";
import DriverRouter from "./routers/driver.routes.js";
import AdminRouter from "./routers/admin.routes.js";

const app = express();
const port = process.env.PORT || 1000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

app.use(express.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: "application/json" }));
app.use(cors(corsOptions));

app.use(helmet());

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

app.use(
  morgan("combined", {
    stream: {
      write: (message) => {
        logger.info(message.trim());
      },
    },
  })
);

app.listen(port, "0.0.0.0", async () => {
  dbInit();
  // console.log(mongoose.modelNames())
  console.log(`Server running on https://localhost:${port}`);
});

app.use("/api/v1/", AccountRouter);
app.use("/api/v1/admin/", AdminRouter);
app.use("/api/v1/user/", UserRouter);
app.use("/api/v1/order/", OrderRouter);
app.use("/api/v1/quote/", QuoteRouter);
app.use("/api/v1/track/", TrackRouter);
app.use("/api/v1/driver/", DriverRouter);
