import { useState } from "react";

function AdminSignup() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/admin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    if (response.ok) {
      setMessage("Admin created successfully");
      setFormData({ username: "", password: "" });
    } else {
      setMessage(data.message);
    }
  };

  return (
    <>
      <h1>Admin Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={formData.password}
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
          />
        </label>
        <button type="submit">Create Admin</button>
        {message && <p>{message}</p>}
      </form>
    </>
  );
}

export default AdminSignup;
