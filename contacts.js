const fs = require('fs').promises;
const shortid = require('shortid');

const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
async function listContacts() {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(response);
    console.table(contacts);
  } catch (error) {
    console.log(error);
  }
}

async function getContactById(contactId) {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(response);
    const contactById = contacts.find((item) => item.id === contactId);
    console.log(contactById);
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const response = await fs.readFile(contactsPath, 'utf-8');
    let contacts = JSON.parse(response);
    const correctId = contacts.findIndex((item) => item.id === contactId);
    if (correctId === -1) {
      console.log('Id is not correct');
    } else {
      const deleteContact = contacts.filter((item) => item.id !== contactId);
      let newContacts = JSON.stringify(deleteContact);
      await fs.writeFile(contactsPath, newContacts);
      listContacts();
    }
  } catch (error) {
    console.log(error);
  }
}

async function addContact(name, email, phone) {
  const contact = { id: shortid.generate(), name, email, phone };
  try {
    const response = await fs.readFile(contactsPath);
    const contacts = JSON.parse(response);
    let newContact = JSON.stringify([...contacts, contact]);

    const newContactsArr = await fs.writeFile(contactsPath, newContact);

    listContacts();
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
