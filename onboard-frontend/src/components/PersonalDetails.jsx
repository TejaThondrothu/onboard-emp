import React, { useState } from "react";

const PersonalDetails = ({data,onDataChange}) => {
  const [personalDetailsData, setPersonalDetailsData] = useState(data || {
    empId: "",
    regId: "",
    firstName: "",
    middleName: "",
    lastName: "",
    fatherName: "",
    birthDate: "",
    nationality: "",
    maritalStatus: "",
    bloodGroup: "",
    gender: "",
    emailId: "",
    mobileNumber: "",
    aadhaar: "",
    pan: "",
    aadhaarName: "",
    passport: "",
    passportExpiryDate: "",
    relocationFlag: "",
    priorEmployment: false,
    workedInNapier: false,
    uan: "",
    submittedDate: "",
    submittedStatus: "",
    declarationFlag: "",
  });

  const [fileUploads, setFileUploads] = useState([]);
  

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPersonalDetailsData({
      ...personalDetailsData,
      [name]: type === "checkbox" ? checked : value,
    });
    onDataChange(personalDetailsData);
  };

  const handleFileUpload = (e) => {
   // const { name, files } = e.target;
   // setPersonalDetailsData({ ...personalDetailsData, [name]: files[0] });
    const files = Array.from(e.target.files);
  
    const newFiles = files.map((file, index) => ({
      empId: 12345, // Example employee ID, replace dynamically
      fileName: file.name,
      fileDescription: "Uploaded document",
      docextention: file.name.split('.').pop(),
      docDescription: "Document description",
      uploadpath: `/uploads/${file.name}`, // Replace with actual path
      context: 1,
      specialDocpath: `/special/${file.name}`,
      isDeleted: false,
      documentStatus: 1,
      createdBy: 1001,
      editedBy: null,
      createUser: "Admin",
      updateUser: "",
      createdDate: new Date(),
      editedDate: null,
      uploadedDate: new Date(),
      documentTypeId: 5,
    }));

    setFileUploads((prevFiles) => [...prevFiles, ...newFiles]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", personalDetailsData);
    console.log("Form Data Submitted:", fileUploads);
  };

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-3">
          <label className="block font-semibold">Upload Profile Image *</label>
          <input type="file" name="profileImage" onChange={handleFileUpload} className="w-full border p-2 rounded-lg" required />
        </div>
        {[
          { label: "Employee ID *", name: "empId" },
          { label: "Registration ID *", name: "regId" },
          { label: "First Name *", name: "firstName" },
          { label: "Middle Name", name: "middleName" },
          { label: "Last Name *", name: "lastName" },
          { label: "Father Name *", name: "fatherName" },
          { label: "Birth Date *", name: "birthDate", type: "date" },
          { label: "Nationality *", name: "nationality" },
          { label: "Email Address *", name: "emailId" },
          { label: "Mobile Number *", name: "mobileNumber" },
          { label: "UAN", name: "uan" },
          { label: "PAN Card *", name: "pan" },
          { label: "Aadhaar Card No. *", name: "aadhaar" },
          { label: "Name as per Aadhaar", name: "aadhaarName" },
          { label: "Passport Number", name: "passport" },
          { label: "Passport Expiry Date", name: "passportExpiryDate", type: "date" },
          { label: "Declaration Flag", name: "declarationFlag" },
        ].map((field) => (
          <div key={field.name}>
            <label className="block font-semibold">{field.label}</label>
            <input
              type={field.type || "text"}
              name={field.name}
              value={personalDetailsData[field.name]}
              onChange={handleChange}
              className="w-full border p-2 rounded-lg"
              required={field.label.includes("*")}
            />
          </div>
        ))}

        <div>
          <label className="block font-semibold">Marital Status *</label>
          <select name="maritalStatus" value={personalDetailsData.maritalStatus} onChange={handleChange} className="w-full border p-2 rounded-lg" required>
            <option value="">Select</option>
            <option value="Single">Single</option>
            <option value="Married">Married</option>
          </select>
        </div>
        
        <div>
          <label className="block font-semibold">Blood Group *</label>
          <select name="bloodGroup" value={personalDetailsData.bloodGroup} onChange={handleChange} className="w-full border p-2 rounded-lg" required>
            <option value="">Select</option>
            <option value="A+">A+</option>
            <option value="B+">B+</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold">Gender *</label>
          <select name="gender" value={personalDetailsData.gender} onChange={handleChange} className="w-full border p-2 rounded-lg" required>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="md:col-span-3">
          <label className="block font-semibold">Upload PAN Card *</label>
          <input type="file" name="panCardUpload" onChange={handleFileUpload} className="w-full border p-2 rounded-lg" required />
        </div>
        <div className="md:col-span-3">
          <label className="block font-semibold">Upload Aadhaar Card *</label>
          <input type="file" name="aadhaarCardUpload" onChange={handleFileUpload} className="w-full border p-2 rounded-lg" required />
        </div>

        <div className="md:col-span-3">
          <label className="block font-semibold">Willing to Relocate *</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2">
              <input type="radio" name="relocationFlag" value="true" onChange={handleChange} required /> Yes
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="relocationFlag" value="false" onChange={handleChange} required /> No
            </label>
          </div>
        </div>

        <div className="md:col-span-3">
          <label className="block font-semibold">Prior Employment</label>
          <input type="checkbox" name="priorEmployment" checked={personalDetailsData.priorEmployment} onChange={handleChange} className="mr-2" /> Yes
        </div>

        <div className="md:col-span-3">
          <label className="block font-semibold">Worked in Napier</label>
          <input type="checkbox" name="workedInNapier" checked={personalDetailsData.workedInNapier} onChange={handleChange} className="mr-2" /> Yes
        </div>

        <div className="md:col-span-3 text-center mt-4">
          <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;