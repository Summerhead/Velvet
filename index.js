var mysql2 = require("mysql2");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");
var app = express();

var connection = mysql2.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "usbw",
    database: "nodelogin",
});

app.use(
    session({
        secret: "secret",
        resave: true,
        saveUninitialized: true,
    })
);

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);

app.use(bodyParser.json());

app.use('/public', express.static('public'));
app.use('/html', express.static('html'));

app.get("/", function (request, response) {
    response.sendFile(path.join(__dirname + "/html/index.html"));
});

app.get("/link", function (request, response) {
    response.sendFile(path.join(__dirname + "/link.html"));
    console.log("request: ", request.body);
    console.log("response: ", response.body);
});

app.post("/auth", function (request, response) {
    var username = request.body.username;
    var password = request.body.password;
    console.log(username, password);

    if (username && password) {
        connection.query(
            `SELECT * FROM accounts WHERE username = '${username}' AND password = '${password}'`,
            function (error, results, fields) {
                console.log(error);
                console.log(results);
                if (results.length > 0) {
                    request.session.loggedin = true;
                    request.session.username = username;
                    response.redirect("/home");
                } else {
                    response.send("Incorrect Username and/or Password!");
                }
                response.end();
            }
        );
    } else {
        response.send("Please enter Username and Password!");
        response.end();
    }
});

app.get("/home", function (request, response) {
    if (request.session.loggedin) {
        response.send("Welcome back, " + request.session.username + "!");
    } else {
        response.send("Please login to view this page!");
    }
    response.end();
});

app.listen(5500, "127.0.0.1");