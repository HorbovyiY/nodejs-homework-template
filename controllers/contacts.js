const { Contact} = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
        const allContacts = await Contact.find();
        res.status(200).json(allContacts);
}

const getById = async (req, res) => {
        const contact = await Contact.findById(req.params.id);
        if (!contact) { 
            throw HttpError(404, "Not Found");
        }
        res.status(200).json(contact);
}
    
const add = async (req, res) => {
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
}

const deleteById = async (req, res) => {
    const deletedContact = await Contact.findByIdAndRemove(req.params.id);
    if (!deletedContact) { throw HttpError(404, "Not Found");}
    res.status(200).json({message: "contact deleted"});
}

const updateById = async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updatedContact) {
        throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
}

const updateFavorite = async (req, res) => {
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if (!updatedContact) {
        throw HttpError(404, "Not Found");
    }
    res.status(200).json(updatedContact);
}

module.exports = {
    getAll: ctrlWrapper(getAll),
    getById: ctrlWrapper(getById),
    add: ctrlWrapper(add),
    deleteById: ctrlWrapper(deleteById),
    updateById: ctrlWrapper(updateById),
    updateFavorite: ctrlWrapper(updateFavorite),
}