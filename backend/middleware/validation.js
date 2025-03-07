const Joi = require('joi');

const registerValidation = (req, res, next) => {
    const schema = Joi.object({
        username: Joi.string().min(6).max(100).required(),
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    next();
}

const loginValidation = (req, res, next) => {
    const schema = Joi.object({
        email: Joi.string().min(6).required().email(),
        password: Joi.string().min(6).max(100).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    next();
}

module.exports = { registerValidation, loginValidation };
