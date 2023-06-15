const { isValidObjectId } = require("mongoose");
const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => { 
    if (!isValidObjectId(req.params.id)) { 
        next(HttpError(404, `${req.params.id} is not valid id`));
    }
    next();
}

module.exports = isValidId