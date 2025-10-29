import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true, unique: true },
    regId: { type: Number, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    lastName: { type: String, required: true },
    fatherName: { type: String },
    birthDate: { type: Date },
    nationality: { type: String },
    maritalStatus: { type: String },
    bloodGroup: { type: String },
    emailId: { type: String, required: true, unique: true },
    mobileNumber: { type: String, required: true },
    aadhaar: { type: String },
    pan: { type: String },
    aadhaarName: { type: String },
    passport: { type: String },
    passportExpiryDate: { type: Date },
    relocationFlag: { type: Boolean, default: false },
    priorEmployment: { type: Boolean, default: false },
    workedInNapier: { type: Boolean, default: false },
    createdOn: { type: Date, default: Date.now },
    uan: { type: String },
    submittedDate: { type: Date },
    submittedStatus: { type: Number },
    gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
    declarationFlag: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);
