const mysql2 = require("mysql2");
const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const app = express();

const walk = require("walk");
const walker = walk.walk("./html", {
    followLinks: false
});

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3308,
    user: "root",
    password: "usbw",
    database: "velvet online clothing shop",
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

app.use("/public", express.static("public"));
app.use("/html/partials", express.static("html/partials"));

walker.on("file", function (root, stat, next) {
    if (!(root.split('\\')).includes('partials')) {
        let dirpath = path.join(root, stat.name);
        let link = dirpath.replace("html\\", "/").replace(".html", "").split('\\').join('/');

        if (link == '/index') {
            link = '/';
        }

        app.get(link, function (request, response) {
            response.sendFile(path.join(__dirname, dirpath));
        });

        next();
    }
});

app.post("/bag", function (request, response) {
    var address = request.body.address;
    console.log("address:", address);

    if (address) {
        connection.query(
            `INSERT INTO orders (address) VALUES ('${address}')`,
            function (error, results, fields) {
                console.log("error:", error);
                console.log("results:", results);
                // console.log("fields:", fields);
                if (!error) {
                    request.session.loggedin = true;
                    request.session.address = address;

                    response.redirect('/bag');
                } else {
                    response.send("Incorrect Username and/or Password!");
                }
                response.end();
            }
        );
    } else {
        response.send("Please enter your address!");
        response.end();
    }
});

app.listen(5500);