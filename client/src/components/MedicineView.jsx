import { Button, Modal, message, Card } from "antd";
import { useState, useEffect } from "react";
const { Meta } = Card;


const MedicineView = ({ medicine }) => {
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

  const [imageSrc, setImageSrc] = useState('');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch(`http://localhost:5000/images/medicines/${medicine.name}.png`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        });
        if (!response.ok) {
          setImageSrc('');
        }else{
          const blob = await response.blob();
          const url = URL.createObjectURL(blob);
          setImageSrc(url);
        }
        
      } catch (error) {
        console.error(error);
      }
    };
    fetchImages();
  }, []);

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

  const addToCart = () => {
    fetch(`http://localhost:5000/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        medicine_id: medicine._id,
        quantity: 1,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add medicine to cart");
        }
        message.success("Successfully added medicine");
      })
      .catch((error) => {
        console.error(error);
        message.error("Failed to add medicine");
      });
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
      <div style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        <Card
          style={{
            width: 300,
            marginTop: 16,
            gap: "small",
            display: "flex",
            flexDirection: "column",
            border: "2px solid grey",
          }}
          cover={imageSrc && <img style={{width: 295}} alt="example" src={imageSrc} />}
        >
          <Meta title={medicine.name} description={
            <>
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
            </>
          }/>
          
        </Card>
        <br />
        <div style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        
        }}>
          {window.location.pathname == "/pharmacist" && (
            <Button type="primary" onClick={showModal}>
              Edit Medicine
            </Button>
          )}
          {window.location.pathname == "/patient" && (
            <Button type="primary" onClick={addToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>      
    </div>
  );
};

export default MedicineView;
