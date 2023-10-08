import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';

const MedicineView = ({ med }) => {

    const [medicineDetails, setMedicineDetails] = useState(med.details);
    const [medicinePrice, setMedicinePrice] = useState(med.price);
    const [medicineDetailsInter, setMedicineDetailsInter] = useState(med.details);
    const [medicinePriceInter, setMedicinePriceInter] = useState(med.price);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setMedicineDetails(medicineDetailsInter);
        setMedicinePrice(medicinePriceInter);

        // update the database
        fetch(`http://localhost:5000/medicine/${med._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                details: medicineDetailsInter,
                price: medicinePriceInter,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to update medicine');
                }
                message.success('Successfully updated medicine');
            })
            .catch((error) => {
                console.error(error);
                message.error('Failed to update medicine');
            });

        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="med-details">
            <Button type="primary" onClick={showModal}>
                Edit Medicine
            </Button>
            <Modal title="Edit Medicine" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText="Save">
                <label>
                    Details:
                    <input value={medicineDetailsInter} type="text" onChange={(e) => {
                        setMedicineDetailsInter(e.target.value);
                    }} />
                </label>
                <label>
                    Price:
                    <input value={medicinePriceInter} type="text" onChange={(e) => {
                        setMedicinePriceInter(e.target.value);
                    }}/>
                </label>
            </Modal>
            <h4>{med.name}</h4>
            <p><strong>available Quantity </strong>{med.availableQuantity}</p>
            <p><strong>sales: </strong>{med.sales}</p>
            <p><strong>price: </strong>{medicinePrice}</p>
            <p><strong>details: </strong>{medicineDetails}</p>
        </div>
    )
}

export default MedicineView;