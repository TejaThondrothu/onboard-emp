import mongoose from "mongoose";
//import { EducationDocsUpload } from "./EducationDocsUpload.model.js";

// Education Details Schema
const educationDetailsSchema = new mongoose.Schema({
    educationId: { type: Number, required: true, unique: true },
    empId: { type: Number, required: true },
    qualificationId: { type: Number },
    institutionName: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    degree: { type: String },
    branch: { type: String },
    scoredMarks: { type: String },
    createdOn: { type: Date, default: Date.now },
    duration: { type: String },
    uploadDocs: [{ type: mongoose.Schema.Types.ObjectId, ref: "EducationDocsUpload" }]
  }, { timestamps: true });
  
  export const EducationDetails = mongoose.model("EducationDetails", educationDetailsSchema);