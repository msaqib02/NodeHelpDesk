var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('home', { title: 'xDoc User Home' });
});

module.exports = router;
