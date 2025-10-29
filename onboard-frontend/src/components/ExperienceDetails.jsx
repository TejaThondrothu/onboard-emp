import { useState } from "react";

const ExperienceDetails = () => {
  const [experience, setExperience] = useState(null);
  const [workedAtNapier, setWorkedAtNapier] = useState(null);

  return (
      <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
        <div className="p-4 space-y-4">
          {/* Prior Employment Experience */}
          <div>
            <label className="block font-medium">
              Do you have prior employment experience? <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="experience"
                  value="yes"
                  checked={experience === "yes"}
                  onChange={() => setExperience("yes")}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="experience"
                  value="no"
                  checked={experience === "no"}
                  onChange={() => setExperience("no")}
                  className="w-4 h-4"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {/* Worked at Napier Earlier */}
          <div>
            <label className="block font-medium">
              Have you worked for company earlier? <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-6 mt-2">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="napier"
                  value="yes"
                  checked={workedAtNapier === "yes"}
                  onChange={() => setWorkedAtNapier("yes")}
                  className="w-4 h-4"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="napier"
                  value="no"
                  checked={workedAtNapier === "no"}
                  onChange={() => setWorkedAtNapier("no")}
                  className="w-4 h-4"
                />
                <span>No</span>
              </label>
            </div>
          </div>
        </div>
      </div>
  );
};

export default ExperienceDetails;
