const express = require('express');
const contactsFunctions = require('../../models/contacts');
const router = express.Router();
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(), 
  phone: Joi.string().required(),
})


router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contactsFunctions.listContacts();
    res.status(200).json(allContacts);
  } catch (error) { 
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await contactsFunctions.getContactById(req.params.id);
    if (!contact) { 
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) { 
      throw HttpError(400, "missing required name field");
    }

    const newContact = await contactsFunctions.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  const deletedContact = await contactsFunctions.removeContact(req.params.id);
  res.json(deletedContact);
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) { 
      throw HttpError(400, "missing required name field");
    }
    
    const updatedContact = await contactsFunctions.updateContact(req.params.id, req.body);
    if (!updatedContact) { throw HttpError(404, "Not Found");}

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
})

module.exports = router
