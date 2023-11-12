import { Button, Flex, message } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

const PharmacistView = ({ pharmacist, onRemove, onUpdatePharmacist }) => {
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

  const updatePharmacistApproval = async (event, registrationApproval) => {
    event.preventDefault();
    const response = await fetch(
      `http://localhost:5000/pharmacist/${pharmacist._id}`,
      {
        method: "PATCH",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ registrationApproval }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      onUpdatePharmacist(pharmacist._id, registrationApproval);
      message.success("Pharmacist request " + data.registrationApproval);
    } else {
      message.error(data.message);
    }
  };

  return (
    <Flex vertical gap={4} align="start">
      <h4>{pharmacist.name}</h4>
      <div>
        <strong>Username: </strong>
        {pharmacist.username}
      </div>
      <div>
        <strong>Email: </strong>
        {pharmacist.email}
      </div>
      <div>
        <strong>Date of Birth: </strong>
        {pharmacist.dateOfBirth}
      </div>
      <div>
        <strong>Hourly Rate: </strong>
        {pharmacist.hourlyRate}
      </div>
      <div>
        <strong>Affiliation: </strong>
        {pharmacist.affiliation}
      </div>
      <div>
        <strong>Educational Background: </strong>
        {pharmacist.educationalBackground}
      </div>
      <Button
        type="default"
        icon={<DownloadOutlined />}
        href={`http://localhost:5000/${pharmacist.pharmacyDegree}`}
        size="small"
        download
      >
        Pharmacy Degree
      </Button>
      <Button
        type="default"
        icon={<DownloadOutlined />}
        href={`http://localhost:5000/${pharmacist.workingLicense}`}
        size="small"
        download
      >
        Working License
      </Button>
      <Button
        type="default"
        icon={<DownloadOutlined />}
        href={`http://localhost:5000/${pharmacist.nationalId}`}
        size="small"
        download
      >
        National ID
      </Button>
      {pharmacist.registrationApproval !== "pending" && (
        <Button type="primary" onClick={removePharmacist}>
          Remove Pharmacist
        </Button>
      )}
      {pharmacist.registrationApproval === "pending" && (
        <Flex gap={5}>
          <Button
            type="primary"
            onClick={(event) => updatePharmacistApproval(event, "approved")}
            block
          >
            Accept Request
          </Button>
          <Button
            type="primary"
            onClick={(event) => updatePharmacistApproval(event, "denied")}
            block
          >
            Reject Request
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default PharmacistView;
