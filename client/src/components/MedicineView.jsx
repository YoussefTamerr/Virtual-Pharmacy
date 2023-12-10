import { Button, Modal, message, Card, Flex, Input } from "antd";
import { useState } from "react";
const { Meta } = Card;

import { useLocation } from "react-router-dom";

const MedicineView = ({ medicine, alternatives }) => {
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

  const alternativesLength = alternatives?.length || 0;

  const handleOk = () => {
    fetch(`http://localhost:10000/medicine/${medicine._id}`, {
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
      const response = await fetch(`http://localhost:10000/cart`, {
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
      const response = await fetch(
        `http://localhost:10000/medicine/archive/${medicine._id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        message.error("Failed to archive medicine");
      }
      message.success("Successfully archived medicine");
      setMedicineArchived(true);
    } catch (error) {
      console.error(error);
      message.error("Failed to archive medicine");
    }
  };

  const unarchiveMed = async () => {
    try {
      const response = await fetch(
        `http://localhost:10000/medicine/unarchive/${medicine._id}`,
        {
          method: "PATCH",
          credentials: "include",
        }
      );
      if (!response.ok) {
        message.error("Failed to unarchive medicine");
      }
      message.success("Successfully unarchived medicine");
      setMedicineArchived(false);
    } catch (error) {
      console.error(error);
      message.error("Failed to archive medicine");
    }
  };

  const disableButton = () => {
    if (!location.pathname.startsWith("/patient")) return 3;
    if (
      medicine.medType === "prescription" &&
      location.pathname.startsWith("/patient/medicines")
    ) {
      return 0;
    }
    if (medicine.availableQuantity === 0) {
      return 1;
    }
    return 2;
  };

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
            <Input
              value={medicineDetailsInter}
              type="text"
              onChange={(e) => {
                setMedicineDetailsInter(e.target.value);
              }}
            />
          </label>
          <label>
            Price:
            <Input
              value={medicinePriceInter}
              type="text"
              onChange={(e) => {
                setMedicinePriceInter(e.target.value);
              }}
            />
          </label>
          <label>
            Available Quantity:
            <Input
              value={medicineQuantityInter}
              type="number"
              onChange={(e) => {
                setMedicineQuantityInter(e.target.value);
              }}
            />
          </label>
        </Modal>
      )}
      {location.pathname.startsWith("/patient") && (
        <Modal
          title="Alternative Medicines"
          open={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          {alternativesLength > 0 ? (
            alternatives.map((alternative) => (
              <MedicineView key={alternative._id} medicine={alternative} />
            ))
          ) : (
            <p>No alternatives found</p>
          )}
        </Modal>
      )}
      <Card
        style={{
          height: "300px",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 10px",
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
        }}
        cover={
          <img
            alt="example"
            src={`http://localhost:10000/${medicine.image}`}
            style={{ height: "250px", aspectRatio: "1/1" }}
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
                    <strong>Available Quantity: </strong>
                    {medicineQuantity}
                  </p>
                  <p>
                    <strong>Sales: </strong>${medicine.sales}
                  </p>
                </>
              )}
              <p>
                <strong>Price: </strong>${medicinePrice}
              </p>
              <p>
                <strong>Details: </strong>
                {medicineDetails}
              </p>
            </>
          }
        ></Meta>
        <Flex gap={10} vertical>
          {disableButton() === 0 && (
            <Button
              disabled
              type="primary"
              onClick={addToCart}
              loading={isLoading}
              style={{ width: "150px" }}
            >
              Prescription needed
            </Button>
          )}
          {disableButton() === 2 && (
            <Button
              type="primary"
              onClick={addToCart}
              loading={isLoading}
              style={{ width: "150px" }}
            >
              Add to cart
            </Button>
          )}
          {disableButton() === 1 && (
            <>
              <Button
                disabled
                type="primary"
                onClick={addToCart}
                loading={isLoading}
                style={{ width: "150px" }}
              >
                Out of stock!
              </Button>
              <Button
                type="primary"
                onClick={showModal}
                style={{ width: "150px" }}
              >
                Show Alternatives
              </Button>
            </>
          )}
          {location.pathname.startsWith("/pharmacist") && (
            <>
              <Button
                type="primary"
                onClick={showModal}
                style={{ width: "150px" }}
              >
                Edit Medicine
              </Button>
              {medicineArchived ? (
                <Button
                  type="primary"
                  onClick={unarchiveMed}
                  style={{ width: "150px" }}
                >
                  Unarchive Medicine
                </Button>
              ) : (
                <Button
                  type="primary"
                  onClick={archiveMed}
                  style={{ width: "150px" }}
                >
                  Archive Medicine
                </Button>
              )}
            </>
          )}
        </Flex>
      </Card>
    </div>
  );
};

export default MedicineView;
