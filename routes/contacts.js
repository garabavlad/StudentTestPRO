const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const User = require('../models/User');
const Contact = require('../models/Contact');

const router = express.Router();

// @route       GET api/contacts
// @desc        Get the user contacts
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		const contacts = await Contact.find({ user: req.user.id }).sort({ date: -1 });
		return res.json(contacts);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       POST api/contacts
// @desc        Adds new contact
// @access      Public
router.post('/', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	const { name, email, phone, type } = req.body;

	try {
		//creating new contact
		const newContact = new Contact({
			name,
			email,
			phone,
			type,
			user  : req.user.id
		});

		const contact = await newContact.save();

		res.json(contact);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send('Server Error');
	}
});

// @route       PUT api/contacts/:id
// @desc        Updates a contact
// @access      Private
router.put('/:id', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	try {
		const dbContact = await Contact.findById(req.params.id);

		if (!dbContact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		if (dbContact.user.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'Not authorized' });
		}

		const { name, email, phone, type } = req.body;

		const contactFields = {};
		if (name) contactFields.name = name;
		if (email) contactFields.email = email;
		if (type) contactFields.type = type;
		if (phone) contactFields.phone = phone;

		const contact = await Contact.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

		res.json({ msg: 'Contact updated sucessfully' });
		// res.json(contact);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       DELETE api/contacts/:id
// @desc        Deletes a contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	try {
		const dbContact = await Contact.findById(req.params.id);

		if (!dbContact) {
			return res.status(404).json({ msg: 'Contact not found' });
		}

		if (dbContact.user.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'Not authorized' });
		}

		await Contact.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Contact deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
