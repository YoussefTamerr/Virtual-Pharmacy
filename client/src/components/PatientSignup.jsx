import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    emergencyContact: {
      fullName: "",
      mobileNumber: "",
      relation: "",
    },
  });
  const [message, setMessage] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleEmergencyContactChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      emergencyContact: {
        ...prevState.emergencyContact,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/patient`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setMessage("Registration successful");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        gender: "",
        mobileNumber: "",
        emergencyContact: {
          fullName: "",
          mobileNumber: "",
          relation: "",
        },
      });
      setTimeout(() => {
        navigate("/patient");
      }, 2000);
    } else {
      setMessage(data.message);
    }
  };

  return (
    <>
      <h1>Patient Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Gender:
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </label>
        <br />
        <label>
          Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.mobileNumber}
            onChange={handleChange}
          />
        </label>
        <br />
        <label>
          Emergency Contact Full Name:
          <input
            type="text"
            name="fullName"
            value={formData.emergencyContact.fullName}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <br />
        <label>
          Emergency Contact Mobile Number:
          <input
            type="tel"
            name="mobileNumber"
            value={formData.emergencyContact.mobileNumber}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <br />
        <label>
          Emergency Contact Relation:
          <input
            type="text"
            name="relation"
            value={formData.emergencyContact.relation}
            onChange={handleEmergencyContactChange}
          />
        </label>
        <br />
        <button type="submit">Submit</button>
        {message && <p>{message}</p>}
      </form>

      <a href="/signup/pharmacist">Want to register as a Pharmacist ?</a>
    </>
  );
}

export default Signup;
