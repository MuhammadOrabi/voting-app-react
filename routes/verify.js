import User from '../models/user';
import jwt from 'jsonwebtoken';
import config from '../config.js';

export function  getToken(user) {
	return jwt.sign(user, config.key, {expiresIn: 3600});
}

export function verifyUser(req, res, next) {
	let token = req.body.token || req.query.token || req.headers['x-access-token'];
	if (token) {
		jwt.verify(token, config.key, (err, decoded) => {
			if (err) {
				let err = new Error('You are not authenticated');
				err.status = 401;
				return next(err);
			} else {
				req.decoded = decoded;
				next();
			}
		});
	} else {
		let err = new Error('No token provided!');
		err.status = 403;
		return next(err);
	}
}