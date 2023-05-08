const express = require('express');
const contactsFunctions = require('../../models/contacts');
const router = express.Router();


router.get('/', async (req, res, next) => {
  const allContacts = await contactsFunctions.listContacts();
  res.json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsFunctions.getContactById(req.id);
  res.json(contact);
})

router.post('/', async (req, res, next) => {
  const newContact = await contactsFunctions.addContact(req);
  res.json(newContact);
})

router.delete('/:contactId', async (req, res, next) => {
  const deletedContact = await contactsFunctions.removeContact(req.id);
  res.json(deletedContact);
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
