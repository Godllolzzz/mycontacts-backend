const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json({ contacts });
});

const createContact = asyncHandler(async (req, res) => {
  // console.log(req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mendatory");
  }
  const contact = await Contact.create({
    user_id: req.user.id,
    name,
    email,
    phone,
  });
  res.status(201).json(contact);
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }
  res.status(200).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    req.status(403);
    throw new Error(
      "User don't  have permission to update other user's contacts"
    );
  }
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(400);
    throw new Error("No contact found");
  }
  if (contact.user_id.toString() !== req.user.id) {
    req.status(403);
    throw new Error(
      "User don't  have permission to delete other user's contact"
    );
  }
  await contact.remove();
  res.status(200).json(contact);
});

module.exports = {
  getContact,
  getContacts,
  createContact,
  updateContact,
  deleteContact,
};
