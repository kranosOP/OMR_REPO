import React, { useState, useEffect } from "react";

const OMRForm = ({ onSubmit, initialQuestionCount = 100 }) => {
  // Initialize state from local storage if available, otherwise use defaults
  const [totalQuestions, setTotalQuestions] = useState(() => {
    const saved = localStorage.getItem("omrTotalQuestions");
    return saved ? parseInt(saved) : initialQuestionCount;
  });
  
  const [rollNumber, setRollNumber] = useState(() => {
    return localStorage.getItem("omrRollNumber") || "";
  });
  
  const [answers, setAnswers] = useState(() => {
    const saved = localStorage.getItem("omrAnswers");
    return saved ? JSON.parse(saved) : Array(totalQuestions).fill(null);
  });

  // Error message state
  const [errorMessage, setErrorMessage] = useState("");

  // Use window size to determine layout
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1024);

  // Listen for window resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate columns based on window width
  const getColumns = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 768) return 2;
    if (windowWidth < 1024) return 3;
    return 4;
  };
  
  const columns = getColumns();

  // Save total questions to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("omrTotalQuestions", totalQuestions.toString());
  }, [totalQuestions]);

  // Save roll number to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem("omrRollNumber", rollNumber);
  }, [rollNumber]);

  // Save answers to local storage whenever they change
  useEffect(() => {
    localStorage.setItem("omrAnswers", JSON.stringify(answers));
  }, [answers]);

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

  // Clear error message when user makes changes
  useEffect(() => {
    if (errorMessage) {
      setErrorMessage("");
    }
  }, [rollNumber, answers]);

  const handleOptionSelect = (qIndex, option) => {
    const updatedAnswers = [...answers];
    updatedAnswers[qIndex] = option;
    setAnswers(updatedAnswers);
  };

  const getAnsweredQuestionsCount = () => {
    return answers.filter(a => a !== null).length;
  };

  const handleSubmit = () => {
    // Reset error message
    setErrorMessage("");
    
    // Check if roll number is entered
    if (!rollNumber.trim()) {
      setErrorMessage("Please enter your Roll Number.");
      return;
    }
    
    // Check if at least 50% of questions are answered
    const answeredCount = getAnsweredQuestionsCount();
    const requiredCount = Math.ceil(totalQuestions * 0.5);
    
    if (answeredCount < requiredCount) {
      setErrorMessage(`Please answer at least 50% (${requiredCount}) of the questions. Currently answered: ${answeredCount}.`);
      return;
    }
    
    // If validation passes, submit the form
    onSubmit({ rollNumber, answers });
    
    // Clear local storage after successful submission if desired
    // Uncomment the following lines to clear data after submission
    // localStorage.removeItem("omrTotalQuestions");
    // localStorage.removeItem("omrRollNumber");
    // localStorage.removeItem("omrAnswers");
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset all answers? This cannot be undone.")) {
      setAnswers(Array(totalQuestions).fill(null));
      setErrorMessage("");
      // You can choose to reset roll number too if needed
      // setRollNumber("");
    }
  };

  // Calculate the number of questions per column
  const questionsPerColumn = Math.ceil(totalQuestions / columns);
  
  // Generate question rows
  const renderQuestionRows = () => {
    const rows = [];
    for (let i = 0; i < totalQuestions; i++) {
      const bgColor = Math.floor(i / 5) % 2 === 0 ? "bg-red-100" : "bg-white";
      rows.push(
        <div key={i} className={`flex items-center p-1 sm:p-2 ${bgColor}`}>
          <span className="font-bold text-red-600 mr-1 sm:mr-2 w-8 sm:w-12 text-xs sm:text-base">
            {String(i + 1).padStart(3, "0")}
          </span>
          <div className="flex flex-1 justify-around">
            {["A", "B", "C", "D"].map((option) => (
              <div
                key={option}
                className="mx-2 sm:mx-4" 
                onClick={() => handleOptionSelect(i, option)}
              >
                <span
                  className={`w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center border rounded-full cursor-pointer select-none text-xs sm:text-base
                    ${answers[i] === option ? "bg-red-500 text-white" : "border-red-500 hover:bg-red-200"}
                  `}
                >
                  {option}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return rows;
  };

  // Distribute questions across columns
  const renderColumns = () => {
    const allQuestions = renderQuestionRows();
    const columnGroups = [];
    
    for (let i = 0; i < columns; i++) {
      const startIndex = i * questionsPerColumn;
      const endIndex = Math.min(startIndex + questionsPerColumn, totalQuestions);
      const columnQuestions = allQuestions.slice(startIndex, endIndex);
      
      columnGroups.push(
        <div key={i} className="border-b sm:border-r border-red-500 last:border-b-0 sm:last:border-r-0 pb-2 sm:pb-0">
          {columnQuestions}
        </div>
      );
    }
    
    return columnGroups;
  };

  // Calculate completion percentage
  const completionPercentage = Math.round((getAnsweredQuestionsCount() / totalQuestions) * 100);
  const isValidCompletion = completionPercentage >= 50;
  
  return (
    <div className="container mx-auto p-2 sm:p-4 md:p-6">
      <h2 className="text-center text-xl sm:text-2xl font-bold mb-4 sm:mb-6">OMR Answer Sheet</h2>
      
      {/* Configuration Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-4 sm:mb-6">
        {/* Roll Number Input */}
        <div className="w-full sm:flex-1">
          <label htmlFor="rollNumber" className="font-semibold text-base sm:text-lg block mb-1 sm:mb-2">
            Roll Number:
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-red-500 ${!rollNumber.trim() && errorMessage ? 'border-red-500' : ''}`}
            id="rollNumber"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            placeholder="Enter Roll Number"
          />
        </div>
        
        {/* Question Count Input */}
        <div className="w-full sm:flex-1">
          <label htmlFor="questionCount" className="font-semibold text-base sm:text-lg block mb-1 sm:mb-2">
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
      
      {/* Error message display */}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 relative" role="alert">
          <span className="block sm:inline">{errorMessage}</span>
        </div>
      )}
      
      {/* Progress indicator */}
      <div className="mb-4">
        <div className="flex justify-between mb-1">
          <span className="text-sm sm:text-base">
            Progress: {getAnsweredQuestionsCount()}/{totalQuestions} 
            {!isValidCompletion && completionPercentage > 0 && (
              <span className="text-red-500 ml-2">(Need at least 50%)</span>
            )}
          </span>
          <span className={`text-sm sm:text-base ${isValidCompletion ? 'text-green-600' : 'text-red-500'}`}>
            {completionPercentage}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`${isValidCompletion ? 'bg-green-500' : 'bg-red-500'} h-2.5 rounded-full`}
            style={{ width: `${completionPercentage}%` }}
          ></div>
        </div>
      </div>
      
      {/* OMR Grid - Using fixed classes based on windowWidth */}
      <div className={`
        border border-red-500 p-2 sm:p-4 rounded-lg
        ${windowWidth < 640 ? 'grid grid-cols-1' : 
          windowWidth < 768 ? 'grid grid-cols-2' : 
          windowWidth < 1024 ? 'grid grid-cols-3' : 
          'grid grid-cols-4'}
        gap-2 sm:gap-4
      `}>
        {renderColumns()}
      </div>
      
      {/* Button Group */}
      <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4 mt-4 sm:mt-6">
        <button
          className={`w-full sm:w-auto px-4 sm:px-6 py-2 font-semibold rounded-lg shadow transition-all text-sm sm:text-base
            ${(isValidCompletion && rollNumber.trim()) ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-red-300 text-white cursor-not-allowed'}`}
          onClick={handleSubmit}
          disabled={!isValidCompletion || !rollNumber.trim()}
        >
          Submit
        </button>
        <button
          className="w-full sm:w-auto px-4 sm:px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg shadow hover:bg-gray-300 transition-all text-sm sm:text-base"
          onClick={handleReset}
        >
          Reset Answers
        </button>
      </div>
    </div>
  );
};

export default OMRForm;








