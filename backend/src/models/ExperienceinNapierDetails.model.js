import mongoose from "mongoose";

const experienceinNapierSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true },
    businessUnit: { type: String, required: true },
    location: { type: String },
    joiningDate: { type: Date, required: true },
    leavingDate: { type: Date },
    duration: { type: String },
    managerName: { type: String },
    employeeType: { type: Number },
    employeeCode: { type: String, required: true },
    employeeNumber: { type: String },
    createdOn: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

export default mongoose.model("ExperienceinNapierDetails", experienceinNapierSchema);
