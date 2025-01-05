import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    password: { type: String, required: true },
    email: { type: String, required: true },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    isAdmin: { type: Boolean, default: false },
    isBloced: { type: Boolean, default: false },
  },

  { timestamps: true }
);

export const AccountModel = mongoose.model("Accounts", accountSchema);
