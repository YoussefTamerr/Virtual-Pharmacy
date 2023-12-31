import { useEffect, useState } from "react";
import PatientView from "./PatientView";
import Spinner from "./Spinner";

function PatientList() {
  const [patients, setPatients] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/patient`, {
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
    <>
      {patients ? (
        <>
          <h1>Patients</h1>
          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                patients.length <= 1 ? "1fr" : "repeat(2, 1fr)",
              gridGap: "1rem",
              marginTop: "1rem",
              marginBottom: "20px",
            }}
          >
            {patients.length === 0 && <p>No patients found</p>}
            {patients.map((patient) => (
              <PatientView
                key={patient._id}
                patient={patient}
                onRemove={onRemove}
              />
            ))}
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default PatientList;
