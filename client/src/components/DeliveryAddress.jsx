import { useEffect } from "react";
import { useState } from "react";
import { message, Modal, Button, Select } from "antd";
const { Option } = Select;

function DeliveryAddress() {
  const [deliveryAddressStreet, setDeliveryAddressStreet] = useState("");
  const [deliveryAddressCity, setDeliveryAddressCity] = useState("");
  const [deliveryAddressGovernate, setDeliveryAddressGovernate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState("");

  useEffect(() => {
    const fetchDeliveryAddress = async () => {
      const response = await fetch(
        `http://localhost:5000/patient/delivery/delivery-address`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        data.patient.deliveryAddress.forEach((address) => {
          if (address.is_default) {
            console.log(address.street_address + ", " + address.city + ", " + address.governate);
            setSelectedAddress(
              address.street_address + ", " + address.city + ", " + address.governate
            );
          }
        });
        setAddresses(data.patient.deliveryAddress);
      } else {
        console.error(data.message);
      }
    };
    fetchDeliveryAddress();
  }, []);

  const addDeliveryAddress = async () => {
    const response = await fetch(
      `http://localhost:5000/patient/delivery/delivery-address`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          street_address: deliveryAddressStreet,
          city: deliveryAddressCity,
          governate: deliveryAddressGovernate,
        }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      message.success("Delivery Address added successfully");
      setDeliveryAddressStreet("");
      setDeliveryAddressCity("");
      setDeliveryAddressGovernate("");
      setAddresses(data.patient.deliveryAddress);
    } else {
      message.error("Failed to add delivery address");
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    addDeliveryAddress();
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCategoryChange = async (event) => {
    const response = await fetch(
      `http://localhost:5000/patient/delivery/delivery-address`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          address: event,
        }),
      }
    );
    if (response.ok) {
      setSelectedAddress(event);
      message.success("Updated the default address successfully");
    } else {
      message.error("Failed to update the default address");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      padding: "20px",
      gap: "20px",
    }}>
      {addresses && (
        <Select
          value={selectedAddress}
          onChange={handleCategoryChange}
          style={{ width: 300 }}
        >
          <Option value="" disabled hidden>
            Choose Delivery Address
          </Option>
          {addresses.map((address, index) => (
            <Option
              key={index}
              value={
                address.street_address +
                ", " +
                address.city +
                ", " +
                address.governate
              }
            >
              {address.street_address}, {address.city}, {address.governate}
            </Option>
          ))}
        </Select>
      )}

      <Button type="primary" onClick={showModal}>
        Add Delivery Address
      </Button>
      <Modal
        title="Delivery Address"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <label>
          Street Address:
          <input
            type="text"
            onChange={(e) => {
              setDeliveryAddressStreet(e.target.value);
            }}
          />
        </label>
        <label>
          City:
          <input
            type="text"
            onChange={(e) => {
              setDeliveryAddressCity(e.target.value);
            }}
          />
        </label>
        <label>
          Governate:
          <input
            type="text"
            onChange={(e) => {
              setDeliveryAddressGovernate(e.target.value);
            }}
          />
        </label>
      </Modal>
    </div>
  );
}

export default DeliveryAddress;
