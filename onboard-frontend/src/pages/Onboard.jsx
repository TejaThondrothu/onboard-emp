import React, { useState } from "react";
import { FaUser, FaGraduationCap, FaBriefcase } from "react-icons/fa";

// Import components for each section
import PersonalDetails from "../components/PersonalDetails";
import BankDetails from "../components/BankDetails";
import EmergencyContactDetails from "../components/EmergencyContactDetails";
import AddressDetails from "../components/AddressDetails";
import DependentDetails from "../components/DependentDetails";
import NomineeDetails from "../components/NomineeDetails";
import EducationalDetails from "../components/EducationDetails";
import ExperienceDetails from "../components/ExperienceDetails";
import BGCheckUpDeclaration from "../components/BGCheckUpDeclaration";
import Navbar from "../components/Navbar";

const Onboard = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openSections, setOpenSections] = useState([]);
  const [formData, setFormData] = useState({
    personalDetails: {},
    bankDetails: {},
    emergencyContact: {},
    addressDetails: {},
    dependentDetails: {},
    nomineeDetails: {},
    educationalDetails: {},
    experienceDetails: {},
    bgCheckup: {},
  });

  console.log()

  const steps = [
    { label: "Personal Details", icon: <FaUser /> },
    { label: "Education Details", icon: <FaGraduationCap /> },
    { label: "Experience Details", icon: <FaBriefcase /> },
  ];

  const sectionsByStep = [
    {
      step: 0,
      sections: [
        "Personal Details",
        "Bank Details",
        "Emergency Contact Details",
        "Address Details",
        "Dependent & Parent Details",
        "Nominee Details",
      ],
      components: {
        "Personal Details": PersonalDetails,
        "Bank Details": BankDetails,
        "Emergency Contact Details": EmergencyContactDetails,
        "Address Details": AddressDetails,
        "Dependent & Parent Details": DependentDetails,
        "Nominee Details": NomineeDetails,
      },
    },
    {
      step: 1,
      sections: ["Educational Details"],
      components: { "Educational Details": EducationalDetails },
    },
    {
      step: 2,
      sections: ["Experience Details", "BG CheckUp Declaration"],
      components: {
        "Experience Details": ExperienceDetails,
        "BG CheckUp Declaration": BGCheckUpDeclaration,
      },
    },
  ];

  const toggleSection = (index) => {
    setOpenSections((prev) =>
      prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]
    );
  };

    // Function to Receive Data from Child
    const handleChildDataChange = (updatedData) => {
      setFormData((prev) => ({
        ...prev,
        personalDetails: updatedData,
      }));
    };

  return (
    <><Navbar/>
    <div className="min-h-screen bg-blue-50 flex justify-center pt-28 p-4">
      <div className="w-full max-w-7xl">
        {/* Stepper Navigation */}
        <div className="flex justify-center space-x-6 mb-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-center px-4 py-2 border rounded-full cursor-pointer transition ${
                activeStep === index
                  ? "bg-orange-500 text-white border-orange-500"
                  : "border-gray-300 text-gray-700 bg-white"
              }`}
              onClick={() => setActiveStep(index)}
            >
              {step.icon} <span className="ml-2">{step.label}</span>
            </div>
          ))}
        </div>

        {/* Dynamic Content Based on Active Step */}
        <div>
          {sectionsByStep.map((stepData) =>
            activeStep === stepData.step ? (
              <div key={stepData.step}>
                {stepData.sections.map((section, index) => {
                  const SectionComponent = stepData.components[section];
                  return (
                    <div key={index} className="mb-3">
                      <button
                        className="w-full flex justify-between items-center bg-blue-500 text-white p-3 rounded text-lg font-semibold"
                        onClick={() => toggleSection(index)}
                      >
                        {section}
                        <span>{openSections.includes(index) ? "−" : "+"}</span>
                      </button>
                      {openSections.includes(index) && (
                        <div>{SectionComponent ? <SectionComponent /> : <p>No component found</p>}</div>
                      )}
                    </div>
                  );
                })}

                

                {/* Step-Based Buttons */}
                <div className="flex justify-center mt-6 space-x-4">
                  {activeStep > 0 && (
                    <button
                      onClick={() => setActiveStep(activeStep - 1)}
                      className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Previous
                    </button>
                  )}

                  {activeStep < steps.length - 1 ? (
                    <button
                      onClick={() => setActiveStep(activeStep + 1)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Save and Continue
                    </button>
                  ) : (
                    <>
                      <button
                        className="px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
                      >
                        Save
                      </button>
                      <button
                        className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                      >
                        Submit
                      </button>
                    </>
                  )}
                </div>
              </div>
            ) : null
          )}
        </div>
      </div>

      <PersonalDetails
                        data={formData.personalDetails}
                        onDataChange={handleChildDataChange}
                      />
    </div>
    </>
  );
};

export default Onboard;
