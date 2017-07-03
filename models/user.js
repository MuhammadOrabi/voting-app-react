var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var passportLocalMongoose = require('passport-local-mongoose');

var User = new Schema({
	polls : [{ type: Schema.Types.ObjectId, ref: 'Poll' }]
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);