const asyncHandler = require("express-async-handler");
//@desc get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req,res)=> {
    res.status(200).json({message:"get all contacts"});
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
    res.status(201).json({message:"create all contacts"});
});

//@desc get contacts with id
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req,res)=> {
    // res.status(200).json({message:"get all contacts"});
    res.send(`get all cpntacts ${req.params.id}`);
});


//@desc update contacts with id
//@route put /api/contacts/:id
//@access public
const updateContact = asyncHandler(async(req,res)=> {
    res.status(200).json({message:`update contacts ${req.params.id}`});
});

//@desc delete contacts with id
//@route DELETE /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async(req,res)=> {
    res.status(200).json({message:`delete contacts ${req.params.id}`});
});


module.exports = {getContacts,createContact,getContact,updateContact,deleteContact};