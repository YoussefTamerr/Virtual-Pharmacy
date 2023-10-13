import { useEffect, useState } from "react";
import PatientView from "./PatientView";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/patient`);
      const data = await response.json();
      if (response.ok) {
        setPatients(data);
      }
    };
    fetchData();
  }, [patients]);

  return (
    <div>
      <h2>Patients</h2>

      {patients.map((patient) => (
        <PatientView key={patient._id} patient={patient} />
      ))}
    </div>
  );
}

export default PatientList;
