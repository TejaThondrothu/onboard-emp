import Employee from "../models/Employee.model.js";
import {EmployeeBank} from "../models/EmployeeBank.model.js";
import EmployeeContactDetails from "../models/EmployeeContactDetails.model.js";
import {EmergencyContact} from "../models/EmergencyContact.model.js";
import {DependentDetails} from "../models/DependentDetails.model.js";
import {EducationDetails} from "../models/EducationDetails.model.js";
import {EducationDocsUpload} from "../models/EducationDocsUpload.model.js";
import ExperienceDetails from "../models/ExperienceDetails.model.js";
import ExperienceUploadDoc from "../models/ExperienceUploadDoc.model.js";
import ExperienceinNapierDetails from "../models/ExperienceinNapierDetails.model.js";
import EmployeePersonalDocsUpload from "../models/EmployeePersonalDocsUpload.model.js";
import {BackgroundVerificationUploadDoc} from "../models/BackgroundVerificationUploadDoc.model.js";
import NomineeDetails from "../models/NomineeDetails.model.js";
import cloudinary from "../config/cloudinaryConfig.js";
import mongoose from "mongoose";

export const saveEmployeeOnboardDetailsService = async (employeeData) => {
    try {
        // const savedData = {};
        // const {
        //     personalDetails,
        //     bankDetails,
        //     emergencyContactDetails,
        //     addressDetails,
        //     dependentDetails,
        //     educationalDetails,
        //     experienceDetails,
        //     experienceInNapierDetails,
        //     bgDocs,
        //     nomineeDetails
        // } = req.body;
       //return savedData;

        const regId= employeeData.personalDetails.regId;
        const empId = regId;

        if (!regId) {
            throw new Error("Registration ID is required.");
        }

        // Check if Employee already exists
        let employee = await Employee.findOne({ regId });

        if (employee) {
            console.log("Updating existing employee...");
            await Employee.updateOne({ regId }, employeeData.personalDetails);
        } else {
            console.log("Creating new employee...");
            console.log(employeeData.personalDetails);
            employee = new Employee(employeeData.personalDetails);
           const result = await employee.save();
           console.log(result);
        }

        // Save or Update Employee Bank Details
        if (employeeData.bankDetails) {
            await EmployeeBank.findOneAndUpdate(
                { empId },
                employeeData.bankDetails,
                { upsert: true, new: true }
            );
        }

        // Save or Update Address Details
        if (employeeData.addressDetails) {
            await EmployeeContactDetails.findOneAndUpdate(
                { empId },
                employeeData.addressDetails,
                { upsert: true, new: true }
            );
        }

        // Save or Update Emergency Contact
        if (employeeData.emergencyContactDetails) {
            await EmergencyContact.findOneAndUpdate(
                { empId },
                employeeData.emergencyContactDetails,
                { upsert: true, new: true }
            );
        }

        // Save or Update Dependent Details (Array)
        if (employeeData.dependentDetails?.length) {
            await DependentDetails.deleteMany({ empId });
            await DependentDetails.insertMany(
                employeeData.dependentDetails.map(dep => ({ ...dep, empId }))
            );
        }

        // Save or Update Education Details (Array)
        // if (employeeData.educationDetails?.length) {
        //     await EducationDetails.deleteMany({ empId });
        //     await EducationDetails.insertMany(
        //         employeeData.educationDetails.map(edu => ({ ...edu, empId }))
        //     );
        // }
        // Save or Update Education Details (Array) with File Uploads
        if (employeeData.educationDetails?.length) {
            const educationDetailsWithDocs = [];

        // Delete old education details for the employee
        await EducationDetails.deleteMany({ empId });

        for (const edu of employeeData.educationDetails) {
            edu.empId = empId;

            // Handle document references (new ObjectId)
            //edu.uploadDocs = edu.uploadDocs?.map(doc => new mongoose.Types.ObjectId(doc.fileUploadId)) || [];

            const savedEducation = await EducationDetails.create( );

            if (savedEducation) {
                const uploadedDocs = [];

                for (const doc of edu.uploadDocs || []) {
                    if (!doc.fileUploadId) {
                        const fileData = files.find(f => f.originalname === doc.fileName);
                        if (fileData) {
                            // Upload file to Cloudinary
                            const result = await cloudinary.uploader.upload_stream(
                                {
                                    resource_type: "auto",
                                    folder: `onboarding/${empId}`
                                },
                                async (error, uploadResult) => {
                                    if (error) {
                                        console.error("Cloudinary Upload Error:", error);
                                        throw new Error("File upload failed");
                                    }

                                    // File metadata for MongoDB
                                    const newDoc = {
                                        educationId: savedEducation._id,
                                        empId: empId,
                                        uploadpath: uploadResult.secure_url, // Cloudinary URL
                                        specialDocpath: uploadResult.secure_url,
                                        fileDescription: doc.fileName,
                                        docDescription: doc.fileName,
                                        createdBy: empId,
                                        editedBy: empId,
                                        createUser: userFullName,
                                        updateUser: userFullName,
                                        createdDate: new Date(),
                                        editedDate: new Date()
                                    };

                                    uploadedDocs.push(newDoc);

                                    // Insert into DB after Cloudinary upload completes
                                    await EducationDocsUpload.insertMany(uploadedDocs);
                                }
                            );

                            // Write the file stream
                            fileData.stream.pipe(result);
                        }
                    } else {
                        uploadedDocs.push(doc);
                    }
                }

                educationDetailsWithDocs.push(savedEducation);
            }
        }

        // return educationDetailsWithDocs;
        }
        // if (employeeData.educationDetails?.length) {
        //     await EducationDetails.deleteMany({ empId });
        
        //     // Insert new education details with uploaded document references
        //     const educationDetailsWithDocs = employeeData.educationDetails.map(edu => {
        //         return {
        //             ...edu,
        //             empId,
        //             uploadDocs: edu.uploadDocs?.map(doc => new mongoose.Types.ObjectId(doc.fileUploadId)) || [] // Use 'new' keyword
        //         };
        //     });
        
        //     await EducationDetails.insertMany(educationDetailsWithDocs);
        // }


        // Save or Update Experience Details (Array)
        if (employeeData.experienceDetails?.length) {
            await ExperienceDetails.deleteMany({ empId });
            await ExperienceDetails.insertMany(
                employeeData.experienceDetails.map(exp => ({ ...exp, empId }))
            );
        }

        // Save or Update Experience in Napier (Array)
        if (employeeData.experienceInNapierDetails?.length) {
            await ExperienceinNapierDetails.deleteMany({ empId });
            await ExperienceinNapierDetails.insertMany(
                employeeData.experienceInNapierDetails.map(expNapier => ({ ...expNapier, empId }))
            );
        }

        // Save or Update Nominee Details (Array)
        if (employeeData.nomineeDetails?.length) {
            await NomineeDetails.deleteMany({ empId });
            await NomineeDetails.insertMany(
                employeeData.nomineeDetails.map(nominee => ({ ...nominee, empId }))
            );
        }

        // Handle File Uploads (Education Docs)
        if (employeeData.educationDocs) {
            await uploadFilesToCloudinary(employeeData.educationDocs, EducationDocsUpload, empId);
        }

        // Handle File Uploads (Experience Docs)
        if (employeeData.experienceDocs) {
            await uploadFilesToCloudinary(employeeData.experienceDocs, ExperienceUploadDoc, empId);
        }

        // Handle File Uploads (Personal Docs)
        if (employeeData.personalDocs) {
            await uploadFilesToCloudinary(employeeData.personalDocs, EmployeePersonalDocsUpload, empId);
        }

        // Handle File Uploads (Background Verification Docs)
        if (employeeData.bgDocs) {
            await uploadFilesToCloudinary(employeeData.bgDocs, BackgroundVerificationUploadDoc, empId);
        }

        return await Employee.findOne({ regId }).populate([
            "bankDetails",
            "addressDetails",
            "emergencyContactDetails",
            "dependentDetails",
            "educationDetails",
            "experienceDetails",
            "experienceInNapierDetails",
            "personalDocs",
            "bgDocs",
            "nomineeDetails"
        ]);
    }
    
    
    catch (error) {
        throw new Error(`Error saving onboarding details: ${error.message}`);
    }
}

