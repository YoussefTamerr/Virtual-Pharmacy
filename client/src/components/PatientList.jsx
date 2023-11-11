import { useEffect, useState } from "react";
import PatientView from "./PatientView";

function PatientList() {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/patient`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setPatients(data);
      }
    };
    fetchData();
  }, []);

  const onRemove = (id) => {
    setPatients((prevState) =>
      prevState.filter((patient) => patient._id !== id)
    );
  };

  return (
    <div>
      <h2>Patients</h2>

      {patients.map((patient) => (
        <PatientView key={patient._id} patient={patient} onRemove={onRemove} />
      ))}
    </div>
  );
}

export default PatientList;
