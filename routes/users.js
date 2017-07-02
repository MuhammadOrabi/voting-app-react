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
			return res.status(500).json({err: err});
		}
		passport.authenticate('local')(req, res, () => {
			return res.status(200).json({status: 'Regitered Successfully!'});
		});
	});
});

router.post('/login', (req, res, next) => {
	passport.authenticate('local', (err, user, info) => {
		if (err) {
			return res.status(500).json({err: err}); 
		}
		if (!user) {
			return res.status(401).json({err: info});
		}
		req.logIn(user, (err) => {
			if (err) return res.status(500).json({err: 'couldn\'t log in user!'});
			let token = getToken(user);
			res.status(200).json({token: token, success: true});
		});
	})(req, res, next);
});

router.get('/logout', verifyUser, (req, res, next) => {
	req.logout();
	res.status(200).json();	
});

module.exports = router;
