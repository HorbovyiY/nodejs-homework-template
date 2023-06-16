const { Contact } = require("../../models/contact");
const { HttpError, ctrlWrapper } = require("../../helpers");

const deleteById = async (req, res) => {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    if (!deletedContact) { throw HttpError(404, "Not Found");}
    res.status(200).json({message: "contact deleted"});
}

module.exports = {
    deleteById: ctrlWrapper(deleteById)
}