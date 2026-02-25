import mongoose from "mongoose";

const PAYMENT_STATUS = ["pending", "active", "cancelled"];

const paymentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    amount: { type: Number, required: true }, // in cents or smallest currency unit
    currency: { type: String, default: "usd" },
    status: { type: String, required: true, enum: PAYMENT_STATUS, default: "pending" },
    stripePaymentIntentId: { type: String, trim: true },
    stripeCustomerId: { type: String, trim: true },
    paidAt: { type: Date },
  },
  { timestamps: true }
);

paymentSchema.index({ userId: 1, status: 1 });
paymentSchema.index({ userId: 1, createdAt: -1 });
export default mongoose.models.Payment || mongoose.model("Payment", paymentSchema);
