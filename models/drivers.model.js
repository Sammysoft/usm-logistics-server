import { Schema, model } from "mongoose";

const driverSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "Users" },
  orders: [{ type: Schema.Types.ObjectId, ref: "Orders" }],
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  documents: {
    vehicle: {
      name: { type: String },
      plate_number: { type: String },
      upload: { type: String },
    },
    license: {
      upload: { type: String },
      type: { type: String },
    },
    identification: {
      name: { type: String },
      number: { type: String },
      upload: { type: String },
    },
  },
});

export const DriversModel = model("Drivers", driverSchema);
