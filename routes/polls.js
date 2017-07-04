import express from 'express';
import User from '../models/user';
import {verifyUser} from './verify';
let router = express.Router();

router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.post('/', verifyUser, (req, res, next) => {
	let username = req.decoded._doc.username;
	let {poll, options} = req.body;
	User.findOne({'username': username}, (err, user) => {
		if (err || !user) {return res.status(404).json('Not Found!'); }
		// poll = {poll: '', options: [{name: ''}, {name: ''}]};
		user.polls.push({poll: poll, options: options});
		user.save((err, user) => res.json(user.polls));
	});
});

module.exports = router;
