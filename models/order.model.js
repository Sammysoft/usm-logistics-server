import mongoose from "mongoose";

const orderSchema = mongoose.Schema(
  {
    sender: {
      phone: { type: Number },
      name: { type: String },
      address: { type: String },
      home: { type: String },
    },
    reciever: {
      name: { type: String },
      phone: { type: Number },
      address: { type: String },
      zipCode: { type: String },
      country: { type: String },
      pickCenter: { type: String },
      paymentMethod: {
        type: String,
        enum: ["online", "cash"],
        default: "online",
      },
      deliveryType: {
        type: String,
        enum: ["home", "pickup"],
        default: "home",
        required: true,
      },
    },
    _package: {
      trackingID: { type: String, required: true },
      orderType: {
        type: String,
        enum: ["express", "normal"],
        default: "normal",
        required: true,
      },
      name: { type: String, requird: true },
      weight: { type: Number, required: true },
      box: { price: { type: Number }, name: { type: String } },
      packageType: { type: String },
      condition: { type: String, enum: ["harzadious", "non-harzadious"] },
    },
    quote: { type: mongoose.Schema.Types.ObjectId, ref: "Quotes" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    paymentStatus: {
      type: String,
      default: "Pending",
    },
    deliveryStatus: {
      type: String,
      default: "Pending",
    },
    courier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tracks",
    },
  },
  { timestamps: true }
);

export const OrderModel = mongoose.model("Orders", orderSchema);
