import React, { useState } from "react";

const OMRForm = ({ onSubmit }) => {
  const totalQuestions = 100;
  const [rollNumber, setRollNumber] = useState("");
  const [answers, setAnswers] = useState(Array(totalQuestions).fill(null));

  const handleOptionSelect = (qIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = option;
    setAnswers(updatedAnswers);
  };

  const handleSubmit = () => {
    if (!rollNumber) {
      alert("Please enter your Roll Number.");
      return;
    }
    console.log("Submitted Data:", { rollNumber, answers });
    onSubmit({ rollNumber, answers });
  };

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-6">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
        OMR Answer Sheet
      </h2>

      {/* Roll Number Input */}
      <div className="text-center mb-6">
        <label htmlFor="rollNumber" className="font-semibold text-lg block mb-2">
          Roll Number:
        </label>
        <input
          type="text"
          className="block w-full sm:w-2/3 md:w-1/2 mx-auto p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
        />
      </div>

      {/* OMR Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 border border-red-500 p-4 rounded-lg">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="border-r border-red-500 last:border-r-0">
            {Array.from({ length: 25 }).map((_, rowIndex) => {
              const qIndex = colIndex * 25 + rowIndex;
              const bgColor =
                Math.floor(qIndex / 5) % 2 === 0 ? "bg-red-100" : "bg-white";

              return (
                <div
                  key={qIndex}
                  className={`flex flex-wrap sm:flex-nowrap items-center p-2 ${bgColor}`}
                >
                  <span className="font-bold text-red-600 mr-2 w-12 text-sm sm:text-base">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                    {["A", "B", "C", "D"].map((option) => (
                      <div
                        key={option}
                        className="cursor-pointer"
                        onClick={() => handleOptionSelect(qIndex, option)}
                      >
                        <span
                          className={`w-8 h-8 flex items-center justify-center border rounded-full text-sm
                            ${answers[qIndex] === option
                              ? "bg-red-500 text-white"
                              : "border-red-500 hover:bg-red-200"}
                          `}
                        >
                          {option}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {/* Submit Button */}
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow hover:bg-red-600 transition-all"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OMRForm;








