import React, { useState } from "react";

const AddressDetails = () => {
  const [sameAsCurrent, setSameAsCurrent] = useState(false);
  const [currentAddress, setCurrentAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const [permanentAddress, setPermanentAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
  });

  const handleSameAsCurrent = () => {
    setSameAsCurrent(!sameAsCurrent);
    if (!sameAsCurrent) {
      setPermanentAddress({ ...currentAddress });
    } else {
      setPermanentAddress({ street: "", city: "", state: "", country: "", pincode: "" });
    }
  };

  const handleChange = (e, type, field) => {
    const value = e.target.value;
    if (type === "current") {
      setCurrentAddress({ ...currentAddress, [field]: value });
      if (sameAsCurrent) setPermanentAddress({ ...permanentAddress, [field]: value });
    } else {
      setPermanentAddress({ ...permanentAddress, [field]: value });
    }
  };

  return (
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
      {/* Current Address Section */}
      <h2 className="text-lg font-bold text-blue-700">Current Address</h2>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-5">
          <label className="text-sm font-semibold">Building/Street/Address *</label>
          <textarea
            className="border p-2 rounded-md outline-none w-full"
            value={currentAddress.street}
            onChange={(e) => handleChange(e, "current", "street")}
          />
        </div>
        {["city", "state", "country", "pincode"].map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-semibold capitalize">{field} *</label>
            <input
              type="text"
              className="border p-2 rounded-md outline-none w-full"
              value={currentAddress[field]}
              onChange={(e) => handleChange(e, "current", field)}
            />
          </div>
        ))}
      </div>

      {/* Permanent Address Section */}
      <h2 className="text-lg font-bold text-blue-700 mt-4">Permanent Address</h2>
      <div className="flex items-center gap-2 mb-2">
        <input type="checkbox" checked={sameAsCurrent} onChange={handleSameAsCurrent} />
        <label className="text-sm font-semibold">Same as current address</label>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="md:col-span-5">
          <label className="text-sm font-semibold">Building/Street/Address *</label>
          <textarea
            className="border p-2 rounded-md outline-none w-full"
            value={permanentAddress.street}
            onChange={(e) => handleChange(e, "permanent", "street")}
            disabled={sameAsCurrent}
          />
        </div>
        {["city", "state", "country", "pincode"].map((field, index) => (
          <div key={index} className="flex flex-col">
            <label className="text-sm font-semibold capitalize">{field} *</label>
            <input
              type="text"
              className="border p-2 rounded-md outline-none w-full"
              value={permanentAddress[field]}
              onChange={(e) => handleChange(e, "permanent", field)}
              disabled={sameAsCurrent}
            />
          </div>
        ))}
      </div>

      {/* Address Proof Upload */}
      <div className="mt-4">
        <label className="text-sm font-semibold">Address Proof *</label>
        <input type="file" className="border p-2 rounded-md w-full" />
      </div>
    </div>
  );
};

export default AddressDetails;
