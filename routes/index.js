const express = require('express');
let router = express.Router();
import {verifyUser} from './verify';
import User from '../models/user.js'
/* GET home page. */
router.get('/', (req, res, next) => {
    let msg;
    let authenticated;
    if (req.session.msg) {
		msg = req.session.msg;
		req.session.msg = null;
    }
	res.render('index', { title: 'voting app', msg: msg, token: req.session.token});
});

/* GET Profile. */
router.get('/profile', verifyUser, (req, res, next) => {
	let name = req.decoded._doc.username;
	User.findOne({username: name}, (err, user) => {
		if (err || !user) {
			req.session.msg = {type: 'alert-danger', msg: err};
			return res.redirect('/');
		}
		let first = (user.polls.length === 0);
		let polls = user.polls;
		res.render('profile', { title: req.decoded._doc.username, token: req.session.token, first: first });
	});
});



module.exports = router;
