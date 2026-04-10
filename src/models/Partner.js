import mongoose from "mongoose";

const partnerSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, trim: true, default: "" },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    url: { type: String, trim: true, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Partner || mongoose.model("Partner", partnerSchema);
