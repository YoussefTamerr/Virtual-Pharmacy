import { Flex, Card } from "antd";
import { useState } from "react";
import moment from "moment";
const { Meta } = Card;

import { useLocation } from "react-router-dom";
import MedicineView from "./MedicineView";

const PrescriptionView = ({ prescription }) => {
  const [isLoading, setIsLoading] = useState();
  const location = useLocation();

  return (
    <div>
      
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          style={{
            marginTop: 16,
            gap: "small",
            display: "flex",
            flexDirection: "column",
            border: "2px solid grey",
          }}
          title={prescription.name}
        >
          <div>
            <strong>Status: {prescription.status}</strong> <br />
            <strong>Notes: {prescription.notes} </strong> <br />
            <strong>Date: {moment(prescription.date).format('YYYY-MM-DD')}</strong> <br />
          </div>
          <div style={
            {
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)", 
              gap: 20,
            }
          }>
            {prescription.medications.map((medication) => (
              <div>
                <MedicineView key={medication.medicine_id._id} medicine={medication.medicine_id} />
                <strong>Dosage: {medication.dosage}</strong> <br />
                <strong>Frequency: {medication.frequency}</strong> <br />
                <strong>Duration: {medication.duration} </strong> <br />
              </div>
            ))}
          </div>

        </Card>
        <br />
      </div>
    </div>
  );
};

export default PrescriptionView;
