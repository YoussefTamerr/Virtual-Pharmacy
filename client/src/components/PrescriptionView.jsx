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
      <Card
        headStyle={{
          fontSize: '20px',
          textAlign: 'center',
          backgroundColor: '#ccc'
        }}
        bodyStyle={{
          //backgroundColor: '#f5f5f5',
        }}

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
          <strong>Status: </strong>{prescription.status}
        </div>
        <div>
          <strong>Notes: </strong>{prescription.notes}
        </div>
        <div>
          <strong>Date: </strong>{moment(prescription.date).format('YYYY-MM-DD')}
        </div>
        <div style={
          {
            marginTop: 16,
            height: '250px',
            minWidth: '300px',
            overflow: 'auto',
            display: "grid",
            gridTemplateColumns:prescription.medications.length <= 1? '1fr': 'repeat(2, 1fr)', 
            //gap: 20,
          }
        }>
          {prescription.medications.map((medication, index) => (
            <div 
              key={index} 
            >
              <Card 
                title={medication.medicine_id.name}
                headStyle={{
                  textAlign: 'center',
                  //backgroundColor: '#ccc'
                }}
                style={{
                  margin: 10,
                  height: '90%',
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                }}
              >
                <div>
                  <strong>Price: </strong>${medication.medicine_id.price}
                </div>
                <div>
                  <strong>Details: </strong>{medication.medicine_id.details}
                </div>
                <div>
                  <strong>Dosage: </strong>{medication.dosage}
                </div>
                <div>
                  <strong>Frequency: </strong>{medication.frequency}
                </div>
                <div>
                  <strong>Duration: </strong>{medication.duration}
                </div>
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionView;
