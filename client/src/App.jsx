import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import PatientSignup from "./components/PatientSignup";
import PharmacistSignup from "./components/PharmacistSignup";
import CartView from "./components/CartView";
import MedicineForm from "./components/MedicineForm";
import AdminForm from "./components/AdminForm";
import PatientList from "./components/PatientList";
import PharmacistList from "./components/PharmacistList";
import AppLayout from "./components/AppLayout";
import AuthLayout from "./components/AuthLayout";
import MedicineList from "./components/MedicineList";
import OrderList from "./components/OrderList";
import PrescriptionList from "./components/PrescriptionList";
import ChangePassword from "./components/ChangePassword";
import ForgotPassword from "./components/ForgotPassword";

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
          <Route
            path="/change-password/:userId/:resetToken"
            element={<ChangePassword />}
          />
          <Route path="/forgot-password/*" element={<ForgotPassword />} />
        </Route>

        <Route element={<AppLayout />}>
          <Route path="/patient">
            <Route index element={<Navigate to={"/patient/medicines"} />} />
            <Route path="cart" element={<CartView />} />
            <Route path="orders" element={<OrderList />} />
            <Route path="medicines" element={<MedicineList />} />
            <Route path="change-password" element={<ChangePassword />} />
            <Route path="prescriptions" element={<PrescriptionList />} />
          </Route>
          <Route path="/pharmacist">
            <Route index element={<Navigate to={"/pharmacist/add"} />} />
            <Route path="add" element={<MedicineForm />} />
            <Route path="medicines" element={<MedicineList />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
          <Route path="/admin">
            <Route index element={<Navigate to={"/admin/add"} />} />
            <Route path="add" element={<AdminForm />} />
            <Route path="patients" element={<PatientList />} />
            <Route path="pharmacists" element={<PharmacistList />} />
            <Route path="medicines" element={<MedicineList />} />
            <Route path="change-password" element={<ChangePassword />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
