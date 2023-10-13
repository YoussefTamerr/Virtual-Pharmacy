import { Button, Modal, message } from "antd";
import { useState } from "react";

const MedicineView = ({ medicine }) => {
  const [medicineDetails, setMedicineDetails] = useState(medicine.details);
  const [medicinePrice, setMedicinePrice] = useState(medicine.price);
  const [medicineQuantity, setMedicineQuantity] = useState(medicine.availableQuantity);

  const [medicineDetailsInter, setMedicineDetailsInter] = useState(medicine.details);
  const [medicinePriceInter, setMedicinePriceInter] = useState(medicine.price);
  const [medicineQuantityInter, setMedicineQuantityInter] = useState(medicine.availableQuantity);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    // setMedicineDetails(medicineDetailsInter);
    // setMedicinePrice(medicinePriceInter);
    // setMedicineQuantity(medicineQuantityInter);

    fetch(`http://localhost:5000/medicine/${medicine._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        details: medicineDetailsInter,
        price: medicinePriceInter,
        availableQuantity: medicineQuantityInter,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update medicine");
        }
        setMedicineDetails(medicineDetailsInter);
        setMedicinePrice(medicinePriceInter);
        setMedicineQuantity(medicineQuantityInter);
        message.success("Successfully updated medicine");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to update medicine");
      });

    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {window.location.pathname == "/pharmacist" && (
        <Modal
          title="Edit Medicine"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          okText="Save"
        >
          <label>
            Details:
            <input
              value={medicineDetailsInter}
              type="text"
              onChange={(e) => {
                setMedicineDetailsInter(e.target.value);
              }}
            />
          </label>
          <label>
            Price:
            <input
              value={medicinePriceInter}
              type="text"
              onChange={(e) => {
                setMedicinePriceInter(e.target.value);
              }}
            />
          </label>
          <label>
            Available Quantity:
            <input
              value={medicineQuantityInter}
              type="number"
              onChange={(e) => {
                setMedicineQuantityInter(e.target.value);
              }}
            />
          </label>
        </Modal>
      )}
      <h4>{medicine.name}</h4>
      {window.location.pathname == "/pharmacist" && (
        <>
          <p>
            <strong>available Quantity </strong>
            {medicineQuantity}
          </p>
          <p>
            <strong>sales: </strong>
            {medicine.sales}
          </p>
        </>
      )}
      <p>
        <strong>price: </strong>
        {medicinePrice}
      </p>
      <p>
        <strong>details: </strong>
        {medicineDetails}
      </p>
      {window.location.pathname == "/pharmacist" && (
        <Button type="primary" onClick={showModal}>
          Edit Medicine
        </Button>
      )}
    </div>
  );
};

export default MedicineView;
