var express = require('express');
var router = express.Router();
//var getIp = require('../public/javascripts/getip.js')
	

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});



//console.log(getIp())
module.exports = router;
