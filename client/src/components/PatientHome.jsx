import { useState } from "react";
import MedicineView from "./MedicineView";


function PatientHome() {


const [searchTerm, setSearchTerm] = useState('')
const handleClick = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/medicine`);
    const data = await response.json();
    if (response.ok) {
        setMedicineView(data);
        setError(false);
    } else {
        setError(true);
    }
};
useEffect(() => {
        if (doctors) {
            const today = new Date()
            today.setHours(0, 0, 0, 0)
            setFilteredDoctors(
                doctors.filter(
                    (doctor) =>
                        findIntersection(
                            searchTerm.split(' '),
                        )||
                        findIntersection(
                            searchTerm.split(' '),
                        )||
                        searchTerm === ''
                )
            )
            console.log(searchTerm.split(' '), doctors)
            setCurrentPage(1)
        }
    }, [searchTerm, doctors])
    return(
        <Search onSearch={onSearch} />
    )
}