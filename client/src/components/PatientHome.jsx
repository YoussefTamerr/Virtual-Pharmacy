import React from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import MedicineList from "./MedicineList";

function PatientHome() {
  return (
    <>
      <BackButton />
      <h1>Patient Home</h1>
      <MedicineList />

      <Link to="/cart">
        <button>View Cart</button>
      </Link>
    </>
  );
}

export default PatientHome;