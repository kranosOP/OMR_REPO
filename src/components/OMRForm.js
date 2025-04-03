import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

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
    <div className="container mt-4">
      <h2 className="text-center mb-4">OMR Answer Sheet</h2>
      {/* Roll Number Input */}
      <div className="form-group text-center">
        <label htmlFor="rollNumber" className="fw-bold">Roll Number:</label>
        <input
          type="text"
          className="form-control w-50 mx-auto"
          id="rollNumber"
          value={rollNumber}
          onChange={(e) => setRollNumber(e.target.value)}
          placeholder="Enter Roll Number"
        />
      </div>
      {/* OMR Grid */}
      <div className="row border border-danger p-3 mt-3">
        {[...Array(4)].map((_, colIndex) => (
          <div key={colIndex} className="col-md-3 border-end border-danger">
            {Array.from({ length: 25 }).map((_, rowIndex) => {
              const qIndex = colIndex * 25 + rowIndex;
              const bgColor = Math.floor(qIndex / 5) % 2 === 0 ? "bg-danger bg-opacity-25" : "bg-white";
              return (
                <div
                  key={qIndex}
                  className={`d-flex align-items-center p-2 ${bgColor}`}
                >
                  <span className="fw-bold text-danger me-2">{String(qIndex + 1).padStart(3, "0")}</span>
                  {["A", "B", "C", "D"].map((option) => (
                    <label key={option} className="form-check-label mx-2 d-flex align-items-center">
                      <input
                        type="radio"
                        name={`q${qIndex}`}
                        className="form-check-input"
                        value={option}
                        checked={answers[qIndex] === option}
                        onChange={() => handleOptionSelect(qIndex, option)}
                      />
                      <span className="border border-danger rounded-circle px-2 py-1 ms-1">{option}</span>
                    </label>
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* Submit Button */}
      <div className="text-center mt-4">
        <button className="btn btn-danger" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
};

export default OMRForm;





