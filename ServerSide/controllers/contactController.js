const Contact = require("../models/Contact");


const createContact = async(req,res) => {

    try {
        const newContact = new  Contact(req.body);
        await newContact.save();
        res.status(201).json({ msg: newContact });
    console.log("Contacts data Successfully add : ", newContact);

    } catch (error) {
        console.log(error);
        res.status(500).json({msg:error});
    }
}

module.exports = {createContact};