import { BrowserRouter , Route, Routes } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import AdminSignup from "./components/AdminSignup";
import PharmacistSignup from "./components/PharmacistSignup";
import PatientSignup from "./components/PatientSignup";

import MedicineView from "./components/MedicineView";
import PharmacistHome from "./components/PharmacistHome";

function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route 
              path="/" 
              element={<Navigate to="/signup/patient" />} 
            />
            <Route 
              path="/signup/admin" 
              element={<AdminSignup />} 
            />
            <Route 
              path="/signup/pharmacist" 
              element={<PharmacistSignup />} 
            />
            <Route 
              path="/signup/patient" 
              element={<PatientSignup />} 
            />
            <Route 
              path="/pharmacist" 
              element={<PharmacistHome />} 
            />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
