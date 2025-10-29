import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    regId: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    emailId: { type: String, required: true, unique: true },
    empType: { type: Number, required: true },
    createdOn: { type: Date, default: Date.now },
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Number, default: 0 }, // 0 - User, 1 - Admin
    fullName: { type: String },
    gnStatus: { type: Number, default: 1 }, // 1 - Active, 0 - Inactive
  },
  { timestamps: true }
);

// Auto-generate full name before saving
userSchema.pre("save", function (next) {
  this.fullName = `${this.firstName} ${this.middleName || ""} ${this.lastName}`.trim();
  next();
});

export default mongoose.model("User", userSchema);
