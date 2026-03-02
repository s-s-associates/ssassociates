import mongoose from "mongoose";

const contactSubmissionSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    companyName: { type: String, trim: true, default: "" },
    phone: { type: String, required: true, trim: true },
    address: { type: String, trim: true, default: "" },
    message: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.ContactSubmission || mongoose.model("ContactSubmission", contactSubmissionSchema);
