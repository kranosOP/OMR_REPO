import React from "react";

const Summary = ({ rollNumber, answers, onEdit }) => {
  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">OMR Submission Summary</h2>

      <div className="mb-3">
        <p><strong>Roll Number:</strong> {rollNumber}</p>
      </div>

      <div className="mb-3">
        <h5>Answers Summary</h5>
        <div>
          {answers.map((answer, index) => (
            <p key={index}>
              <strong>Q{index + 1}:</strong> {answer || "Not Answered"}
            </p>
          ))}
        </div>
      </div>

      <div className="text-center">
        <button className="btn btn-secondary" onClick={onEdit}>Edit</button>
      </div>
    </div>
  );
};

export default Summary;

