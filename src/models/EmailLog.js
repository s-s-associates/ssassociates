import mongoose from "mongoose";

const emailLogSchema = new mongoose.Schema(
  {
    subject: { type: String, trim: true, default: "" },
    recipientCount: { type: Number, default: 0 },
    successCount: { type: Number, default: 0 },
    failedCount: { type: Number, default: 0 },
    status: { type: String, enum: ["sent", "partial", "failed"], default: "sent" },
    templateId: { type: String, trim: true, default: "" },
    templateTitle: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.EmailLog ||
  mongoose.model("EmailLog", emailLogSchema);
