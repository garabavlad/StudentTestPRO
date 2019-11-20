const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

const User = require('../models/User');

const router = express.Router();

// @route       POST api/users
// @desc        Register a user
// @access      Public

router.post(
	'/',
	[
		check('name', 'Please enter a valid name').not().isEmpty(),
		check('email', 'Please enter a valid email address').isEmail(),
		check('password', 'Please enter a valid password (min 6 characters)').isLength({ min: 6 })
	],
	async (req, res) => {
		const err = validationResult(req);

		if (!err.isEmpty())
			return res.status(400).json({
				errors : err.array()
			});

		const { name, email, password, isAdmin } = req.body;

		try {
			let user = await User.findOne({ email });
			if (user) {
				return res.status(400).json({ msg: 'User already exists' });
			}

			user = new User({
				name,
				email,
				password,
				isAdmin
			});

			const salt = await bcrypt.genSalt(10);

			user.password = await bcrypt.hash(password, salt);

			await user.save();

			const payload = {
				user : {
					id      : user.id,
					isAdmin : user.isAdmin
				}
			};

			jwt.sign(
				payload,
				config.get('jwtSecret'),
				{
					expiresIn : 36000
				},
				(err, token) => {
					if (err) {
						throw err;
					}
					else {
						return res.json({ token });
					}
				}
			);
		} catch (err) {
			console.error(err);
			res.status(500).send('Server error');
		}
	}
);

module.exports = router;
