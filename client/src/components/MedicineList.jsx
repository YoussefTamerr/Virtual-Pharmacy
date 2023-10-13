import { useEffect, useState } from "react";
import MedicineView from "./MedicineView";
import Search from "./Search";

function MedicineList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = medicines.map((medicine) => medicine.category);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:5000/medicine`);
      const data = await response.json();
      if (response.ok) {
        setMedicines(data);
      }
    };
    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  const filteredMedicine = medicines.filter((medicine) => {
    if (selectedCategory && medicine.category !== selectedCategory) {
      return false;
    }
    if (
      searchTerm &&
      !medicine.name.toLowerCase().startsWith(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <>
      <h2>Medicines</h2>
      <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <div>
        <label htmlFor="category">Filter medicines by category:</label>
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
      {filteredMedicine.map((medicine) => (
        <MedicineView key={medicine._id} medicine={medicine} />
      ))}
    </>
  );
}

export default MedicineList;
