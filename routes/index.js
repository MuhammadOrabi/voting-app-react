const express = require('express');
let router = express.Router();
import {verifyUser} from './verify';

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
	res.render('profile', { title: req.decoded._doc.username, token: req.session.token });
});



module.exports = router;
