import { Button, Modal, message, Card } from "antd";
import { useState } from "react";
const { Meta } = Card;

import { useLocation } from "react-router-dom";

const MedicineView = ({ medicine }) => {
  const [isLoading, setIsLoading] = useState();
  const location = useLocation();
  const [medicineDetails, setMedicineDetails] = useState(medicine.details);
  const [medicinePrice, setMedicinePrice] = useState(medicine.price);
  const [medicineQuantity, setMedicineQuantity] = useState(
    medicine.availableQuantity
  );

  const [medicineDetailsInter, setMedicineDetailsInter] = useState(
    medicine.details
  );
  const [medicinePriceInter, setMedicinePriceInter] = useState(medicine.price);
  const [medicineQuantityInter, setMedicineQuantityInter] = useState(
    medicine.availableQuantity
  );

  const [medicineArchived, setMedicineArchived] = useState(medicine.archived);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    fetch(`http://localhost:5000/medicine/${medicine._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
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

  const addToCart = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/cart`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          medicine_id: medicine._id,
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

  const archiveMed = async () => {
    try {
      const response = await fetch(`http://localhost:5000/medicine/archive/${medicine._id}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        message.error("Failed to archive medicine");
      }
      message.success("Successfully archived medicine");
      setMedicineArchived(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to archive medicine");
    }
  }

  const unarchiveMed = async () => {
    try {
      const response = await fetch(`http://localhost:5000/medicine/unarchive/${medicine._id}`, {
        method: "PATCH",
        credentials: "include",
      });
      if (!response.ok) {
        message.error("Failed to unarchive medicine");
      }
      message.success("Successfully unarchived medicine");
      setMedicineArchived(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to archive medicine");
    }
  }

  return (
    <div>
      {location.pathname.startsWith("/pharmacist") && (
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
          cover={
            <img
              alt="example"
              src={`http://localhost:5000/${medicine.image}`}
            />
          }
        >
          <Meta
            title={medicine.name}
            description={
              <>
                {location.pathname.startsWith("/pharmacist") && (
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
              </>
            }
          />
        </Card>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          {location.pathname.startsWith("/pharmacist") && (
            <>
              <Button type="primary" onClick={showModal}>
                Edit Medicine
              </Button>
              {medicineArchived ? (
                <Button type="primary" onClick={unarchiveMed}>
                  Unarchive Medicine
                </Button>
              ) : (
                <Button type="primary" onClick={archiveMed}>
                  Archive Medicine
                </Button>
              )}
            </>
          )}
          {((location.pathname.startsWith("/patient") && 
          medicine.medType ==="countertop") ||
          (location.pathname.startsWith("/patient/prescriptions"))) && 
          (
            <Button type="primary" onClick={addToCart} loading={isLoading}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicineView;
