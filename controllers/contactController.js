const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const expressAsyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res)=> {
    const conatcts = await Contact.findById(req.params.id);
    if(!conatcts){
        res.status(400);
    }
    res.status(200).json(conatcts);
});

//@desc create all contacts
//@route post /api/contacts
//@access public
const createContact = asyncHandler(async (req,res)=> {
    console.log(req.body);
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("all fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
});

//@desc get contacts with id
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contacts not found");
    }
    res.status(200).json(contact);
});


//@desc update contacts with id
//@route put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contacts not found");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.status(200).json(updatedContact);
});

//@desc delete contacts with id
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contacts not found");
    }
    await Contact.remove();
    res.status(200).json({message:`delete contacts ${req.params.id}`});
});


module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};