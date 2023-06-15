const express = require('express');
const { Contact, shemas } = require("../../models/contact");
const router = express.Router();
const { HttpError } = require("../../helpers");




router.get('/', async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.status(200).json(allContacts);
  } catch (error) { 
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) { 
      throw HttpError(404, "Not Found");
    }
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }})

router.post('/', async (req, res, next) => {
  try {
    const { error } = shemas.addSchema.validate(req.body);
    if (error) { 
      throw HttpError(400, "missing required name field");
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
})

// router.delete('/:id', async (req, res, next) => {
//   try {
//     const deletedContact = await contactsFunctions.removeContact(req.params.id);
//     if (!deletedContact) { throw HttpError(404, "Not Found");}
//     res.status(200).json({message: "contact deleted"});
//   } catch (error) {
//     next(error);
//   }
// })

// router.put('/:id', async (req, res, next) => {
//   try {
//     const { error } = shemas.addSchema.validate(req.body);
//     if (error) { 
//       throw HttpError(400, "missing fields");
//     }
    
//     const updatedContact = await contactsFunctions.updateContact(req.params.id, req.body);
//     if (!updatedContact) { throw HttpError(404, "Not Found");}
//     res.status(200).json(updatedContact);
//   } catch (error) { 
//     next(error);
//   }
// })

module.exports = router