export const getOnBoardEmployeeDetailsService = async (regId) =>{
    try {
        const responseData={};
        const employee = await Employee.findOne({ regId });

        if (!employee) {
            throw new Error("Employee not found");
        }

        const employeeId = employee._id;

        // Fetch related details
        const bankDetails = await EmployeeBank.findOne({ employeeId });
        const emergencyContactDetails = await EmergencyContact.findOne({ employeeId });
        const addressDetails = await EmployeeContactDetails.findOne({ employeeId });
        const dependentDetails = await DependentDetails.findOne({ employeeId });
        const educationalDetails = await EducationDetails.findOne({ employeeId });
        const educationDocs = await EducationDocsUpload.find({ employeeId });
        const experienceDetails = await ExperienceDetails.findOne({ employeeId });
        const experienceDocs = await ExperienceUploadDoc.find({ employeeId });
        const experienceInNapierDetails = await ExperienceinNapierDetails.findOne({ employeeId });
        const nomineeDetails = await NomineeDetails.findOne({ employeeId });
        const personalDocs = await EmployeePersonalDocsUpload.find({ employeeId });
        const bgDocs = await BackgroundVerificationUploadDoc.find({ employeeId });

        return {
            personalDetails: employee,
            bankDetails,
            emergencyContactDetails,
            addressDetails,
            dependentDetails,
            educationalDetails,
            educationDocs,
            experienceDetails,
            experienceDocs,
            experienceInNapierDetails,
            nomineeDetails,
            personalDocs,
            bgDocs}
    } catch (error) {
        console.error("Error fetching employee details:", error);
        throw new Error("Failed to fetch employee details");
    }
}

// Function to handle Cloudinary File Uploads
const uploadFilesToCloudinary = async (files, model, regId) => {
    try {
        const uploadedFiles = [];

        for (const file of files) {
            const uploadedResponse = await cloudinary.uploader.upload(file.path, { folder: "employee_docs" });

            uploadedFiles.push({
                regId,
                fileUrl: uploadedResponse.secure_url,
                fileType: file.mimetype,
                fileName: file.originalname,
            });
        }

        await model.insertMany(uploadedFiles);
    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
        throw new Error("File upload failed.");
    }
};
