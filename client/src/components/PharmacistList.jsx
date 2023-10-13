import { useEffect, useState } from "react";
import PharmacistView from "./PharmacistView";

function PharmacistList() {
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/pharmacist`);
      const data = await response.json();
      if (response.ok) {
        setPharmacists(data);
      }
    };
    fetchData();
  }, [pharmacists]);

  const approvedPharmacists = pharmacists.filter(
    (pharmacist) => pharmacist.registrationApproval === "approved"
  );

  const pendingPharmacists = pharmacists.filter(
    (pharmacist) => pharmacist.registrationApproval === "pending"
  );

  return (
    <div>
      <h2>Pharmacists</h2>
      <h3>Registered Pharmacists</h3>
      {approvedPharmacists.map((pharmacist) => (
        <PharmacistView key={pharmacist._id} pharmacist={pharmacist} />
      ))}

      <h3>Registration Requests</h3>
      {pendingPharmacists.map((pharmacist) => (
        <PharmacistView key={pharmacist._id} pharmacist={pharmacist} />
      ))}
    </div>
  );
}

export default PharmacistList;
