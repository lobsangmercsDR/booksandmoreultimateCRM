const joi = require('joi');


const registerValidation = (data) => {
    const schema = joi.object({
        names: joi.string().required(),
        lastnames: joi.string().required(),
        email: joi.string().email().required(),
        phone_number: joi.string().required(),
        delivery_address: joi.string().required(),
        password: joi.string().min(6).required(),
        role: joi.string().required()
    });

    return schema.validate(data);
};

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().min(6).required()
    });

    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
};
