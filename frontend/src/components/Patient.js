import React, { useState, useEffect } from "react";
import MedicalRecCard from "./patientComponents/MedicalRecCard";

const Patient = (props) => {
  const identity = "patient";
  const apiUrl = props.apiUrl;
  const [loading, setLoading] = useState(false);
  const [medRecords, setMedRecords] = useState([]);

  const loadPatientRecords = () => {
    setLoading(true);

    //TODO modify chaincode to send all record if all recived as medicalRecordId
    fetch(
      `${apiUrl}get-medical-record/?name=${identity}&recId=all&userId=${identity}`
    )
      .then((response) => response.json())
      .then((data) => {
        setMedRecords(data.data);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadPatientRecords();
  }, []);

  return (
    <div>
      <div className="container">
        <span className="ribbon">{props.patientName}</span>
        {loading ? (
          <p>Loading...</p>
        ) : (
          medRecords.map((rec, key) => {
            return (
              <MedicalRecCard
                key={rec.medicalRecordId}
                record={rec}
                identity={identity}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Patient;
