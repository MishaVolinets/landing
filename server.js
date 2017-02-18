var http = require('http');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser')

var app = express();

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));  

const nodemailer = require('@nodemailer/pro');

// create reusable transporter object using the default SMTP transport
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'volinets.sender@gmail.com',
        pass: 'volinets1998'
    }
});

// setup email data with unicode symbols
// var mailOptions = {
//     from: '"Fred Foo 👻" <foo@blurdybloop.com>', // sender address
//     to: 'volinetsmisha@gmail.com', // list of receivers
//     subject: 'Hello ✔', // Subject line
//     text: 'Hello world ?', // plaintext body
//     html: '<b>Hello world ?</b>' // html body
// };

// send mail with defined transport object
// transporter.sendMail(mailOptions, function(error, info) {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });

app.use(express.static(__dirname));

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.post('/send',function(req,res){
	var mailOptions = {
		from: req.body.email,
		to: 'volinetsmisha@gmail.com',
		subject: 'New Contact',
		text: 'new Contact',
		html: '<h1>Name: </h1>' + req.body.firstName + ' ' + req.body.lastName + '<br /> <h1>Email: </h1>' + req.body.email
	};
	transporter.sendMail(mailOptions,function(error, info){
		if(error)
			return console.log('error');
		res.send(true);
	});
})

app.listen(8000,function(){
	console.log('Example app listen on port 8000');
});