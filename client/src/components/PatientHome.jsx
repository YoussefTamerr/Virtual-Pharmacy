import { Link } from "react-router-dom";
import MedicineList from "./MedicineList";
import DeliveryAddress from "./DeliveryAddress";

function PatientHome() {
  return (
    <>
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
