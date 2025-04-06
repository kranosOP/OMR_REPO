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
    onSubmit({ rollNumber, answers });
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-center text-3xl font-bold mb-6">OMR Answer Sheet</h2>

      {/* Roll Number Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Enter Roll Number"
          className="border border-gray-400 px-4 py-2 rounded-md w-full sm:w-1/2 md:w-1/3 text-center"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>

      {/* OMR Grid with 4 Columns */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...Array(4)].map((_, col) => (
          <div key={col} className="space-y-1">
            {Array.from({ length: 25 }).map((_, row) => {
              const qIndex = col * 25 + row;
              const isStriped = Math.floor(qIndex / 5) % 2 === 0;
              return (
                <div
                  key={qIndex}
                  className={`flex items-center justify-between px-2 py-1 rounded-md text-sm ${
                    isStriped ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <span className="font-bold w-10 text-right">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  <div className="flex gap-1 ml-2">
                    {["A", "B", "C", "D"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(qIndex, opt)}
                        className={`w-6 h-6 rounded-full border border-gray-400 text-xs
                          flex items-center justify-center
                          ${
                            answers[qIndex] === opt
                              ? "bg-blue-500 text-white"
                              : "hover:bg-blue-200"
                          }`}
                      >
                        {opt}
                      </button>
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
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-md font-semibold"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OMRForm;










