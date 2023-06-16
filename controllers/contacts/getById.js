const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const getById = async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) { 
            throw HttpError(404, "Not Found");
        }
        res.status(200).json(contact);
}

module.exports = {
    getById: ctrlWrapper(getById)
};