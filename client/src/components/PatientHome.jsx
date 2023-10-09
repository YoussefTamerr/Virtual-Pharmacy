import { useState } from "react";
import MedicineView from "./MedicineView";
import MedicineList from "./MedicineList";

function PatientHome() {
  return (
    <>
      <h1>Patient Home</h1>
      <MedicineList />
    </>
  );
}

export default PatientHome;
