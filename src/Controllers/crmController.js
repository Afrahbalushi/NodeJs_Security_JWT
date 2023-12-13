import mongoose from "mongoose";
import { ContacSchema } from '../models/crmModels';

const Contact = mongoose.model('Contact', ContacSchema);

export const addNewContact = async (req, res) => {
   
        const newContact = new Contact(req.body);
        const savedContact = await newContact.save();
        res.json(savedContact);
      
};

export const getContacts = async (req, res) => {
       
    const contacts = await Contact.find({});
    res.json(contacts);

};

export const getContactWithID = async(req, res) => {

    const contact = await Contact.findById(req.params.contactId);
    res.json(contact);

};

export const updateContact = async(req, res) => {

    const contact = await Contact.findOneAndUpdate(
        { _id: req.params.contactId },
        req.body,
        { new: true }
         ).exec();
    res.json(contact);

};

export const deleteContact = async (req, res) => {

    await Contact.deleteOne({ _id: req.params.contactId }).exec();
    res.json({ message: 'Successfully Deleted Contact'});

};


