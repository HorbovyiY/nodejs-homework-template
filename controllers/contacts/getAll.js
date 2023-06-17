const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const getAll = async (req, res) => {
        const { _id: owner } = req.user; 
        const allContacts = await Contact.find({owner}).populate("owner");
        res.status(200).json(allContacts);
}

module.exports = {
        getAll: ctrlWrapper(getAll),
};