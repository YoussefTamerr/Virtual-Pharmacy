import { useEffect, useState } from "react";
import PharmacistView from "./PharmacistView";
import Spinner from "./Spinner";

function PharmacistList() {
  const [pharmacists, setPharmacists] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/pharmacist`, {
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

  const approvedPharmacists = pharmacists
    ? pharmacists.filter(
        (pharmacist) => pharmacist.registrationApproval === "approved"
      )
    : [];

  const pendingPharmacists = pharmacists
    ? pharmacists.filter(
        (pharmacist) => pharmacist.registrationApproval === "pending"
      )
    : [];

  const rejectedPharmacists = pharmacists
    ? pharmacists.filter(
        (pharmacist) => pharmacist.registrationApproval === "denied"
      )
    : [];

  const layout = {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "20px",
  };

  const layoutSingleItem = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gridGap: "1rem",
    marginTop: "1rem",
    marginBottom: "20px",
  };

  return (
    <>
      {pharmacists ? (
        <>
          <h1>Pharmacists</h1>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "15px",
              minWidth: "250px",
              alignItems: "center",
            }}
          >
            <h2>Registered Pharmacists</h2>
            {approvedPharmacists.length === 0 && <p>No pharmacists found</p>}
            <div
              style={
                approvedPharmacists.length <= 1 ? layoutSingleItem : layout
              }
            >
              {approvedPharmacists.map((pharmacist) => (
                <PharmacistView
                  key={pharmacist._id}
                  pharmacist={pharmacist}
                  onRemove={onRemove}
                  onUpdatePharmacist={onUpdatePharmacist}
                />
              ))}
            </div>

            <h2>Registration Requests</h2>
            {pendingPharmacists.length === 0 && (
              <p>No pending requests found</p>
            )}
            <div
              style={pendingPharmacists.length <= 1 ? layoutSingleItem : layout}
            >
              {pendingPharmacists.map((pharmacist) => (
                <PharmacistView
                  key={pharmacist._id}
                  pharmacist={pharmacist}
                  onRemove={onRemove}
                  onUpdatePharmacist={onUpdatePharmacist}
                />
              ))}
            </div>

            <h2>Rejected Pharmacists</h2>
            {rejectedPharmacists.length === 0 && (
              <p>No rejected pharmacists found</p>
            )}
            <div
              style={
                rejectedPharmacists.length <= 1 ? layoutSingleItem : layout
              }
            >
              {rejectedPharmacists.map((pharmacist) => (
                <PharmacistView
                  key={pharmacist._id}
                  pharmacist={pharmacist}
                  onRemove={onRemove}
                  onUpdatePharmacist={onUpdatePharmacist}
                />
              ))}
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </>
  );
}

export default PharmacistList;
