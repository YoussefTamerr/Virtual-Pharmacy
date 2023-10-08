const MedicineView = ({ med }) => {



    return (
        <div className="med-details">
            <h4>{med.name}</h4>
            <p><strong>available Quantity </strong>{med.availableQuantity}</p>
            <p><strong>sales: </strong>{med.sales}</p>
        </div>
    )
}

export default MedicineView;