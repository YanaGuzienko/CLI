const yargs = require('yargs');
const functions = require('./contacts');

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      functions.listContacts();
      break;

    case 'get':
      functions.getContactById(id);
      break;

    case 'add':
      functions.addContact(name, email, phone);
      break;

    case 'remove':
      functions.removeContact(id);
      break;

    default:
      console.warn('\x1B[31m Unknown action type!');
  }
}

const argv = yargs.number('id').string('name').string('email').string('phone').argv;

const { id, name, email, phone } = argv;

invokeAction(argv);
