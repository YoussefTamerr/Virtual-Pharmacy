import { useEffect, useState } from "react";
import MedicineView from "./MedicineView";
import Spinner from "./Spinner";
import { Flex, Select, Input } from "antd";
import { useLocation } from "react-router-dom";

const { Option } = Select;
const { Search } = Input;

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
    setSelectedCategory(event);
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

  const handleSearch = (value) => {
    setSearchTerm(value);
  };

  return (
    <>
      <h2>Medicines</h2>
      <Flex gap={10}>
        <Search
          placeholder="Search by medicine name"
          allowClear
          onSearch={handleSearch}
          style={{ width: "20%", marginBottom: "20px", flexGrow: 1 }}
        />
        <Select
          value={selectedCategory}
          onChange={handleCategoryChange}
          style={{ marginBottom: "20px", width: "130px" }}
        >
          <Option value="">All Categories</Option>
          {Array.from(new Set(categories)).map((category) => (
            <Option key={category} value={category}>
              {category}
            </Option>
          ))}
        </Select>
      </Flex>
      <Flex
        wrap="wrap"
        justify="start"
        align="center"
        gap={20}
        style={{ padding: "20px" }}
      >
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
