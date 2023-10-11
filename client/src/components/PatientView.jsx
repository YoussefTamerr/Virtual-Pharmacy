import { Button, message } from "antd";

const PatientView = ({ patient }) => {
  const removePatient = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5000/patient/${patient.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    if (response.ok) {
      message.success("Patient removed successfully");
    } else {
      message.error(data.message);
    }
  };

  return (
    <div className="patient-details">
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
        {patient.dateOfBirth}
      </p>
      <p>
        <strong>Gender: </strong>
        {patient.gender}
      </p>
      <p>
        <strong>Mobile Number: </strong>
        {patient.mobileNumber}
      </p>
      <p>
        <strong>Emergency Contact - Full Name: </strong>
        {patient.emergencyContact.fullName}
      </p>
      <p>
        <strong>Emergency Contact - Mobile Number: </strong>
        {patient.emergencyContact.mobileNumber}
      </p>
      <p>
        <strong>Emergency Contact - Relation: </strong>
        {patient.emergencyContact.relation}
      </p>
      <Button type="primary" onClick={removePatient}>
        Remove Patient
      </Button>
    </div>
  );
};

export default PatientView;
