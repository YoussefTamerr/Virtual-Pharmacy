import AdminForm from "./AdminForm";
import PatientList from "./PatientList";
import PharmacistList from "./PharmacistList";
import MedicineList from "./MedicineList";

function AdminHome() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <AdminForm />
      <PatientList />
      <PharmacistList />
      <MedicineList />
    </>
  );
}

export default AdminHome;
