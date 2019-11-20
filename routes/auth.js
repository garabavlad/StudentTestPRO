const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

const router = express.Router();

// @route       GET api/auth
// @desc        Gets logged in user
// @access      Private
router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');
		return res.json(user);
	} catch (err) {
		console.error(err.message);
		return res.status(500).send('Server error');
	}
});

// @route       POST api/auth
// @desc        Auth user and get token
// @access      Public
router.post(
	'/',
	[
		check('email', 'Please enter a valid email address').isEmail(),
		check('password', 'Please enter a valid password (min 6 characters)').isLength({ min: 6 })
	],
	async (req, res) => {
		//validation result
		const errs = validationResult(req);
		if (!errs.isEmpty()) {
			return res.status(400).json({ errors: errs.array() });
		}

		const { email, password } = req.body;

		//getting user from database
		try {
			let user = await User.findOne({ email });
			if (!user) {
				return res.status(400).json({ msg: 'Invalid email and / or password' });
			}
			//comparing passwords
			await bcrypt.compare(password, user.password).then((re) => {
				// password no match match
				if (!re) {
					return res.status(400).json({ msg: 'Invalid email and / or password' });
				}

				//passwords match so returning a token
				const secret = config.get('jwtSecret');
				const payload = {
					user : {
						id      : user.id,
						isAdmin : user.isAdmin
					}
				};

				jwt.sign(
					payload,
					secret,
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
			});
		} catch (erro) {
			console.error(erro);
			return res.status(500).send('Server Error');
		}
	}
);

module.exports = router;
