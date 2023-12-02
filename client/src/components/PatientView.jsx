import { Button, message, Card } from "antd";
import moment from "moment";
import { useState } from "react";

const PatientView = ({ patient, onRemove }) => {
  const [isLoading, setIsLoading] = useState(false);

  const removePatient = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await fetch(
      `http://localhost:10000/patient/${patient._id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      message.success("Patient removed successfully");
      onRemove(patient._id);
    } else {
      message.error(data.message);
    }
    setIsLoading(false);
  };

  return (
    <Card
      title={patient.username}
      headStyle={{
        fontSize: "20px",
        textAlign: "center",
        backgroundColor: "#ccc",
      }}
      bodyStyle={{
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "15px",
          minWidth: "250px",
        }}
      >
        <div>
          <strong>Name: </strong>
          {patient.name}
        </div>
        <div>
          <strong>Email: </strong>
          {patient.email}
        </div>
        <div>
          <strong>Date of Birth: </strong>
          {moment(patient.birthdate).format("DD/MM/YYYY")}
        </div>
        <div>
          <strong>Gender: </strong>
          {patient.gender}
        </div>
        <div>
          <strong>Mobile Number: </strong>
          {patient.phoneNumber}
        </div>
        <div>
          <strong>Emergency Contact - Full Name: </strong>
          {patient.emergencyName}
        </div>
        <div>
          <strong>Emergency Contact - Mobile Number: </strong>
          {patient.emergencyPhoneNumber}
        </div>
        <div>
          <strong>Emergency Contact - Relation: </strong>
          {patient.emergencyRelation}
        </div>
        <Button
          style={{ alignSelf: "center" }}
          loading={isLoading}
          type="primary"
          onClick={removePatient}
        >
          Remove Patient
        </Button>
      </div>
    </Card>
  );
};

export default PatientView;
