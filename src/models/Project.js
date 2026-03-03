import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    // Hero / Main
    bannerUrl: { type: String, trim: true, default: "" },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, trim: true, default: "" },
    location: { type: String, trim: true, default: "" },
    status: { type: String, enum: ["Completed", "Ongoing", "Upcoming"], default: "Upcoming" },
    year: { type: String, trim: true, default: "" },
    ctaType: { type: String, enum: ["Contact Us", "Get Quote", "View Brochure"], default: "Contact Us" },
    ctaLink: { type: String, trim: true, default: "" },

    // Overview
    description: { type: String, trim: true, default: "" },
    clientName: { type: String, trim: true, default: "" },
    category: { type: String, trim: true, default: "" },
    projectArea: { type: String, trim: true, default: "" },
    projectAreaUnit: { type: String, enum: ["sq ft", "m²"], default: "sq ft" },
    budget: { type: String, trim: true, default: "" },
    durationStart: { type: Date },
    durationEnd: { type: Date },

    // Specifications
    structureType: { type: String, trim: true, default: "" },
    floors: { type: String, trim: true, default: "" },
    materialsUsed: { type: String, trim: true, default: "" },
    foundationType: { type: String, trim: true, default: "" },
    safetyStandards: { type: String, trim: true, default: "" },
    sustainabilityFeatures: { type: String, trim: true, default: "" },
    certifications: { type: String, trim: true, default: "" },

    // Gallery & Video
    imageGallery: [{ type: String, trim: true }],
    videoUrl: { type: String, trim: true, default: "" },

    // Challenges & Solutions
    challengesFaced: { type: String, trim: true, default: "" },
    solutionsImplemented: { type: String, trim: true, default: "" },
    uniqueApproach: { type: String, trim: true, default: "" },

    order: { type: Number, default: 0 },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

projectSchema.index({ userId: 1, order: 1, createdAt: -1 });
export default mongoose.models.Project || mongoose.model("Project", projectSchema);
