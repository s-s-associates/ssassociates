import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    teamSchoolName: { type: String, trim: true, default: "" },
    isEmailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

userSchema.index({ email: 1 });
export default mongoose.models.User || mongoose.model("User", userSchema);
