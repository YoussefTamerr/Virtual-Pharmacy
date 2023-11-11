import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import AuthLayout from "./components/AuthLayout";
import PatientSignup from "./components/PatientSignup";
import PharmacistSignup from "./components/PharmacistSignup";
import CartView from "./components/CartView";
import PatientHome from "./components/PatientHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/patient" element={<PatientHome />} />

        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to={"/signup/patient"} />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/pharmacist" element={<PharmacistSignup />} />
        </Route>
        <Route path="/cart" element={<CartView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
