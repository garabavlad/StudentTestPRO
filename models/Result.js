const mongoose = require('mongoose');

const ResultSchema = mongoose.Schema({
	user       : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'users'
	},
	test       : {
		type : mongoose.Schema.Types.ObjectId,
		ref  : 'tests'
	},
	scoreTaken : {
		type     : mongoose.Schema.Types.Number,
		required : true
	},
	scoreMax   : {
		type     : mongoose.Schema.Types.Number,
		required : true
	},
	percent    : {
		type     : mongoose.Schema.Types.Number,
		required : true
	},
	date       : {
		type    : Date,
		default : Date.now
	}
});

module.exports = mongoose.model('result', ResultSchema);
