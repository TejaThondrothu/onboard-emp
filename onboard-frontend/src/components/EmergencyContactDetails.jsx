import React from "react";

const EmergencyContactDetails = () => {
  return (
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-blue-700">Contact Person Name *</label>
          <input type="text" className="border p-2 rounded-md outline-none w-full" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-blue-700">Relation *</label>
          <input type="text" className="border p-2 rounded-md outline-none w-full" />
        </div>
        <div className="flex flex-col">
          <label className="text-sm font-semibold text-blue-700">Mobile Number *</label>
          <input type="text" className="border p-2 rounded-md outline-none w-full" />
        </div>
      </div>
    </div>
  );
};

export default EmergencyContactDetails;
