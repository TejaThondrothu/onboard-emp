import mongoose from "mongoose";

// Dependent Details Schema
const dependentDetailsSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    empId: { type: Number, required: true },
    name: { type: String, required: true },
    birthDate: { type: Date },
    age: { type: String },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    relationShip: { type: Number },
    createdOn: { type: Date, default: Date.now }
  }, { timestamps: true });
  export const DependentDetails = mongoose.model("DependentDetails", dependentDetailsSchema);