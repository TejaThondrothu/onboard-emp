import mongoose from "mongoose";

// Education Docs Upload Schema
const educationDocsUploadSchema = new mongoose.Schema({
    fileUploadId: { type: Number, required: true, unique: true },
    empId: { type: Number, required: true },
    fileName: { type: String, required: true },
    fileDescription: { type: String },
    educationId: { type: Number },
    docextention: { type: String },
    docDescription: { type: String },
    uploadpath: { type: String, required: true },
    uploadDoc: { type: Buffer },
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
    uploadedDate: { type: Date }
  }, { timestamps: true });
  export const EducationDocsUpload = mongoose.model("EducationDocsUpload", educationDocsUploadSchema);