var express     = require('express');
var schedule    = require('node-schedule');
var bodyParser  = require("body-parser");

var config = { port: 3000}

var app = express();
    app.use(bodyParser.urlencoded({ "extended": true }));
    app.use(bodyParser.json());
    app.set('view engine', 'ejs'); // @example: https://scotch.io/tutorials/use-ejs-to-template-your-node-application

app.get('/', function (req, res) {
    res.render("index");
})

app.post("/auth/register", function (req, res) {
    
    // todo: check thy not null

    var user = {
        email:    req.body.email,
        username: req.body.username,
        password: req.body.username
    }



    console.log("user:", user)

    res.redirect("/");
})


app.listen(config.port, function () {
	console.log("info", 'Example app listening on port ' + config.port);
})