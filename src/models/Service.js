import mongoose from "mongoose";

const subServiceSchema = new mongoose.Schema(
  {
    title: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    items: { type: [String], default: [] },
  },
  { _id: false }
);

const serviceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    imageUrl: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    whatYouGet: { type: [String], default: [] },
    extraBenefits: { type: [String], default: [] },
    conclusion: { type: String, trim: true, default: "" },
    subServices: { type: [subServiceSchema], default: [] },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

serviceSchema.index({ userId: 1, order: 1 });
export default mongoose.models.Service || mongoose.model("Service", serviceSchema);
