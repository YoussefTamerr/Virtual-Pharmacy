import { BrowserRouter, Route, Routes } from "react-router-dom";

import PharmacistSignup from "./components/PharmacistSignup";
import PatientSignup from "./components/PatientSignup";

import Home from "./components/Home";
import PharmacistHome from "./components/PharmacistHome";
import PatientHome from "./components/PatientHome";
import AdminHome from "./components/AdminHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup/pharmacist" element={<PharmacistSignup />} />
        <Route path="/signup/patient" element={<PatientSignup />} />
        <Route path="/pharmacist" element={<PharmacistHome />} />
        <Route path="/patient" element={<PatientHome />} />
        <Route path="/admin" element={<AdminHome />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
