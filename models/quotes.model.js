import mongoose from "mongoose";

const quoteSchema = mongoose.Schema(
  {
    order: { type: mongoose.Schema.Types.ObjectId, ref: "Orders" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    shipping: { type: Number, required: true },
    cost: { type: Number },
    charges: { type: Number, default: 0 },
    express: { type: Number },
  },
  { timestamps: true }
);



export const QuoteModel = mongoose.model("Quotes", quoteSchema);
