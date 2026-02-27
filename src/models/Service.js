import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    icon: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

serviceSchema.index({ userId: 1, order: 1 });
export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
