import React, { useState, useEffect } from "react";

const OMRForm = ({ onSubmit }) => {
  const [totalQuestions, setTotalQuestions] = useState(null);
  const [rollNumber, setRollNumber] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const storedTotalQuestions = Number(localStorage.getItem("omrTotalQuestions"));
    const storedRollNumber = localStorage.getItem("omrRollNumber");
    const storedAnswers = JSON.parse(localStorage.getItem("omrAnswers"));

    if (storedTotalQuestions && storedRollNumber && storedAnswers) {
      setTotalQuestions(storedTotalQuestions);
      setRollNumber(storedRollNumber);
      setAnswers(storedAnswers);
      setIsInitialized(true);
    }
  }, []);

  useEffect(() => {
    if (totalQuestions && rollNumber) {
      localStorage.setItem("omrTotalQuestions", totalQuestions);
      localStorage.setItem("omrRollNumber", rollNumber);
      localStorage.setItem("omrAnswers", JSON.stringify(answers));
    }
  }, [totalQuestions, rollNumber, answers]);

  const handleOptionSelect = (qIndex, option) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = [...prevAnswers];
      updatedAnswers[qIndex] = option;
      return updatedAnswers;
    });
  };

  const handleSubmit = () => {
    if (!rollNumber || !totalQuestions) {
      alert("Please enter Roll Number and Number of Questions.");
      return;
    }
    console.log("Submitted Data:", { rollNumber, answers });
    onSubmit({ rollNumber, answers });
  };

  if (!isInitialized) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Enter Details</h2>
        <input
          type="text"
          className="block w-1/2 mx-auto p-2 border rounded-lg focus:ring-2 focus:ring-red-500"
          placeholder="Enter Roll Number"
          onChange={(e) => setRollNumber(e.target.value)}
        />
        <input
          type="number"
          className="block w-1/2 mx-auto p-2 border rounded-lg mt-4 focus:ring-2 focus:ring-red-500"
          placeholder="Enter Number of Questions"
          onChange={(e) => {
            const num = Number(e.target.value);
            setTotalQuestions(num);
            setAnswers(Array(num).fill(null));
          }}
        />
        <button
          className="mt-4 px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          onClick={() => setIsInitialized(true)}
        >
          Start
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-center text-2xl font-bold mb-6">OMR Answer Sheet</h2>
      <div className="grid grid-cols-4 gap-4 border border-red-500 p-4 rounded-lg">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="border-r border-red-500 last:border-r-0">
            {Array.from({ length: totalQuestions / 4 }).map((_, rowIndex) => {
              const qIndex = colIndex * (totalQuestions / 4) + rowIndex;
              if (qIndex >= totalQuestions) return null;
              return (
                <div key={qIndex} className="flex items-center p-2">
                  <span className="font-bold text-red-600 mr-4 w-10 text-right">
                    {String(qIndex + 1).padStart(3, "0")}
                  </span>
                  {"ABCD".split("").map((option) => (
                    <label key={option} className="flex items-center mx-3">
                      <input
                        type="radio"
                        name={`q${qIndex}`}
                        className="hidden"
                        value={option}
                        checked={answers[qIndex] === option}
                        onChange={() => handleOptionSelect(qIndex, option)}
                      />
                      <span className={`w-10 h-10 flex items-center justify-center border border-red-500 rounded-full cursor-pointer hover:bg-red-200 transition-all ${answers[qIndex] === option ? 'bg-red-500 text-white' : ''}`}>
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
      <div className="text-center mt-6">
        <button
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default OMRForm;



