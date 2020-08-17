const mysql2 = require("mysql2");
const express = require("express");
const app = express();
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");

const walk = require("walk");
const walker = walk.walk("./public/html", {
    followLinks: false
});

const connection = mysql2.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "beautyofbalance",
    database: "velvet_online_clothing_shop",
});

const URL_SEXNAME_MAP = new Map([
    ['/mens', 'male'],
    ['/womens', 'female']
]);

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
        ORDER BY product__id`],
    ['brands', `
        SELECT * 
        FROM brand 
        ORDER BY brand__id`],
    ['colors', `
        SELECT * 
        FROM color 
        ORDER BY color__id`]
]);

let sexName, queryError, queryResults = [],
    promises = [];
walker.on("file", function (root, stat, next) {
    if (!(root.split('\\')).includes('partials')) {
        let dirpath = path.join(root, stat.name);
        let link = dirpath.replace("public\\html\\", "/").replace(".html", "").split('\\').join('/');

        if (link == '/index') {
            link = '/';
        }

        if ((link.split('/'))[1] == 'sales') {
            link = link.replace('/sales', '');

            app.post(link, (req, res) => {
                queryResults = [];
                promises = [];

                sexName = URL_SEXNAME_MAP[req.originalUrl];
                console.log(req.body);

                (async () => {
                    await resolveQuery();
                    console.log(queryResults);

                    res.json({
                        status: queryError || 'success',
                        results: queryResults
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

async function resolveQuery() {
    try {
        let query = `
            SELECT product__id AS id, product__image AS image, product__title AS title, product__price AS price, 
            category__name AS category, 
            GROUP_CONCAT(color__name) AS colors, 
            GROUP_CONCAT(brand__name) AS brands
            FROM product
                LEFT JOIN category
                ON category__id = product__category__id
                
                LEFT JOIN product_color 
                ON product__id = product_color__product__id
                LEFT JOIN color
                ON color__id = product_color__color__id
                
                LEFT JOIN product_brand 
                ON product__id = product_brand__product__id
                LEFT JOIN brand
                ON brand__id = product_brand__brand__id
            GROUP BY product__id
            ORDER BY product__id`;

        await Promise.resolve(executeQuery(query));
    } catch (error) {
        console.log('error:', error);
        queryError = error;
    }
}

function executeQuery(query) {
    return new Promise((resolve, reject) => {
        connection.query(query, function (error, results) {
            queryError = error;
            resolve(results);
            reject(results);
        });
    }).then((results) => {
        queryResults = results;
    })
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