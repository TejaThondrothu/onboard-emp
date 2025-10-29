import cloudinary from "../config/cloudinaryConfig";

const uploadFilesToCloudinary = async (files, empId, folder) => {
    const uploadedFiles = [];
    
    for (const file of files) {
        const result = await cloudinary.uploader.upload(file.path, {
            folder: `onboard/${empId}/${folder}`,
            resource_type: "auto"
        });
        uploadedFiles.push({
            empId,
            fileName: file.originalname,
            fileUrl: result.secure_url,
            uploadedAt: new Date()
        });
    }
    
    return uploadedFiles;
};

export default  uploadFilesToCloudinary;