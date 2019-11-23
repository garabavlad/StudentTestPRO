const mongoose = require('mongoose');

const AssignmentSchema = mongoose.Schema({
	user     : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'users'
	},
	testList : [
		{
			type : mongoose.Schema.Types.ObjectId,
			ref  : 'tests'
		}
	]
});

module.exports = mongoose.model('assignment', AssignmentSchema);
