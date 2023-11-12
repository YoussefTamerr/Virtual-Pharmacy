import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import Layout from "./components/Layout";
import PatientSignup from "./components/PatientSignup";
import PharmacistSignup from "./components/PharmacistSignup";
import CartView from "./components/CartView";
import PatientHome from "./components/PatientHome";
import AdminForm from "./components/AdminForm";
import PatientList from "./components/PatientList";
import PharmacistList from "./components/PharmacistList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to={"/signup/patient"} />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/pharmacist" element={<PharmacistSignup />} />
          <Route path="/admin" element={<AdminForm />} />
          <Route path="/patient/list" element={<PatientList />} />
          <Route path="/pharmacist/list" element={<PharmacistList />} />
        </Route>
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/cart" element={<CartView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
