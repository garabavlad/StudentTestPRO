const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Assignment = require('../models/Assignment');

const router = express.Router();

// @route       GET api/assignments
// @desc        Get user assignments
// @access      Admin
router.get('/:id', auth, async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	try {
		const assignments = await Assignment.find({ user: req.params.id });
		return res.json(assignments);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       POST api/assignments
// @desc        Adds new assignment
// @access      Admin
router.post('/', auth, async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	const { user, testList } = req.body;

	try {
		//creating new assignment
		const newAssignment = new Assignment({
			user,
			testList
		});

		await newAssignment.save();

		return res.json({ msg: 'Assignment added successfully!' });
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       PUT api/assignments/:id
// @desc        Updates a assignment
// @access      Admin
router.put('/:id', [ auth, [ check('testList', 'Test List is emplty').not().isEmpty() ] ], async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}
	//validation result
	const errs = validationResult(req);
	if (!errs.isEmpty()) {
		return res.status(400).json({ errors: errs.array() });
	}

	try {
		const dbAssignment = await Assignment.findById(req.params.id);

		if (!dbAssignment) {
			return res.status(404).json({ msg: 'Assignment not found' });
		}

		console.log(req.body);

		const testList = req.body.testList;

		if (testList) await Assignment.findByIdAndUpdate(req.params.id, { $set: { testList } }, { new: true });

		res.json({ msg: 'Assignment updated sucessfully' });
		// res.json(assignment);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       DELETE api/assignments/:id
// @desc        Deletes a assignment
// @access      Admin
router.delete('/:id', auth, async (req, res) => {
	if (!req.user.isAdmin) {
		throw new Error('user is not admin');
	}

	try {
		const dbAssignment = await Assignment.findById(req.params.id);

		if (!dbAssignment) {
			return res.status(404).json({ msg: 'Assignment not found' });
		}

		await Assignment.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Assignment deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
