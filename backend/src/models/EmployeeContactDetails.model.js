import mongoose from "mongoose";

const employeeContactSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true },
    currentAddress: { type: String },
    currentCity: { type: String },
    currentState: { type: String },
    currentCountry: { type: String },
    currentZipCode: { type: String },
    permanentAddress: { type: String },
    permanentCity: { type: String },
    permanentState: { type: String },
    permanentCountry: { type: String },
    permanentZipCode: { type: String },
    createdOn: { type: Date, default: Date.now },
    sameAddressFlag: { type: Boolean },
  },
  { timestamps: true }
);

export default mongoose.model("EmployeeContactDetails", employeeContactSchema);
