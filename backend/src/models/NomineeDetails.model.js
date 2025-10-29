import mongoose from "mongoose";

const nomineeSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true },
    name: { type: String, required: true },
    birthDate: { type: Date },
    age: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    relationShip: { type: Number, required: true },
    percentageOfShare: { type: Number, required: true },
    guardianName: { type: String },
    createdOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("NomineeDetails", nomineeSchema);
