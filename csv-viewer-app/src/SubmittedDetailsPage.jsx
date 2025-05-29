// SubmittedDetailsPage.jsx
import React from "react";
import { useLocation } from "react-router-dom";

const SubmittedDetailsPage = () => {
  const location = useLocation();
  const { familyID, accountName, formData, date } = location.state || {};

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h2>Submitted Details</h2>
      <p>
        <strong>Family ID:</strong> {familyID}
      </p>
      <p>
        <strong>Account Name:</strong> {accountName}
      </p>
      <p>
        <strong>Date:</strong> {date}
      </p>

      <h3>Form Data</h3>
      <pre>{JSON.stringify(formData, null, 2)}</pre>
    </div>
  );
};

export default SubmittedDetailsPage;
