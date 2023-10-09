import { useEffect, useState } from "react";
import MedicineView from "./MedicineView";
import Search from "./Search";

function MedicineList() {
  const [searchTerm, setSearchTerm] = useState("");
  const [medicine, setMedicine] = useState([]);
  useEffect(() => {
    const query = (searchTerm=='' ? '':'?name=' + searchTerm)
    const response = await fetch(`http://localhost:5000/medicine` + query);
    const data = await response.json();
    if (response.ok) {
      setMedicine(data);
    }
  }, [searchTerm]);
  
  return (
    <>
      <Search searchTerm={searchTerm} setSearchTerm ={setSearchTerm}/>
      {medicine.map((med) => (
        <MedicineView key={med._id} med={med} />
      ))}
    </>
  );
}
