import joi from "joi";

const patientSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).required(),
  birthdate: joi.date().required(),
  gender: joi.string().valid("male").valid("female").required(),
  phoneNumber: joi
    .string()
    .pattern(/^[0-9\s()+-]+$/)
    .required(),
  emergencyName: joi.string().required(),
  emergencyPhoneNumber: joi
      .string()
      .pattern(/^[0-9\s()+-]+$/)
      .required(),
  emergencyRelation: joi.string().required(),
  nid: joi.string().required(),
});

const pharmacistSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  name: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).required(),
  dateOfBirth: joi.date().required(),
  hourlyRate: joi.number().required(),
  affiliation: joi.string().required(),
  educationalBackground: joi.string().required(),
  registrationApproval: joi
    .string()
    .valid("pending")
    .valid("denied")
    .valid("approved"),
  pharmacyDegree: joi.string().required(),
  workingLicense: joi.string().required(),
  nationalId: joi.string().required(),
});

const adminSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  email: joi.string().email().required(),
  password: joi.string().alphanum().min(6).required(),
});

const medicineSchema = joi.object({
  name: joi.string().required(),
  price: joi.number().required(),
  availableQuantity: joi.number().required(),
  sales: joi.number().required(),
  details: joi.string().required(),
  image: joi.string().required(),
  category: joi.string().required(),
  medType: joi.string().valid("countertop").valid("prescription").required(),
});

const validateBody = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });
    const valid = error == null;

    if (!valid) {
      return res.status(400).json({ message: error.message });
    }

    next();
  };
};

const loginSchema = joi.object({
  username: joi.string().alphanum().min(3).max(30).required(),
  password: joi.string().alphanum().min(6).required(),
});

export {
  patientSchema,
  pharmacistSchema,
  adminSchema,
  medicineSchema,
  loginSchema,
  validateBody,
};
