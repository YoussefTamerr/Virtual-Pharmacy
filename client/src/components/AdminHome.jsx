import AdminForm from "./AdminForm";
import PatientList from "./PatientList";
import PharmacistList from "./PharmacistList";
import MedicineList from "./MedicineList";
import BackButton from "./BackButton";

function AdminHome() {
  return (
    <>
      <BackButton />
      <h1>Admin Dashboard</h1>
      <AdminForm />
      <PatientList />
      <PharmacistList />
      <MedicineList />
    </>
  );
}

export default AdminHome;
