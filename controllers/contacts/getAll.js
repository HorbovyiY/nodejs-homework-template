const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
        const allContacts = await Contact.find();
        res.status(200).json(allContacts);
}

module.exports = {
        getAll: ctrlWrapper(getAll),
};