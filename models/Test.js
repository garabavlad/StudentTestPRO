const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	name  : {
		type     : String,
		required : true
	},
	parts : {
		type     : mongoose.Schema.Types.Mixed,
		// type     : String,
		// body     : String,
		// answers  : [],
		// correct  : [],
		required : true
	}
});

module.exports = Contact = mongoose.model('test', ContactSchema);
