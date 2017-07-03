import express from 'express';
import User from '../models/user';
import {verifyUser} from './verify';
let router = express.Router();

router.get('/', (req, res, next) => {
	res.send('respond with a resource');
});

router.post('/', verifyUser,(req, res, next) => {
	res.json(req.decoded._doc.username);
});

module.exports = router;
