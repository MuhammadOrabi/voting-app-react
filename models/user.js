let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let passportLocalMongoose = require('passport-local-mongoose');

let Options = new Schema({ 
	name: String, 
	votes: {type: Number, default: 0} 
});

let Poll = new Schema({
	poll: String,
	options: [Options],
});

let User = new Schema({
	polls : [Poll]
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);