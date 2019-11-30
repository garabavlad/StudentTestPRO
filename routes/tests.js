const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Test = require('../models/Test');
const Assignment = require('../models/Assignment');

const router = express.Router();

// @route       GET api/tests
// @desc        Get the ADMIN tests
// @access      Admin
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
// @access      Admin
router.post('/', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}

		//validation result
		const errs = validationResult(req);
		if (!errs.isEmpty()) {
			return res.status(400).json({ errors: errs.array() });
		}

		const { name, subtests } = req.body;

		//creating new test
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

// @route       PUT api/tests/:id
// @desc        Updates a test
// @access      Admin
router.put('/:id', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}

		const dbTest = await Test.findById(req.params.id);

		if (!dbTest) {
			return res.status(404).json({ msg: 'Test not found' });
		}

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

// @route       DELETE api/tests/:id
// @desc        Deletes a test
// @access      Admin
router.delete('/:id', auth, async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}

		const dbTest = await Test.findById(req.params.id);

		if (!dbTest) {
			return res.status(404).json({ msg: 'Test not found' });
		}

		await Test.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Contact deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       GET api/tests/:id
// @desc        Get the ADMIN tests
// @access      Private
router.get('/:id', auth, async (req, res) => {
	try {
		// Getting assigned tests of the user
		const userId = req.params.id;

		const dbAssignment = await Assignment.find({ user: userId });

		if (!dbAssignment || dbAssignment.length < 1) return res.json([]);

		const testIds = dbAssignment[0].testList;

		// Iterate through test ids and put all the information into an array of tests
		var returnTests = [];
		for (const testId of testIds) {
			const test = await Test.findById(testId);
			if (test) returnTests.push(test);
		}

		// Return tests as response
		return res.json(returnTests);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error: get api tests');
	}
});

module.exports = router;
