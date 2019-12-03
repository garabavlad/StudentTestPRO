const express = require('express');
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

const Result = require('../models/Result');

const router = express.Router();

// @route       GET api/results/
// @desc        Get all user results
// @access      Admin
router.get('/', auth, async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}

		const results = await Result.find({});
		return res.json(results);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       GET api/results/:id
// @desc        Get user results
// @access      Private
router.get('/:id', auth, async (req, res) => {
	try {
		const results = await Result.find({ user: req.params.id });
		return res.json(results);
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       POST api/results
// @desc        Adds new result
// @access      Private
router.post('/', auth, async (req, res) => {
	const { scoreTaken, scoreMax, percent, test } = req.body;
	const userId = req.user.id;

	try {
		//creating new result
		const newResult = new Result({
			user       : userId,
			test,
			scoreTaken,
			scoreMax,
			percent
		});

		await newResult.save();

		return res.json({ msg: 'Result added successfully!' });
	} catch (error) {
		console.error(error.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

// @route       PUT api/results/:id
// @desc        Updates a result
// @access      Admin
// router.put('/:id', [ auth, [ check('testList', 'Test List is emplty').not().isEmpty() ] ], async (req, res) => {
// 	//validation result
// 	const errs = validationResult(req);
// 	if (!errs.isEmpty()) {
// 		return res.status(400).json({ errors: errs.array() });
// 	}

// 	try {
// 		const dbResult = await Result.findById(req.params.id);

// 		if (!dbResult) {
// 			return res.status(404).json({ msg: 'Result not found' });
// 		}

// 		const testList = req.body.testList;

// 		if (testList) await Result.findByIdAndUpdate(req.params.id, { $set: { testList } }, { new: true });

// 		res.json({ msg: 'Result updated sucessfully' });
// 	} catch (err) {
// 		console.error(err.message);
// 		return res.status(500).json({ msg: 'Server Error' });
// 	}
// });

// @route       DELETE api/results/:id
// @desc        Deletes a result
// @access      Admin
router.delete('/:id', auth, async (req, res) => {
	try {
		if (!req.user.isAdmin) {
			throw new Error('user is not admin');
		}
		const dbResult = await Result.findById(req.params.id);

		if (!dbResult) {
			return res.status(404).json({ msg: 'Result not found' });
		}

		await Result.findByIdAndDelete(req.params.id);

		res.json({ msg: 'Result deleted sucessfully' });
	} catch (err) {
		console.error(err.message);
		return res.status(500).json({ msg: 'Server Error' });
	}
});

module.exports = router;
