const express = require('express');
const contactsFunctions = require('../../models/contacts');
const router = express.Router();


router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contactsFunctions.listContacts();
    res.json(allContacts);
  } catch (error) { 
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await contactsFunctions.getContactById(req.params.contactId);
    if (!contact) { 
      return res.status(404).json({message: "Not found"})
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }})

router.post('/', async (req, res, next) => {
  try {
    const newContact = await contactsFunctions.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const deletedContact = await contactsFunctions.removeContact(req.params.contactId);
  res.json(deletedContact);
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
