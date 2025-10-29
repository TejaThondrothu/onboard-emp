import mongoose from "mongoose";

// Emergency Contact Schema
const emergencyContactSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    empId: { type: Number, required: true },
    contactPersonName: { type: String, required: true },
    contactRelation: { type: String },
    contactMobileNo: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
  }, { timestamps: true });
  export const EmergencyContact = mongoose.model("EmergencyContact", emergencyContactSchema);