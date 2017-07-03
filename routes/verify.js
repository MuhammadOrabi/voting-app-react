import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export function  getToken(user) {
	return jwt.sign(user, config.key, {expiresIn: 3600});
}

export function verifyUser(req, res, next) {
	let token = req.session.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.key, (err, decoded) => {
			if (err) {
				req.session.msg = {type: 'alert-danger', msg: err};
				return res.redirect('/');
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		req.session.msg = {type: 'alert-danger', msg: {name: '', message: 'Not Authoriezed!'}};
		return res.redirect('/');
	}
}