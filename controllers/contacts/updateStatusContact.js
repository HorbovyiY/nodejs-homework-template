const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const updateStatusContact = async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updatedContact) {
        throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
}

module.exports = {
    updateStatusContact: ctrlWrapper(updateStatusContact)
}