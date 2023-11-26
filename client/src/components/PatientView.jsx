import { Button, message } from "antd";

const PatientView = ({ patient, onRemove }) => {
  const removePatient = async (event) => {
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
        {patient.birthdate}
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
      <Button type="primary" onClick={removePatient}>
        Remove Patient
      </Button>
    </div>
  );
};

export default PatientView;
