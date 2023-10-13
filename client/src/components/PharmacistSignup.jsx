import { useState } from "react";
import BackButton from "./BackButton";

const PharmacistSignup = () => {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    dateOfBirth: "",
    hourlyRate: "",
    affiliation: "",
    educationalBackground: "",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/pharmacist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Request submitted successfully");
      setFormData({
        username: "",
        name: "",
        email: "",
        password: "",
        dateOfBirth: "",
        hourlyRate: "",
        affiliation: "",
        educationalBackground: "",
      });
    } else {
      setMessage(data.message);
    }
  };

  return (
    <>
      <BackButton />
      <h1>Pharmacist Registration Form</h1>
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
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <label>
          Date of Birth:
          <input
            type="date"
            name="dateOfBirth"
            value={formData.dateOfBirth}
            onChange={handleChange}
          />
        </label>
        <label>
          Hourly Rate:
          <input
            type="number"
            name="hourlyRate"
            value={formData.hourlyRate}
            onChange={handleChange}
          />
        </label>
        <label>
          Affiliation:
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleChange}
          />
        </label>
        <label>
          Educational Background:
          <input
            type="text"
            name="educationalBackground"
            value={formData.educationalBackground}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign Up</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
};

export default PharmacistSignup;
