const { HttpError } = require("../helpers");
const { schemas } = require("../models");

const validateBody = schema => { 
    const func = (req, res, next) => {
        const { error } = schemas.addSchema.validate(req.body);
        if (error) { 
            next(HttpError(400, "missing required name field"));
        }
        next();
    }
    return func;
}

module.exports = validateBody;