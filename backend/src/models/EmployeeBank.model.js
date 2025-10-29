import mongoose from "mongoose";

const employeeBankSchema = new mongoose.Schema({
    bankId: { type: Number, required: true, unique: true },
    empId: { type: Number, required: true },
    bankName: { type: String, required: true },
    branchName: { type: String },
    branchCity: { type: String },
    bankAccountNumber: { type: String, required: true },
    ifscCode: { type: String, required: true },
    createdOn: { type: Date, default: Date.now }
  }, { timestamps: true });
  export const EmployeeBank = mongoose.model("EmployeeBank", employeeBankSchema);