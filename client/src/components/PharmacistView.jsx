import { Button, message } from "antd";

const PharmacistView = ({ pharmacist, onRemove }) => {
  const removePharmacist = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5000/pharmacist/${pharmacist._id}`,
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
      message.success("Pharmacist removed successfully");
      onRemove(pharmacist._id);
    } else {
      message.error(data.message);
    }
  };

  return (
    <div>
      <h4>{pharmacist.name}</h4>
      <p>
        <strong>Username: </strong>
        {pharmacist.username}
      </p>
      <p>
        <strong>email: </strong>
        {pharmacist.email}
      </p>
      <p>
        <strong>dateOfBirth: </strong>
        {pharmacist.dateOfBirth}
      </p>
      <p>
        <strong>hourlyRate: </strong>
        {pharmacist.hourlyRate}
      </p>
      <p>
        <strong>affiliation: </strong>
        {pharmacist.affiliation}
      </p>
      <p>
        <strong>educationalBackground: </strong>
        {pharmacist.educationalBackground}
      </p>
      {pharmacist.registrationApproval === "approved" && (
        <Button type="primary" onClick={removePharmacist}>
          Remove Pharmacist
        </Button>
      )}
    </div>
  );
};

export default PharmacistView;
