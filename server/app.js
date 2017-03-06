//declare vars for node required node packages, app and server
var express = require('express');
var app 	= express('');
var path	= require('path');
var bodyParser = require('body-parser');
var server 	= require('http').createServer(app);

//specify which nodes to use and path for express
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));

//set path for views and specify view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//render home page
app.get('/home', function(req, res){
	res.render('home', {});
})

//render registration page
// & make it able to save registration as vars and push registrations
// into a var array
var members = [{UserName: " ", PassWord: " "}];

app.get('/register', function(req, res){
	res.render('register');
})
app.post('/register', function(req, res){
	console.log(res.body); //test response 
	if (req.body.pword.length <=7){
		res.send('failed password length');
	}else {
	members.push({Username: req.body.uname, Password: req.body.pword});
	console.log(members);
	}
	res.send('new member')
});

//render login page
//make it save attempts as vars, compare to registered logins
//and post a successful login, while rejecting incorrect attempts
app.get('/login', function(req, res){
	res.render('login');
});

app.post('/login', function(req, res){
	var uname = req.body.UserName;
	var pword = req.body.PassWord;

	for(i = 0; i < members.length; i++){
		if (uname === members[i].Username){
			if(pword === members[i].Password){
				res.send('logged in');
			}
		}
	}
				res.send('failed');
})


//JSON object to act our our test database
//render it so it can be used on the home page
var memberData = [{
	"uname": "PeterPan",
	"alias": "Fly Boy ",
	"url": "https://lumiere-a.akamaihd.net/v1/images/open-uri20150422-20810-r3neg5_4c4b3ee3.jpeg",
	"about": "I sneak in through childrens windows at night and sneak them out to play with dangerous pirates."
}]
app.get('/home', function(req, res){
	res.render("home", {member: memberData});
})


//for dev - so nodemon can show it is working
server.listen(3000, function(){
	console.log('port 3000 listening my brotha');
})
