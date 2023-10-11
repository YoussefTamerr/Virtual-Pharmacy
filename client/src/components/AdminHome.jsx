import AdminForm from "./AdminForm";
import PatientList from "./PatientList";
import PharmacistList from "./PharmacistList";

function AdminHome() {
  return (
    <>
      <h1>Admin Dashboard</h1>
      <AdminForm />
      <PatientList />
      <PharmacistList />
    </>
  );
}

export default AdminHome;
