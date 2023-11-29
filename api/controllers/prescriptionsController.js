import Prescription from "../models/prescriptionsModel.js";


const getPrescriptions = async (req, res) => {
    try {
        const prescriptions = await Prescription.find({ patient_id: req.user._id })
            .populate('medications.medicine_id')
        res.status(200).json({ prescriptions });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

export { getPrescriptions };