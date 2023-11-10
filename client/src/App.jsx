import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import Login from "./components/Login";
import AuthLayout from "./components/AuthLayout";
import PatientSignup from "./components/PatientSignup";
import PharmacistSignup from "./components/PharmacistSignup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<h1>HOME</h1>} />
        <Route path="/" element={<AuthLayout />}>
          <Route index element={<Navigate to={"/login"} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Navigate to={"/signup/patient"} />} />
          <Route path="/signup/patient" element={<PatientSignup />} />
          <Route path="/signup/pharmacist" element={<PharmacistSignup />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
