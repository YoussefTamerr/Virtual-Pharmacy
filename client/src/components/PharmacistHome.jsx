import { useState } from "react";
import MedicineList from "./MedicineList";

function PharmacistHome() {
  const [medicineData, setMedicineData] = useState({
    name: "",
    price: "",
    availableQuantity: "",
    sales: 0,
    details: "",
    picture: "placeholder",
    category: "",
  });
  const [message, setMessage] = useState(null);
  const [key, setKey] = useState(0);

  const handleClick = async (event) => {
    event.preventDefault();
    setKey(key + 1);
  };

  const handleSubmitMedicine = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/medicine`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(medicineData),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Medicine added successfully");
      setMedicineData({
        name: "",
        price: "",
        availableQuantity: "",
        sales: 0,
        details: "",
        picture: "placeholder",
        category: "",
      });
      handleClick(event);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <>
      <h1>Pharmacist Home</h1>
      <form onSubmit={handleSubmitMedicine}>
        <label>
          Name:
          <input
            type="text"
            value={medicineData.name}
            onChange={(e) =>
              setMedicineData({ ...medicineData, name: e.target.value })
            }
          />
        </label>
        <label>
          price:
          <input
            type="number"
            value={medicineData.price}
            onChange={(e) =>
              setMedicineData({ ...medicineData, price: e.target.value })
            }
          />
        </label>
        <label>
          Available Quantity:
          <input
            type="number"
            value={medicineData.availableQuantity}
            onChange={(e) =>
              setMedicineData({
                ...medicineData,
                availableQuantity: e.target.value,
              })
            }
          />
        </label>
        <label>
          details:
          <input
            type="text"
            value={medicineData.details}
            onChange={(e) =>
              setMedicineData({ ...medicineData, details: e.target.value })
            }
          />
        </label>
        <label>
          category:
          <input
            type="text"
            value={medicineData.category}
            onChange={(e) =>
              setMedicineData({ ...medicineData, category: e.target.value })
            }
          />
        </label>
        <button type="submit">Add Medicine</button>
        {message && <p>{message}</p>}
      </form>

      <MedicineList key={key} />
    </>
  );
}

export default PharmacistHome;
