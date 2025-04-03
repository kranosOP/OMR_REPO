import React, { useState } from "react";
import OMRForm from "./components/OMRForm";
import Summary from "./components/Summary";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [submittedData, setSubmittedData] = useState(null);

  return (
    <div className="app">
      {submittedData ? (
        <Summary
          rollNumber={submittedData.rollNumber}
          answers={submittedData.answers}
          onEdit={() => setSubmittedData(null)}
        />
      ) : (
        <OMRForm onSubmit={setSubmittedData} />
      )}
    </div>
  );
}

export default App;

