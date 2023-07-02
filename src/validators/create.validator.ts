import Joi from "joi";

export const createValidator = Joi.object({
    car: Joi.string().trim().required().messages({
        "string.pattern.base": "Company field is required.",
    }),
    car_model: Joi.string().trim().required().messages({
        "string.pattern.base": "Model field is required.",
    }),
    car_color: Joi.string().trim().required().messages({
        "string.pattern.base": "Color field is required.",
    }),
    car_model_year: Joi.number().min(1926).max(new Date().getUTCFullYear()).required().messages({
        "string.pattern.base": `Year field is required. Min year is 1926, Max - current year (${new Date().getUTCFullYear()}).`,
    }),
    car_vin: Joi.string().trim().uppercase().length(17).alphanum().required().messages({
        "string.pattern.base": "VIN field is required. Must contain only (EN) uppercase letters or numbers and have a length of 17 characters (VIN code).",
    }),
    // price: Joi.string().trim().required().messages({
    price: Joi.number().min(0).required().messages({
        "string.pattern.base": "Price field is required.",
    }),
    availability: Joi.boolean().messages({
        "string.pattern.base": "Availability field is required.",
    }),
});