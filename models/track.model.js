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
    trackingInfo: {
      type: [
        {
          head: { type: String, default: "Package Assigned" },
          isDone: { type: Boolean, default: true },
          content: {
            type: String,
            default: "Assigned package to courier.",
          },
          createdDate: { type: Date, default: new Date() },
        },
        {
          head: { type: String, default: "At pickup" },
          isDone: { type: Boolean, default: false },
          content: String,
          createdDate: { type: Date, default: new Date() },
        },
        {
          head: { type: String, default: "Enroute" },
          isDone: { type: Boolean, default: false },
          content: String,
          createdDate: { type: Date, default: new Date() },
        },
        {
          head: { type: String, default: "At sorting hub" },
          isDone: { type: Boolean, default: false },
          content: String,
          createdDate: { type: Date, default: new Date() },
        },
        {
          head: { type: String, default: "Delivered" },
          isDone: { type: Boolean, default: false },
          content: String,
          createdDate: { type: Date, default: new Date() },
        },
      ],
      default: function () {
        return [
          {
            head: "Package Assigned",
            isDone: true,
            content: "Assigned package to courier.",
            createdDate: new Date(),
          },
          {
            head: "At pickup",
            isDone: false,
            content: "",
            createdDate: new Date(),
          },
          {
            head: "Enroute",
            isDone: false,
            content: "",
            createdDate: new Date(),
          },
          {
            head: "At sorting hub",
            isDone: false,
            content: "",
            createdDate: new Date(),
          },
          {
            head: "Delivered",
            isDone: false,
            content: "",
            createdDate: new Date(),
          },
        ];
      },
    },
  },
  {
    timestamps: true,
  }
);

export const TrackModel = mongoose.model("Tracks", trackSchema);
