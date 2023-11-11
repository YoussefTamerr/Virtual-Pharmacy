import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import BackButton from "./BackButton";
import MedicineList from "./MedicineList";
import DeliveryAddress from "./DeliveryAddress";

function PatientHome() {

  return (
    <>
      <BackButton />
      <h1>Patient Home</h1>
      <DeliveryAddress />
      <MedicineList />

      <Link to="/cart">
        <button>View Cart</button>
      </Link>
    </>
  );
}

export default PatientHome;