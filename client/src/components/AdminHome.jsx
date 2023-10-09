import React, { useEffect, useState } from "react";
import { message } from "antd";
import PharmacistView from "./PharmacistView";
import PatientView from "./PatientView";

function AdminFunctions() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const [pharmacistView, setPharmacistView] = useState(null);
  const [patientView, setPatientView] = useState(null);
  const [pharmacistData, setPharmacistData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: 0,
    affiliation: "",
    educationalBackground: "",
    registrationApproval: "",
  });
  const [patientData, setpatientData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emergencyContact: {
      fullName: "",
      mobileNumber: "",
      relation: "",
    },
  });

  useEffect(() => {
    const getPatientData = async () => {
      const response = await fetch(`http://localhost:5000/patient`);
      const data = await response.json();
      if (response.ok) {
        setPatientView(data);
        setError(false);
      } else {
        setError(true);
      }
    };
    getPatientData();
  }, [patientView]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      message.success("Admin created successfully");
      setUsername("");
      setPassword("");
    } else {
      message.error(data.message);
    }
  };

  useEffect(() => {
    const getPharmacistData = async () => {
      const response = await fetch(`http://localhost:5000/pharmacist`);
      const data = await response.json();
      if (response.ok) {
        setPharmacistView(data);
        setError(false);
      } else {
        setError(true);
      }
    };
    getPharmacistData();
  }, [pharmacistView]);

  return (
    <>
      <div className="home">
        <div className="medInfo">
          <p>Approved Pharmacists</p>
          {pharmacistView &&
            pharmacistView
              .filter((pharma) => pharma.registrationApproval === "approved")
              .map((pharma) => (
                <PharmacistView key={pharma._id} pharma={pharma} />
              ))}
        </div>
        <div className="medInfo">
          <p>Pending Pharmacists</p>
          {pharmacistView &&
            pharmacistView
              .filter((pharma) => pharma.registrationApproval === "pending")
              .map((pharma) => (
                <PharmacistView key={pharma._id} pharma={pharma} />
              ))}
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
      <div className="PatientInfo">
        <p>Patient</p>
        {patientView &&
          patientView.map((patient) => (
            <PatientView key={patient._id} patient={patient} />
          ))}
      </div>
    </>
  );
}

export default AdminFunctions;
