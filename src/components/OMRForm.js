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
    console.log({ rollNumber, answers });
    onSubmit({ rollNumber, answers });
  };

  return (
    <div className="max-w-screen-xl mx-auto p-4">
      <h2 className="text-center text-2xl sm:text-3xl font-bold mb-6">
        OMR Answer Sheet
      </h2>

      {/* Roll Number Input */}
      <div className="text-center mb-6">
        <input
          type="text"
          placeholder="Enter Roll Number"
          className="border border-pink-500 px-4 py-2 rounded-md w-full sm:w-1/2 md:w-1/3 text-center focus:outline-none focus:ring-2 focus:ring-pink-500"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
        />
      </div>

      {/* OMR Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 border border-pink-500 rounded-lg overflow-hidden">
        {[...Array(4)].map((_, col) => (
          <div key={col} className="border-r border-pink-500 last:border-r-0">
            {Array.from({ length: 25 }).map((_, row) => {
              const qIndex = col * 25 + row;
              const groupBg = Math.floor(qIndex / 5) % 2 === 0 ? "bg-pink-100" : "bg-white";

              return (
                <div
                  key={qIndex}
                  className={`flex items-center justify-between px-2 py-1 ${groupBg} border-b border-pink-200`}
                >
                  <span className="text-pink-700 font-bold w-10 text-xs sm:text-sm">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  <div className="flex gap-2">
                    {["A", "B", "C", "D"].map((opt) => (
                      <button
                        key={opt}
                        onClick={() => handleOptionSelect(qIndex, opt)}
                        className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full border text-xs sm:text-sm
                          flex items-center justify-center 
                          ${
                            answers[qIndex] === opt
                              ? "bg-pink-500 text-white border-pink-500"
                              : "border-pink-500 text-pink-700 hover:bg-pink-200"
                          }
                        `}
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

      {/* Submit */}
      <div className="text-center mt-6">
        <button
          className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-md font-semibold"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OMRForm;









