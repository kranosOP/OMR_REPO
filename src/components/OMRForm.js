import React, { useState, useEffect } from "react";

const OMRForm = ({ onSubmit, initialQuestionCount = 100 }) => {
  const [totalQuestions, setTotalQuestions] = useState(initialQuestionCount);
  const [rollNumber, setRollNumber] = useState("");
  const [answers, setAnswers] = useState(Array(initialQuestionCount).fill(null));
  
  // Update answers array when totalQuestions changes
  useEffect(() => {
    setAnswers(prevAnswers => {
      const newAnswers = Array(totalQuestions).fill(null);
      // Preserve existing answers when increasing/decreasing questions
      for (let i = 0; i < Math.min(prevAnswers.length, totalQuestions); i++) {
        newAnswers[i] = prevAnswers[i];
      }
      return newAnswers;
    });
  }, [totalQuestions]);

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

  // Calculate the number of questions per column
  const questionsPerColumn = Math.ceil(totalQuestions / 4);
  
  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">OMR Answer Sheet</h2>
      
      {/* Configuration Section */}
      <div className="flex flex-wrap gap-4 mb-6">
        {/* Roll Number Input */}
        <div className="flex-1">
          <label htmlFor="rollNumber" className="font-semibold text-lg block mb-2">
            Roll Number:
          </label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
          />
        </div>
        
        {/* Question Count Input */}
        <div className="flex-1">
          <label htmlFor="questionCount" className="font-semibold text-lg block mb-2">
            Number of Questions:
          </label>
          <input
            type="number"
            className="w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500"
            id="questionCount"
            value={totalQuestions}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0 && value <= 200) {
                setTotalQuestions(value);
              }
            }}
            min="1"
            max="200"
            placeholder="Enter number of questions"
          />
        </div>
      </div>
      
      {/* OMR Grid */}
      <div className="grid grid-cols-4 gap-4 border border-red-500 p-4 rounded-lg">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="border-r border-red-500 last:border-r-0">
            {Array.from({ length: questionsPerColumn }).map((_, rowIndex) => {
              const qIndex = colIndex * questionsPerColumn + rowIndex;
              
              // Only render if question index is within total questions
              if (qIndex >= totalQuestions) return null;
              
              const bgColor =
                Math.floor(qIndex / 5) % 2 === 0 ? "bg-red-100" : "bg-white";
                
              return (
                <div
                  key={qIndex}
                  className={`flex items-center p-2 ${bgColor}`}
                >
                  <span className="font-bold text-red-600 mr-2 w-12">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  {["A", "B", "C", "D"].map((option) => (
                    <div
                      key={option}
                      className="mx-1"
                      onClick={() => handleOptionSelect(qIndex, option)}
                    >
                      <span
                        className={`w-8 h-8 flex items-center justify-center border rounded-full cursor-pointer select-none
                          ${answers[qIndex] === option ? "bg-red-500 text-white" : "border-red-500 hover:bg-red-200"}
                        `}
                      >
                        {option}
                      </span>
                    </div>
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










