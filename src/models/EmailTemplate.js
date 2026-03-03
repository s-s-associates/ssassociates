import mongoose from "mongoose";

const emailTemplateSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subject: { type: String, trim: true, default: "" },
    description: { type: String, trim: true, default: "" },
    body: { type: String, trim: true, default: "" },
    heading: { type: String, trim: true, default: "" },
    ctaText: { type: String, trim: true, default: "" },
    ctaUrl: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    categoryColor: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.EmailTemplate ||
  mongoose.model("EmailTemplate", emailTemplateSchema);
