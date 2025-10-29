import React, { useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

const NomineeDetails = () => {
  const [nominees, setNominees] = useState([
    { name: "", birthDate: "", age: "", gender: "Select", relationship: "Select", share: "" }
  ]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const handleChange = (index, field, value) => {
    const updatedNominees = [...nominees];
    updatedNominees[index][field] = value;
    if (field === "birthDate") {
      updatedNominees[index]["age"] = calculateAge(value);
    }
    setNominees(updatedNominees);
  };

  const addNominee = () => {
    setNominees([...nominees, { name: "", birthDate: "", age: "", gender: "Select", relationship: "Select", share: "" }]);
  };

  const removeNominee = (index) => {
    const updatedNominees = nominees.filter((_, i) => i !== index);
    setNominees(updatedNominees);
  };

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      <h2 className="text-lg font-bold text-blue-700 mb-4">Nominee Details</h2>
      
      {/* Table Header - Hidden in Small Screens */}
      <div className="hidden md:grid md:grid-cols-7 gap-4 text-sm font-semibold bg-gray-100 p-2 rounded-md">
        <span>Name *</span>
        <span>Birth Date</span>
        <span>Age</span>
        <span>Gender</span>
        <span>Relationship</span>
        <span>% Of Share</span>
        <span>Action</span>
      </div>

      {nominees.map((nominee, index) => (
        <div 
          key={index} 
          className="grid grid-cols-1 md:grid-cols-7 gap-4 p-3 border-b border-gray-300 bg-gray-50 rounded-md mt-2"
        >
          {/* Mobile Layout - Show labels */}
          <div className="md:hidden text-xs font-semibold text-gray-600">Name *</div>
          <input
            type="text"
            placeholder="Enter Name"
            className="border p-2 rounded-md outline-none"
            value={nominee.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            required
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Birth Date</div>
          <input
            type="date"
            className="border p-2 rounded-md outline-none"
            value={nominee.birthDate}
            onChange={(e) => handleChange(index, "birthDate", e.target.value)}
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Age</div>
          <input
            type="text"
            className="border p-2 rounded-md outline-none bg-gray-100"
            value={nominee.age}
            disabled
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Gender</div>
          <select
            className="border p-2 rounded-md outline-none"
            value={nominee.gender}
            onChange={(e) => handleChange(index, "gender", e.target.value)}
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <div className="md:hidden text-xs font-semibold text-gray-600">Relationship</div>
          <select
            className="border p-2 rounded-md outline-none"
            value={nominee.relationship}
            onChange={(e) => handleChange(index, "relationship", e.target.value)}
          >
            <option>Select</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Spouse</option>
            <option>Child 1</option>
            <option>Child 2</option>
          </select>

          <div className="md:hidden text-xs font-semibold text-gray-600">% Of Share</div>
          <input
            type="number"
            placeholder="%"
            className="border p-2 rounded-md outline-none"
            value={nominee.share}
            onChange={(e) => handleChange(index, "share", e.target.value)}
          />

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <FaPlusCircle className="text-green-600 cursor-pointer" size={20} onClick={addNominee} />
            {nominees.length > 1 && (
              <FaTrash className="text-red-600 cursor-pointer" size={20} onClick={() => removeNominee(index)} />
            )}
          </div>
        </div>
      ))}

      {/* Agreement Checkbox */}
      <div className="flex items-center space-x-2 mt-4">
        <input type="checkbox" className="w-4 h-4" />
        <p className="text-sm text-gray-700">
          I hereby nominate the above-mentioned dependents as entitled to all benefits extended by Napier along with any other statutory benefits as applicable.
        </p>
      </div>
    </div>
  );
};

export default NomineeDetails;
