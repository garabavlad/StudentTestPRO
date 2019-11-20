const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
	name     : {
		type     : String,
		required : true
	},
	subtests : {
		type     : mongoose.Schema.Types.Mixed,
		required : true
	}
});

module.exports = Contact = mongoose.model('test', ContactSchema);
