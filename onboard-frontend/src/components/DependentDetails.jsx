import React, { useState } from "react";
import { FaPlusCircle, FaTrash } from "react-icons/fa";

const DependantDetails = () => {
  const [dependants, setDependants] = useState([
    { name: "", birthDate: "", age: "", gender: "Select", relationship: "Select" }
  ]);

  const calculateAge = (dob) => {
    if (!dob) return "";
    const birthYear = new Date(dob).getFullYear();
    const currentYear = new Date().getFullYear();
    return currentYear - birthYear;
  };

  const handleChange = (index, field, value) => {
    const updatedDependants = [...dependants];
    updatedDependants[index][field] = value;
    if (field === "birthDate") {
      updatedDependants[index]["age"] = calculateAge(value);
    }
    setDependants(updatedDependants);
  };

  const addDependant = () => {
    setDependants([...dependants, { name: "", birthDate: "", age: "", gender: "Select", relationship: "Select" }]);
  };

  const removeDependant = (index) => {
    const updatedDependants = dependants.filter((_, i) => i !== index);
    setDependants(updatedDependants);
  };

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      <h2 className="text-lg font-bold text-blue-700 mb-4">Dependant Details</h2>
      
      <div className="hidden md:grid md:grid-cols-6 gap-4 text-sm font-semibold bg-gray-100 p-2 rounded-md">
        <span>Name *</span>
        <span>Birth Date</span>
        <span>Age</span>
        <span>Gender</span>
        <span>Relationship</span>
        <span>Action</span>
      </div>

      {dependants.map((dependant, index) => (
        <div 
          key={index} 
          className="grid grid-cols-1 md:grid-cols-6 gap-4 p-3 border-b border-gray-300 bg-gray-50 rounded-md mt-2"
        >
          <div className="md:hidden text-xs font-semibold text-gray-600">Name *</div>
          <input
            type="text"
            placeholder="Enter Name"
            className="border p-2 rounded-md outline-none"
            value={dependant.name}
            onChange={(e) => handleChange(index, "name", e.target.value)}
            required
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Birth Date</div>
          <input
            type="date"
            className="border p-2 rounded-md outline-none"
            value={dependant.birthDate}
            onChange={(e) => handleChange(index, "birthDate", e.target.value)}
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Age</div>
          <input
            type="text"
            className="border p-2 rounded-md outline-none bg-gray-100"
            value={dependant.age}
            disabled
          />

          <div className="md:hidden text-xs font-semibold text-gray-600">Gender</div>
          <select
            className="border p-2 rounded-md outline-none"
            value={dependant.gender}
            onChange={(e) => handleChange(index, "gender", e.target.value)}
          >
            <option>Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>

          <div className="md:hidden text-xs font-semibold text-gray-600">Relationship</div>
          <select
            className="border p-2 rounded-md outline-none"
            value={dependant.relationship}
            onChange={(e) => handleChange(index, "relationship", e.target.value)}
          >
            <option>Select</option>
            <option>Father</option>
            <option>Mother</option>
            <option>Spouse</option>
            <option>Child 1</option>
            <option>Child 2</option>
          </select>

          <div className="flex items-center space-x-2">
            <FaPlusCircle className="text-green-600 cursor-pointer" size={20} onClick={addDependant} />
            {dependants.length > 1 && (
              <FaTrash className="text-red-600 cursor-pointer" size={20} onClick={() => removeDependant(index)} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DependantDetails;
