import React, { useState } from 'react'

const BGCheckUpDeclaration = () => {
  const [bgCheck, setBgCheck] = useState(false);
  return (
    <>
    {/* BG Check Up Declaration Section */}
    <div className="max-w-8xl mx-auto bg-white shadow-lg rounded p-6 border-2 border-blue-300">
        <div className="p-4 flex items-start">
          <input
            type="checkbox"
            checked={bgCheck}
            onChange={() => setBgCheck(!bgCheck)}
            className="w-5 h-5 mt-1"
          />
          <p className="ml-3 text-sm text-gray-700">
            I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief and 
            I undertake to inform you of any changes therein, immediately. In case any of the above information is found to be false 
            or untrue or misleading or misrepresenting, I am aware that I may be held liable for it. I hereby agree and authorize the 
            organization to perform the background check on my provided details.
          </p>
        </div>
      </div>
    </>
  )
}

export default BGCheckUpDeclaration