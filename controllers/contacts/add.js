const { Contact } = require("../../models/contact");
const { ctrlWrapper } = require("../../helpers");

const add = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
}

module.exports = {
    add: ctrlWrapper(add)
};