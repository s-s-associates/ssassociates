import mongoose from "mongoose";

const testimonialSchema = new mongoose.Schema(
  {
    clientName: { type: String, required: true, trim: true },
    role: { type: String, trim: true, default: "" },
    content: { type: String, required: true, trim: true },
    imageUrl: { type: String, trim: true, default: "" },
    order: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

testimonialSchema.index({ userId: 1, order: 1 });
export default mongoose.models.Testimonial || mongoose.model("Testimonial", testimonialSchema);
