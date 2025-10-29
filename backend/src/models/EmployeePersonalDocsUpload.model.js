import mongoose from "mongoose";

const employeeDocsSchema = new mongoose.Schema(
  {
    empId: { type: Number, required: true },
    fileName: { type: String, required: true },
    fileDescription: { type: String },
    docextention: { type: String },
    docDescription: { type: String },
    uploadpath: { type: String },
    context: { type: Number },
    specialDocpath: { type: String },
    isDeleted: { type: Boolean, default: false },
    documentStatus: { type: Number },
    createdBy: { type: Number },
    editedBy: { type: Number },
    createUser: { type: String },
    updateUser: { type: String },
    createdDate: { type: Date, default: Date.now },
    editedDate: { type: Date },
    uploadedDate: { type: Date },
    documentTypeId: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("EmployeePersonalDocsUpload", employeeDocsSchema);
