import { Button, message, Card } from "antd";
import moment from "moment";
import { useState } from "react";

const PatientView = ({ patient, onRemove }) => {

  const [isLoading, setIsLoading] = useState(false);

  const removePatient = async (event) => {
    setIsLoading(true);
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5000/patient/${patient._id}`,
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
      fontSize: '20px',
      textAlign: 'center',
      backgroundColor: '#ccc'
    }}
    bodyStyle={{
      backgroundColor: '#f5f5f5',
    }}
    >
      <div style={{
          display: 'flex',
          flexDirection: 'column',
      }}>
        <p>
          <strong>Username: </strong>
          {patient.username}
        </p>
        <p>
          <strong>Name: </strong>
          {patient.name}
        </p>
        <p>
          <strong>Email: </strong>
          {patient.email}
        </p>
        <p>
          <strong>Date of Birth: </strong>
          {moment(patient.birthdate).format("DD/MM/YYYY")}
        </p>
        <p>
          <strong>Gender: </strong>
          {patient.gender}
        </p>
        <p>
          <strong>Mobile Number: </strong>
          {patient.phoneNumber}
        </p>
        <p>
          <strong>Emergency Contact - Full Name: </strong>
          {patient.emergencyName}
        </p>
        <p>
          <strong>Emergency Contact - Mobile Number: </strong>
          {patient.emergencyPhoneNumber}
        </p>
        <p>
          <strong>Emergency Contact - Relation: </strong>
          {patient.emergencyRelation}
        </p>
        <Button style={{alignSelf:'center'}} loading={isLoading} type="primary" onClick={removePatient}>
          Remove Patient
        </Button>
      </div>
    </Card>
  );
};

export default PatientView;
