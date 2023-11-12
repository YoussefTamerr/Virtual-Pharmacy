import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import PatientSignup from "./components/PatientSignup";
import PharmacistSignup from "./components/PharmacistSignup";
import CartView from "./components/CartView";
import PatientHome from "./components/PatientHome";
import AdminForm from "./components/AdminForm";
import PatientList from "./components/PatientList";
import PharmacistList from "./components/PharmacistList";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import MedicineList from "./components/MedicineList";
import PharmacistHome from "./components/PharmacistHome";
import OrderList from "./components/OrderList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to={"/signup/patient"} />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/pharmacist" element={<PharmacistSignup />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/patient">
            <Route index element={<Navigate to={"/patient/home"} />} />
            <Route path="home" element={<PatientHome />} />
            <Route path="cart" element={<CartView />} />
            <Route path="orders" element={<OrderList />} />
          </Route>
          <Route path="/pharmacist">
            <Route index element={<Navigate to={"/pharmacist/home"} />} />
            <Route path="home" element={<PharmacistHome />} />
          </Route>
          <Route path="/admin">
            <Route index element={<Navigate to={"/admin/home"} />} />
            <Route path="home" element={<AdminForm />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="pharmacists" element={<PharmacistList />} />
            <Route path="medicines" element={<MedicineList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
