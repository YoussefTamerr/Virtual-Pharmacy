import { useEffect, useState } from "react";
import MedicineView from "./MedicineView";
import Search from "./Search";
import Spinner from "./Spinner";
import { Flex } from "antd";
import { useLocation } from "react-router-dom";

function MedicineList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicines, setMedicines] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const categories = medicines.map((medicine) => medicine.category);
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(`http://localhost:10000/medicine`, {
        credentials: "include",
      });
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
    if (medicine.archived && location.pathname.startsWith("/patient")) {
      return false;
    }
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

  if (medicines.length === 0) {
    return <Spinner />;
  }

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
      <Flex wrap="wrap" justify="center" align="end" gap={10}>
        {filteredMedicine.map((medicine) => (
          <MedicineView
            key={medicine._id}
            medicine={medicine}
            alternatives={medicines.filter(
              (m) => m.details === medicine.details && m._id !== medicine._id
            )}
          />
        ))}
      </Flex>
    </>
  );
}

export default MedicineList;
