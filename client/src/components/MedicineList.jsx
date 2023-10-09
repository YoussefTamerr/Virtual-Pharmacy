import { useEffect, useState } from "react";
import MedicineView from "./MedicineView";
import Search from "./Search";

function MedicineList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicine, setMedicine] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = medicine.map((med) => med.category);

  useEffect(() => {
    const fetchData = async () => {
      const query = searchTerm == "" ? "" : "?name=" + searchTerm;
      const response = await fetch(`http://localhost:5000/medicine` + query);
      const data = await response.json();
      if (response.ok) {
        setMedicine(data);
      }
    };
    fetchData();
  }, [searchTerm]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredMedicine = selectedCategory
    ? medicine.filter((med) => med.category === selectedCategory)
    : medicine;

  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <label htmlFor="category">Filter by category:</label>
        <select
          id="category"
          value={selectedCategory}
          onChange={handleCategoryChange}
        >
          <option value="">All</option>
          {Array.from(new Set(categories)).map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {filteredMedicine.map((med) => (
        <MedicineView key={med._id} med={med} />
      ))}
    </>
  );
}

export default MedicineList;
