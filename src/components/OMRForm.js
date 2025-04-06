import React, { useState, useEffect } from "react";

const OMRForm = () => {
  const [rollNumber, setRollNumber] = useState("");
  const [numQuestions, setNumQuestions] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Load saved answers from localStorage if present
  useEffect(() => {
    const savedData = localStorage.getItem("omr-session");
    if (savedData) {
      const { roll, numQ, answers } = JSON.parse(savedData);
      setRollNumber(roll);
      setNumQuestions(numQ);
      setAnswers(answers);
      setSubmitted(true);
    }
  }, []);

  const handleAnswerChange = (qNo, option) => {
    const updatedAnswers = { ...answers, [qNo]: option };
    setAnswers(updatedAnswers);
    localStorage.setItem(
      "omr-session",
      JSON.stringify({ roll: rollNumber, numQ: numQuestions, answers: updatedAnswers })
    );
  };

  const handleStart = () => {
    if (rollNumber && numQuestions > 0) {
      setSubmitted(true);
    } else {
      alert("Please enter Roll Number and select number of questions.");
    }
  };

  const resetSession = () => {
    localStorage.removeItem("omr-session");
    setRollNumber("");
    setNumQuestions(0);
    setAnswers({});
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      {!submitted ? (
        <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-semibold mb-4">Start OMR Session</h2>
          <input
            type="text"
            placeholder="Enter Roll Number"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            className="w-full p-2 border rounded mb-4"
          />
          <select
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            className="w-full p-2 border rounded mb-4"
          >
            <option value="">Select Number of Questions</option>
            {[10, 20, 30, 40, 50].map((num) => (
              <option key={num} value={num}>
                {num}
              </option>
            ))}
          </select>
          <button
            onClick={handleStart}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Start Test
          </button>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">OMR Sheet</h2>
            <button
              onClick={resetSession}
              className="text-sm text-red-500 underline"
            >
              Reset Session
            </button>
          </div>
          <p className="mb-4">Roll Number: <strong>{rollNumber}</strong></p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: numQuestions }, (_, i) => i + 1).map((qNo) => (
              <div key={qNo} className="bg-white p-4 rounded shadow">
                <h3 className="font-medium mb-2">Question {qNo}</h3>
                <div className="flex gap-4">
                  {["A", "B", "C", "D"].map((option) => (
                    <label key={option} className="flex items-center gap-1">
                      <input
                        type="radio"
                        name={`q${qNo}`}
                        value={option}
                        checked={answers[qNo] === option}
                        onChange={() => handleAnswerChange(qNo, option)}
                      />
                      {option}
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default OMRForm;





