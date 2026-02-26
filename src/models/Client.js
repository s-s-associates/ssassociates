import mongoose from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, trim: true, default: "" },
    title: { type: String, required: true, trim: true },
    description: { type: String, trim: true, default: "" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Client || mongoose.model("Client", clientSchema);
