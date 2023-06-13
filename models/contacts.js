const fs = require('fs/promises');
const path = require('path');
const {nanoid} = require("nanoid");
const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
    const list = await fs.readFile(contactsPath);
    return JSON.parse(list);
}

const getContactById = async (contactId) => {
    const list = await listContacts();
    const contact = list.find(item => item.id === contactId);
    return contact || null;
}

const removeContact = async (contactId) => {
    const list = await listContacts();
    const index = list.findIndex(item => item.id === contactId);
    if (index === -1) { 
        return null;
    }
    const [result] = list.splice(index, 1);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return result;
}

const addContact = async (body) => {
    const list = await listContacts();
    const newContact = {
        id: nanoid(),
        ...body
    }
    list.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
    return newContact;
}

const updateContact = async (id, body) => {
  const list = await listContacts();
  const index = list.findIndex(item => item.id === id);
  if (index === -1) { return null; }
  list[index] = { id, ...body };
  await fs.writeFile(contactsPath, JSON.stringify(list, null, 2));
  return list[index];
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
