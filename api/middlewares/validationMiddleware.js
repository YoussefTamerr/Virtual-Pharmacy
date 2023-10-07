import joi from "joi";
import AppError from "../utils/errorFactory.js";

const patientSchema = joi.object({
    username: joi.string().alphanum().min(3).max(30).required(),
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().alphanum().min(6).required(),
    dateOfBirth: joi.date().required(),
    gender: joi.string().valid('male').valid('female').required(),
    mobileNumber: joi.string().pattern(/^[0-9\s()+-]+$/).required(),
    emergencyContact: {
        fullName: joi.string().required(),
        mobileNumber: joi.string().pattern(/^[0-9\s()+-]+$/).required(),
        relation: joi.string().required(),
    },
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
    registrationApproval: joi.string().valid('pending').valid('denied').valid('approved').required(),
});

const validateBody = (schema) => {
    return (req, res, next) => {
      const { error } = schema.validate(req.body, { abortEarly: false });
      const valid = error == null;
  
      if (!valid) {
        next(new AppError(400, error.message));
      }
  
      next();
    };
};

export {
    patientSchema,
    pharmacistSchema,
    validateBody,
};
