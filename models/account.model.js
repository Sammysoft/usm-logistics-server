import mongoose from "mongoose";

const accountSchema = mongoose.Schema(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: {
      countryCode: { type: String },
      numberCode: { type: String, required: true },
    },
    profile: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    isAdmin: { type: Boolean, default: false },
    isBlocked: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    otpCode: { type: Number },
    lastOtpGenerated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// Generate a new OTP
const generateOtp = () => Math.floor(1000 + Math.random() * 9000);

accountSchema.pre("save", function (next) {
  if (!this.otpCode) {
    this.otpCode = generateOtp();
    this.lastOtpGenerated = Date.now();
  }
  next();
});

// Method to check and update OTP if older than 1 minute
accountSchema.methods.updateOtpIfExpired = async function () {
  const currentTime = Date.now();
  const fiveMinutes = 1 * 60 * 1000;

  if (currentTime - this.lastOtpGenerated > fiveMinutes) {
    this.otpCode = generateOtp();
    this.lastOtpGenerated = currentTime;
    await this.save();
    return false;
  } else {
    this.otpCode = generateOtp();
    this.lastOtpGenerated = currentTime;
    await this.save();
    return true;
  }
};

export const AccountModel = mongoose.model("Accounts", accountSchema);
