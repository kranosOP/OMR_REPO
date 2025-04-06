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
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">OMR Answer Sheet</h2>

      {/* Roll Number Input */}
      <div className="text-center mb-6">
        <label htmlFor="rollNumber" className="font-semibold text-lg">
          Roll Number:
        </label>
        <input
          type="text"
          className="block w-1/2 mx-auto p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
        />
      </div>

      {/* OMR Grid */}
      <div className="grid grid-cols-4 gap-4 border border-red-500 p-4 rounded-lg">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="border-r border-red-500 last:border-r-0">
            {Array.from({ length: 25 }).map((_, rowIndex) => {
              const qIndex = colIndex * 25 + rowIndex;
              const bgColor = Math.floor(qIndex / 5) % 2 === 0 ? "bg-red-100" : "bg-white";
              return (
                <div key={qIndex} className={`flex items-center p-2 ${bgColor}`}>
                  <span className="font-bold text-red-600 mr-2">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  {["A", "B", "C", "D"].map((option) => (
                    <label key={option} className="flex items-center mx-2">
                      <input
                        type="radio"
                        name={`q${qIndex}`}
                        className="hidden"
                        value={option}
                        checked={answers[qIndex] === option}
                        onChange={() => handleOptionSelect(qIndex, option)}
                      />
                      <span className="w-8 h-8 flex items-center justify-center border border-red-500 rounded-full cursor-pointer hover:bg-red-200 transition-all">
                        {option}
                      </span>
                    </label>
                  ))}
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






