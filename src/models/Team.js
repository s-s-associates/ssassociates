import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    teamName: { type: String, required: true, trim: true },
    season: { type: String, required: true, trim: true },
    games: { type: Number, required: true, min: 0, default: 0 },
    plays: { type: Number, required: true, min: 0, default: 0 },
    session: { type: String, required: true, trim: true }, // year e.g. "2024"
  },
  { timestamps: true }
);

teamSchema.index({ userId: 1, createdAt: -1 });
export default mongoose.models.Team || mongoose.model("Team", teamSchema);
