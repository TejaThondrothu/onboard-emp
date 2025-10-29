import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true },
    organizationName: { type: String, required: true },
    organizationAddress: { type: String },
    joiningDate: { type: Date, required: true },
    leavingDate: { type: Date },
    duration: { type: String },
    employeeNo: { type: String },
    designationId: { type: Number },
    employeeType: { type: Number },
    contractAgencyDetails: { type: String },
    reasonForLeaving: { type: String },
    managerName: { type: String },
    createdOn: { type: Date, default: Date.now },
    uploadDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "ExperienceUploadDoc" }],
  },
  { timestamps: true }
);

export default mongoose.model("ExperienceDetails", experienceSchema);
