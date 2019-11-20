const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Test = require('../models/Test');

const router = express.Router();

// @route       GET api/tests
// @desc        Get the ADMIN tests
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}
		const tests = await Test.find({}).sort({ date: -1 });
		return res.json(tests);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error: get api tests');
	}
});

// @route       POST api/tests
// @desc        Adds new test
// @access      Private
router.post('/', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	const { name, subtests } = req.body;

	try {
		//creating new contact
		const newContact = new Test({
			name,
			subtests
		});

		const contact = await newContact.save();

		res.json(contact);
	} catch (error) {
		console.error(error.message);
		return res.status(500).send('Server Error: post api test');
	}
});

// @route       PUT api/contacts/:id
// @desc        Updates a contact
// @access      Private
router.put('/:id', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	try {
		const dbTest = await Test.findById(req.params.id);

		if (!dbTest) {
			return res.status(404).json({ msg: 'Test not found' });
		}

		// if (dbTest.user.toString() !== req.user.id) {
		// 	return res.status(400).json({ msg: 'Not authorized' });
		// }

		const { name, subtests } = req.body;

		const contactFields = {};
		if (name) contactFields.name = name;
		if (subtests) contactFields.subtests = subtests;

		await Test.findByIdAndUpdate(req.params.id, { $set: contactFields }, { new: true });

		res.json({ msg: 'Contact updated sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       DELETE api/contacts/:id
// @desc        Deletes a contact
// @access      Private
router.delete('/:id', auth, async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	try {
		const dbTest = await Test.findById(req.params.id);

		if (!dbTest) {
			return res.status(404).json({ msg: 'Test not found' });
		}

		// if (dbContact.user.toString() !== req.user.id) {
		// 	return res.status(400).json({ msg: 'Not authorized' });
		// }

		await Test.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Contact deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
