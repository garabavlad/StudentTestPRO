const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Assignment = require('../models/Assignment');

const router = express.Router();

// @route       GET api/assignments
// @desc        Get user assignments
// @access      Admin
router.get('/:id', auth, async (req, res) => {
	try {
		const assignments = await Assignment.find({ user: req.params.id });
		return res.json(assignments);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       POST api/assignments
// @desc        Adds new assignment
// @access      Admin
router.post('/', auth, async (req, res) => {
	const { user, test } = req.body;

	try {
		//creating new assignment
		const newAssignment = new Assignment({
			user,
			test
		});

		await newAssignment.save();
	} catch (error) {
		console.error(error.message);
		return res.status(500).send('Server Error');
	}

	return res.send('Assignments set successfully!');
});

// @route       PUT api/assignments/:id
// @desc        Updates a assignment
// @access      Admin
router.put('/:id', [ auth, [ check('name', 'Please enter a valid name').not().isEmpty() ] ], async (req, res) => {
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

		if (dbAssignment.user.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'Not authorized' });
		}

		const { name, email, phone, type } = req.body;

		const assignmentFields = {};
		if (name) assignmentFields.name = name;
		if (email) assignmentFields.email = email;
		if (type) assignmentFields.type = type;
		if (phone) assignmentFields.phone = phone;

		const assignment = await Assignment.findByIdAndUpdate(req.params.id, { $set: assignmentFields }, { new: true });

		res.json({ msg: 'Assignment updated sucessfully' });
		// res.json(assignment);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

// @route       DELETE api/assignments/:id
// @desc        Deletes a assignment
// @access      Admin
router.delete('/:id', auth, async (req, res) => {
	try {
		const dbAssignment = await Assignment.findById(req.params.id);

		if (!dbAssignment) {
			return res.status(404).json({ msg: 'Assignment not found' });
		}

		if (dbAssignment.user.toString() !== req.user.id) {
			return res.status(400).json({ msg: 'Not authorized' });
		}

		await Assignment.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Assignment deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server Error');
	}
});

module.exports = router;
