const express = require('express');
let router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
    const title = 'Express with ES5';
	res.render('index', { title: title });
});

module.exports = router;
