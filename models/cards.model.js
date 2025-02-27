import mongoose from "mongoose";

const cardSchema = mongoose.Schema(
  {
    cardName: { type: String, required: true },
    cardNumber: { type: Number, required: true },
    expiryDate: { type: String, required: true },
    cvv: { type: String, required: true },
    defaultCard: { type: Boolean, default: false },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  },
  { timestamps: true }
);

export const CardModel = mongoose.model("Cards", cardSchema);
