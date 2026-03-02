import mongoose from "mongoose";

const subscriberSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true, lowercase: true, unique: true },
  },
  { timestamps: true }
);

subscriberSchema.index({ email: 1 }, { unique: true });

export default mongoose.models.Subscriber ||
  mongoose.model("Subscriber", subscriberSchema);
