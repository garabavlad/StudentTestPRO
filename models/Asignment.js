const mongoose = require('mongoose');

const AsignmentSchema = mongoose.Schema({
	user : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'users'
	},
	test : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'tests'
	}
});

module.exports = mongoose.model('asignment', AsignmentSchema);
