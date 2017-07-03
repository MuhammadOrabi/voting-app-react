import mongoose from 'mongoose';
let Schema = mongoose.Schema;

let Options = new Schema({ name: String, votes: Number });

let Poll = new Schema({
	poll: String,
	options: [Options],
	_creator : { type: Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Poll', Poll);
