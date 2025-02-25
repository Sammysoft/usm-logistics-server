import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    avatar: { type: String },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Accounts" },
    driver: { type: mongoose.Schema.Types.ObjectId, ref: "Drivers" },
    address: {
      label: { type: String },
      line1: { type: String },
      line2: { type: String },
      country: { type: String },
      state: { type: String },
      city: { type: String },
      zipCode: { type: String },
    },
    cards: [{ type: mongoose.Schema.Types.ObjectId, ref: "Cards" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Orders" }],
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("Users", userSchema);
