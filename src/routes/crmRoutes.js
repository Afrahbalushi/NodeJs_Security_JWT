import { addNewContact, getContacts, getContactWithID, updateContact, deleteContact } from "../Controllers/crmController";
import { login, register, loginRequired } from '../Controllers/userController'

const routes = (app) => {
    app.route('/contact')

//get all contacts
    .get((req, res, next) => {
   //middleware
   console.log(`Request from: ${req.originalUrl}`)
   console.log(`Request type: ${req.method}`)
   next();
}, loginRequired, getContacts)

//post new contact
    .post(loginRequired, addNewContact); 

    app.route('/contact/:contactId')
//get specific contact
    .get(loginRequired, getContactWithID)

//update contact
    .put(loginRequired, updateContact)

//delete contact
    .delete(loginRequired, deleteContact) 

//registration route
app.route('/auth/register')
.post(register);

//login route
  app.route('/login')
    .post(login);

}


export default routes;