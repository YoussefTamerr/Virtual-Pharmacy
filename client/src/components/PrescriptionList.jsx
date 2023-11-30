import { useEffect, useState } from "react";
import PrescriptionView from "./PrescriptionView";
import Spinner from "./Spinner";
import { Flex } from "antd";


function PrescriptionList() {
  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/prescription`, {
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        setPrescriptions(data.prescriptions);
      }
    };
    fetchData();
  }, []);

  if (prescriptions == null) {
    return <Spinner />;
  }

  return (
    <>
      <h1>Prescriptions</h1>
      {
        prescriptions.length === 0 && <p style={{fontSize:"20px"}}>You have no prescriptions</p>
      }
      <Flex wrap="wrap" justify="center" align="end" gap={10}>
        {prescriptions && prescriptions.map((prescription) => (
          <PrescriptionView key={prescription._id} prescription={prescription} />
        ))}
      </Flex>
    </>
  );
}

export default PrescriptionList;
