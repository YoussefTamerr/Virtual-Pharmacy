import React, { useEffect, useState } from 'react';
import { message } from 'antd';
import PharmacistView from './PharmacistView';


function AdminFunctions() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const [pharmacistView, setPharmacistView] = useState(null);
    const [pharmacistData, setPharmacistData] = useState({ 
        username: "",
        name: "",
        email: "",
        password:"",
        dateOfBirth: "",
        hourlyRate: 0,
        affiliation: "",
        educationalBackground: "",
        registrationApproval: "",
    });

    const handleSubmit = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/admin`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
        }),
        });
        const data = await response.json();
        if (response.ok) {
            message.success('Admin created successfully');
            setUsername("");
            setPassword("");
        } else {
            message.error(data.message);
        }
    };

    useEffect(() => {
        const getPharmacistData = async () => {
            const response = await fetch(`http://localhost:5000/pharmacist`);
            const data = await response.json();
            if (response.ok) {
                setPharmacistView(data);
                setError(false);
            } else {
                setError(true);
            }
        };
        getPharmacistData();
    }, []);
        

    return (
        <>
            <div className="home">
                <div className="medInfo">
                    <p>Approved Pharmacists</p>
                    {pharmacistView && pharmacistView
                        .filter((pharma) => pharma.registrationApproval === "approved")
                        .map((pharma) => (
                            <PharmacistView key={pharma._id} pharma={pharma} />
                        ))
                    }
                </div>
                <div className="medInfo">
                    <p>Pending Pharmacists</p>
                    {pharmacistView && pharmacistView
                        .filter((pharma) => pharma.registrationApproval === "pending")
                        .map((pharma) => (
                            <PharmacistView key={pharma._id} pharma={pharma} />
                        ))
                    }
                </div>
            </div>


            <form onSubmit={handleSubmit}>
                <label>
                    Username:
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                </label>
                <label>
                    Password:
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </>
    );
}

export default AdminFunctions;