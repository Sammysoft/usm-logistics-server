import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    avatar: { type: String },
    phoneNumber: {
      countryCode: { type: String },
      numberCode: { type: String, required: true },
    },
    account: { type: mongoose.Schema.Types.ObjectId, ref: "Account" },
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
  },
  { timestamps: true }
);

export const UserModel = mongoose.model("Users", userSchema);
