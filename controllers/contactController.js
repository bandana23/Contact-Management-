const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const expressAsyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req,res)=> {
    const conatcts = await Contact.find({ user_id: req.user.id });
    if(!conatcts){
        res.status(400);
    }
    res.status(200).json(conatcts);
});

//@desc create all contacts
//@route post /api/contacts
//@access private
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
        user_id:req.user.id
    });
    res.status(201).json(contact);
});

//@desc get contacts with id
//@route GET /api/contacts/:id
//@access private
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
//@access private
const updateContact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contacts not found");
    }
    if(conatct.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to update other user conatcts");
    }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.status(200).json(updatedContact);
});

//@desc delete contacts with id
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async(req,res)=> {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("contacts not found");
    }
    if(conatct.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User dont have permission to delete other user conatcts");
    }
    await Contact.deleteOne({_id:req.params.id});
    res.status(200).json({message:`delete contacts ${req.params.id}`});
});


module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};