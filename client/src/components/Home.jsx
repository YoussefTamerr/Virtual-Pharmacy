import React from 'react';

function Home() {
    return (
        <div>
            <a href="/patient">Patient's Home</a>
            <br />
            <a href="/admin">Admin's Home</a>
            <br />
            <a href="/pharmacist">Pharmacist's Home</a>
            <br />
            <a href="/signup/patient">Register</a>
        </div>
    );
}

export default Home;
