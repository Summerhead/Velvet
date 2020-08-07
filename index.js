const mysql2 = require("mysql2");
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const walk = require("walk");
const walker = walk.walk("./html", {
    followLinks: false
});

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "beautyofbalance",
    database: "velvet_online_clothing_shop",
});

const URL_SEXNAME_MAP = {
    '/mens': 'male',
    '/womens': 'female'
}

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

app.use(express.text({
    limit: '1mb'
}));
app.use(express.json({
    limit: '1mb'
}));

let queriesMap = new Map([
    ['products', `
        SELECT * 
        FROM product 
        ORDER BY product__id;
        `],
    ['brands', `
        SELECT * 
        FROM brand 
        ORDER BY brand__id;
        `],
    ['colors', `
        SELECT * 
        FROM color 
        ORDER BY color__id;
        `]
]);

let sexName, queryError, queryResults = new Map();
walker.on("file", function (root, stat, next) {
    if (!(root.split('\\')).includes('partials')) {
        let dirpath = path.join(root, stat.name);
        let link = dirpath.replace("html\\", "/").replace(".html", "").split('\\').join('/');

        if (link == '/index') {
            link = '/';
        }

        if ((link.split('/'))[1] == 'sales') {
            link = link.replace('/sales', '');

            app.post(link, (req, res) => {
                queryResults.clear();
                // queryResults = [];

                sexName = URL_SEXNAME_MAP[(req.originalUrl)];
                console.log(req.body);

                (async () => {
                    await executeQueries();
                    console.log(queryResults);

                    res.json({
                        status: queryError || 'success',
                        results: [...queryResults]
                    });
                })();
            });
        }

        app.get(link, function (req, res) {
            res.sendFile(path.join(__dirname, dirpath));
        });

        next();
    }
});

async function executeQueries() {
    try {
        let promises = [];
        queriesMap.forEach((query, key) => {
            promises.push(executeQuery(query).then((results) => {
                queryResults = new Map([
                    ...queryResults,
                    ...[
                        [key, results]
                    ]
                ]);
            }));
        })
        await Promise.all(promises);
    } catch (err) {
        console.log('err:', err);
    }
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results) {
            queryError = error;
            resolve(results);
            reject(error);
        });
    });
}

app.post("/bag", function (req, res) {
    var address = req.body.address;
    console.log("address:", address);

    if (address) {
        connection.query(
            `INSERT INTO orders (address) VALUES ('${address}')`,
            function (error, results, fields) {
                console.log("error:", error);
                console.log("results:", results);
                // console.log("fields:", fields);

                if (!error) {
                    req.session.loggedin = true;
                    req.session.address = address;

                    res.redirect('/bag');
                } else {
                    res.send("Incorrect Username and/or Password!");
                }
                res.end();
            }
        );
    } else {
        res.send("Please enter your address!");
        res.end();
    }
});

app.listen(5500);