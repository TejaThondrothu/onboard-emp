import React, { useState } from "react";
import { FaPlusCircle, FaTrash, FaEye } from "react-icons/fa";

const EducationDetails = () => {
  const [education, setEducation] = useState([
    { qualification: "SSLC (10th Standard)", school: "", startDate: "", endDate: "", degree: "", branch: "", percentage: "" },
    { qualification: "Intermediate (12th Standard)", school: "", startDate: "", endDate: "", degree: "", branch: "", percentage: "" },
    { qualification: "Graduation", school: "", startDate: "", endDate: "", degree: "", branch: "", percentage: "" },
  ]);

  const addEducation = () => {
    setEducation([...education, { qualification: "Other", school: "", startDate: "", endDate: "", degree: "", branch: "", percentage: "" }]);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleChange = (index, field, value) => {
    const updatedEducation = [...education];
    updatedEducation[index][field] = value;
    setEducation(updatedEducation);
  };

  return (
    <div className="overflow-x-auto max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      <div className="hidden md:grid grid-cols-8 gap-4 bg-blue-700 text-white font-semibold text-sm p-2 rounded-md">
        <span>Qualification</span>
        <span>School / College / Institution *</span>
        <span>Start Date *</span>
        <span>End Date *</span>
        <span>Degree / Board *</span>
        <span>Branch</span>
        <span>Percentage / Grade Points *</span>
        <span>Action</span>
      </div>

      {education.map((edu, index) => (
        <div key={index} className={`grid grid-cols-1 md:grid-cols-8 gap-4 p-2 items-center ${index % 2 === 0 ? "bg-gray-100" : "bg-white"} rounded-md`}>
          <span className="font-semibold">{edu.qualification}</span>
          <input
            type="text"
            placeholder="Enter School/College"
            className="border p-2 rounded-md outline-none"
            value={edu.school}
            onChange={(e) => handleChange(index, "school", e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded-md outline-none"
            value={edu.startDate}
            onChange={(e) => handleChange(index, "startDate", e.target.value)}
          />
          <input
            type="date"
            className="border p-2 rounded-md outline-none"
            value={edu.endDate}
            onChange={(e) => handleChange(index, "endDate", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Degree / Board"
            className="border p-2 rounded-md outline-none"
            value={edu.degree}
            onChange={(e) => handleChange(index, "degree", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Branch"
            className="border p-2 rounded-md outline-none"
            value={edu.branch}
            onChange={(e) => handleChange(index, "branch", e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter Percentage / Grade"
            className="border p-2 rounded-md outline-none"
            value={edu.percentage}
            onChange={(e) => handleChange(index, "percentage", e.target.value)}
          />
          <div className="flex space-x-2">
            <FaEye className="text-blue-500 cursor-pointer" size={20} />
            {education.length > 1 && (
              <FaTrash className="text-red-600 cursor-pointer" size={20} onClick={() => removeEducation(index)} />
            )}
          </div>
        </div>
      ))}

      <button
        onClick={addEducation}
        className="bg-blue-600 text-white px-4 py-2 mt-4 rounded-md flex items-center space-x-2"
      >
        <FaPlusCircle size={20} /> <span>Add</span>
      </button>
    </div>
  );
};

export default EducationDetails;
