import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';

const PharmacistView = ({ pharma }) => {

    const removePharma = async (event) => {
        event.preventDefault();
        const response = await fetch(`http://localhost:5000/pharmacist/${pharma._id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        if (response.ok) {
            message.success('Pharmacist removed successfully');
        } else {
            message.error(data.message);
        }
    }


    return (
        <div className="pharma-details">
            {
                (pharma.registrationApproval === "approved") &&

                <Button type="primary" onClick={removePharma}>
                    Remove Pharmacist
                </Button>
            }
            
            
            <h4>{pharma.name}</h4>
            <p><strong>Username: </strong>{pharma.username}</p>
            <p><strong>email: </strong>{pharma.email}</p>
            <p><strong>dateOfBirth: </strong>{pharma.dateOfBirth}</p>
            <p><strong>hourlyRate: </strong>{pharma.hourlyRate}</p>
            <p><strong>affiliation: </strong>{pharma.affiliation}</p>
            <p><strong>educationalBackground: </strong>{pharma.educationalBackground}</p>
        </div>
    )
}

export default PharmacistView;