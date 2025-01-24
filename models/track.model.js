import mongoose from "mongoose";

const trackSchema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    driver: {
      details: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
      location: { longitude: { type: Number }, latitude: { type: Number } },
    },
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
    trackingID: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const TrackModel = mongoose.model("Tracks", trackSchema);
