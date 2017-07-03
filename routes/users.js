import express from 'express';
import passport from 'passport';
import User from '../models/user';
import {verifyUser, getToken} from './verify';
let router = express.Router();


/* GET users listing. */
router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.post('/register', (req, res, next) => {
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if (err) {
			req.session.msg = {type: 'alert-danger', msg: err};
			return res.redirect('/');
		}
		passport.authenticate('local')(req, res, () => {
			req.session.msg = {type: 'alert-success', msg: {name: '', message: 'Regitered Successfully!'}};
			return res.redirect('/');
		});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			req.session.msg = {type: 'alert-danger', msg: err};
			return res.redirect('/');
		}
		if (!user) {
			req.session.msg = {type: 'alert-danger', msg: info};
			return res.redirect('/');
		}
		req.logIn(user, (err) => {
			if (err) {
				req.session.msg = {type: 'alert-danger', msg: err};
				return res.redirect('/');
			}
			req.session.token = getToken(user);
			return res.redirect('/profile');
		});
	})(req, res, next);
});

router.get('/logout', verifyUser, (req, res, next) => {
	req.logout();
	req.session.token = null;
	return res.redirect('/');
});

module.exports = router;
