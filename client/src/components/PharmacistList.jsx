import { useEffect, useState } from "react";
import PharmacistView from "./PharmacistView";
import Spinner from "./Spinner";

function PharmacistList() {
  const [pharmacists, setPharmacists] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/pharmacist`, {
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        setPharmacists(data);
      }
    };
    fetchData();
  }, []);

  const onRemove = (id) => {
    setPharmacists((prevState) =>
      prevState.filter((pharmacist) => pharmacist._id !== id)
    );
  };

  const onUpdatePharmacist = (id, registrationApproval) => {
    setPharmacists((prevState) =>
      prevState.map((pharmacist) => {
        if (pharmacist._id === id) {
          pharmacist.registrationApproval = registrationApproval;
        }
        return pharmacist;
      })
    );
  };

  const approvedPharmacists = pharmacists.filter(
    (pharmacist) => pharmacist.registrationApproval === "approved"
  );

  const pendingPharmacists = pharmacists.filter(
    (pharmacist) => pharmacist.registrationApproval === "pending"
  );

  const rejectedPharmacists = pharmacists.filter(
    (pharmacist) => pharmacist.registrationApproval === "denied"
  );

  return (
    <div>
      <h2>Pharmacists</h2>
      {pharmacists.length == 0 ? (
        <Spinner />
      ) : (
        <>
          <h3>Registered Pharmacists</h3>
          {approvedPharmacists.map((pharmacist) => (
            <PharmacistView
              key={pharmacist._id}
              pharmacist={pharmacist}
              onRemove={onRemove}
              onUpdatePharmacist={onUpdatePharmacist}
            />
          ))}

          <h3>Registration Requests</h3>
          {pendingPharmacists.map((pharmacist) => (
            <PharmacistView
              key={pharmacist._id}
              pharmacist={pharmacist}
              onRemove={onRemove}
              onUpdatePharmacist={onUpdatePharmacist}
            />
          ))}

          <h3>Rejected Pharmacists</h3>
          {rejectedPharmacists.map((pharmacist) => (
            <PharmacistView
              key={pharmacist._id}
              pharmacist={pharmacist}
              onRemove={onRemove}
              onUpdatePharmacist={onUpdatePharmacist}
            />
          ))}
        </>
      )}
    </div>
  );
}

export default PharmacistList;
