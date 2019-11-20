const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function(req, res, next) {
	const token = req.header('x-auth-token');
	if (!token) {
		return res.status(401).json({ msg: 'No auth token found' });
	}

	try {
		const verification = jwt.verify(token, config.get('jwtSecret'));

		req.user = verification.user;

		next();
	} catch (error) {
		return res.status(401).json({ msg: 'Invalid token bro' });
	}
};
