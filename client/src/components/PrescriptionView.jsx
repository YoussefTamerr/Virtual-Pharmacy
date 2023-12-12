import { Card, Button, message } from "antd";
import { useState } from "react";
import moment from "moment";

const PrescriptionView = ({ prescription }) => {
  const [isLoading, setIsLoading] = useState();

  const addToCart = async (medicineid) => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:10000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          medicine_id: medicineid,
          quantity: 1,
        }),
      });
      if (!response.ok) {
        message.error("Failed to add medicine to cart");
      }
      message.success("Successfully added medicine");
    } catch (error) {
      console.error(error);
      message.error("Failed to add medicine");
    }
    setIsLoading(false);
  };

  return (
    <div style={{ marginBottom: "26px" }}>
      <Card
        headStyle={{
          fontSize: "20px",
          textAlign: "center",
          backgroundColor: "#ebebeb",
        }}
        bodyStyle={{
          backgroundColor: "#fafafa",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          //alignItems: "flex-start",
        }}
        style={{
          //marginTop: 16,
          gap: "small",
          display: "flex",
          flexDirection: "column",
        }}
        title={prescription.name}
      >
        <div>
          <strong>Status: </strong>
          {prescription.status}
        </div>
        <div>
          <strong>Notes: </strong>
          {prescription.notes}
        </div>
        <div>
          <strong>Date: </strong>
          {moment(prescription.date).format("YYYY-MM-DD")}
        </div>
        <div
          style={{
            // marginTop: 16,
            alignSelf: "center",
            height: "260px",
            width: "440px",
            overflow: "auto",
            display: "grid",
            gridTemplateColumns:
              prescription.medications.length <= 1 ? "1fr" : "repeat(2, 1fr)",
            //gap: 20,
          }}
        >
          {prescription.medications.map((medication, index) => (
            <div
              style={{
                height: "fit-content",
              }}
              key={index}
            >
              <Card
                title={medication.medicine_id.name}
                headStyle={{
                  textAlign: "center",
                  //backgroundColor: '#ccc'
                }}
                style={{
                  margin: 5,
                  height: "90%",
                  boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
                  width: "90%",
                  overflow: "auto",
                }}
                bodyStyle={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "flex-start",
                  gap: "3px",
                }}
              >
                <div>
                  <strong>Price: </strong>${medication.medicine_id.price}
                </div>
                <div>
                  <strong>Dosage: </strong>
                  {medication.dosage}
                </div>
                <div>
                  <strong>Frequency: </strong>
                  {medication.frequency}
                </div>
                <div>
                  <strong>Duration: </strong>
                  {medication.duration}
                </div>
                {prescription.status === "unfilled" ? (
                  <Button
                    onClick={() => addToCart(medication.medicine_id._id)}
                    type="primary"
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <Button disabled>Prescription Filled</Button>
                )}
              </Card>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default PrescriptionView;
