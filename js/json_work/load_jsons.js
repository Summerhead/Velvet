let fs = require("fs");

let images = {
    men: [{
            name: "27950-group-1.jpg",
            description: "ASOS DESIGN two-piece in white with back print with hotfix detail",
            price: 93.0,
            properties: {
                product_type: ['hoodie', 'sweatpants', 'set'],
                color: ['white'],
                brand: ["ASOS"],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        {
            name: "28229-group-1.jpg",
            description: "ASOS 4505 abstract monochrome print jogger set",
            price: 58.0,
            properties: {
                product_type: ['hoodie', 'sweatpants', 'set'],
                color: ['black', 'white'],
                brand: ["ASOS"],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        {
            name: "11810348-1-black.jpg",
            description: "Nike Running Pacer half zip sweat in black",
            price: 36.0,
            properties: {
                product_type: ['sweatshirt'],
                color: ['black'],
                brand: ["Nike"],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        {
            name: "12528792-1-black.jpg",
            description: "Nike Running woven joggers in black",
            price: 35.0,
            properties: {
                product_type: ['sweatpants'],
                color: ['black'],
                brand: ["Nike"],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        {
            name: "13349193-1-pink.jpg",
            description: "Nike Running Rise 365 t-shirt in pink",
            price: 35.0,
            properties: {
                product_type: ['t-shirt'],
                color: ['pink'],
                brand: ["Nike"],
                sizes: ["S", "M", "L", "XL"]
            }
        },
        {
            name: "14203187-1-white.jpg",
            description: "Under Armour Training camo long sleeve top in grey",
            price: 38.0,
            properties: {
                product_type: ['t-shirt'],
                color: ['white'],
                brand: ["Under Armour"],
                sizes: ["S", "M", "L", "XL", "XLL"]
            }
        }
    ],
    women: [{
            name: "14147636-1-cream.jpg",
            description: "ASOS DESIGN Tall linen oversized bomber jacket in cream",
            price: 60.0,
            properties: {
                product_type: ['jacket'],
                color: ['white'],
                brand: ["ASOS"],
                sizes: ["S", "M", "XL"]
            }
        },
        {
            name: "image_68a8f6bb-9c9e-437d-982d-8d8b467ed5ca.jpg",
            description: "Bershka canvas jacket with pocket detail in black",
            price: 36.0,
            properties: {
                product_type: ['jacket'],
                color: ['black'],
                brand: ["Bershka"],
                sizes: ["S", "M", "L", "XL", "XL", "XLL"]
            }
        },
        {
            name: "3RGaJVcjLvyYzuyb2nd9ENUXYdBfA7XQJwCzS8o5XBPoGFPhJAeIvTT6qA6XsbBMxXyIhHjT4d8IAH6pAIkt5Gz2YPXwBjNpMJ_PfYcqJtSXHMiTfk60ZmzOw7tiIQ3Hi2Caa.jpg",
            description: "ASOS DESIGN longline trench coat in stone",
            price: 92.0,
            properties: {
                product_type: ['coat'],
                color: ['white'],
                brand: ["ASOS"],
                sizes: ["S", "M", "L", "XL", "XL", "XLL"]
            }
        },
        {
            name: "13530657-1-hotpink.jpg",
            description: "ASOS DESIGN bright bonded crepe grandad coat in pink",
            price: 79.0,
            properties: {
                product_type: ['coat'],
                color: ['pink'],
                brand: ["ASOS"],
                sizes: ["S", "M", "L", "XL", "XL", "XLL"]
            }
        },
        {
            name: "13541253-1-black.jpg",
            description: "Oasis parka with faux fur trim hood in black",
            price: 143.0,
            properties: {
                product_type: ['coat'],
                color: ['black'],
                brand: ["Oasis"],
                sizes: ["L", "XL", "XL", "XLL"]
            }
        },
        {
            name: "13404956-1-gold.jpg",
            description: "ASOS DESIGN sequin cape in gold",
            price: 32.0,
            properties: {
                product_type: ['cape'],
                color: ['gold'],
                brand: ["ASOS"],
                sizes: ["M", "L", "XL", "XL", "XLL"]
            }
        }
    ]
};

function loadJSONs() {
    fs.readFile('../../html/partials/item/item_boilerplate.html', 'utf-8', function (err, itemPageContent) {
        if (err) throw err;

        let g_index = 1,
            index = 0,
            obj, pageContent = '';
        for (let key_gender in images) {
            obj = images[key_gender];

            for (let i = 0; i < obj.length; i++) {
                let item = obj[i];
                item["id"] = Number(g_index);
                item["gender"] = key_gender;
                createFile(g_index, itemPageContent);

                g_index++;
                index++;
            }

            pageContent = [pageContent, key_gender.toUpperCase(), '_', 'PAGES', '=', getPages(index), ';'].join('');
            writeToJSON(key_gender, obj);

            index = 0;
        }

        writePages(pageContent);
    })
}

function createFile(index, content) {
    fs.writeFile(`../../html/sales/item/${index}.html`, content, function (err) {
        if (err) throw err;

        console.log(`html/sales/item/${index}.html saved.`);
    });
}

function writeToJSON(gender, obj) {
    var json = JSON.stringify(obj);
    console.log("json: ", json);
    fs.writeFile(`${gender}_images.json`, json);

    console.log(`Json of ${gender} images loaded.`);
}

function getPages(imagesNum) {
    let pages = Math.ceil(imagesNum / 4);
    console.log(imagesNum / 4);
    return pages;
}

function writePages(content) {
    console.log("content: ", content);

    fs.writeFile(`../../pages.txt`, content, function (err) {
        if (err) throw err;

        console.log(`pages.txt saved.`);
    });
}

loadJSONs();