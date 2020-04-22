var fs = require("fs");

function load_men_json() {
    var images = {
        images: [{
                name: "27950-group-1.jpg",
                description: "ASOS DESIGN two-piece in white with back print with hotfix detail",
                price: 93.0,
                properties: {
                    product_type: ['hoodie', 'sweatpants', 'set'],
                    color: ['white'],
                    brand: ["asos"]
                }
            },
            {
                name: "28229-group-1.jpg",
                description: "ASOS 4505 abstract monochrome print jogger set",
                price: 58.0,
                properties: {
                    product_type: ['hoodie', 'sweatpants', 'set'],
                    color: ['black', 'white'],
                    brand: ["asos"]
                }
            },
            {
                name: "11810348-1-black.jpg",
                description: "Nike Running Pacer half zip sweat in black",
                price: 36.0,
                properties: {
                    product_type: ['sweatshirt'],
                    color: ['black'],
                    brand: ["Under Armour"]
                }
            },
            {
                name: "12528792-1-black.jpg",
                description: "Nike Running woven joggers in black",
                price: 35.0,
                properties: {
                    product_type: ['sweatpants'],
                    color: ['black'],
                    brand: ["nike"]
                }
            },
            {
                name: "13349193-1-pink.jpg",
                description: "Nike Running Rise 365 t-shirt in pink",
                price: 35.0,
                properties: {
                    product_type: ['t-shirt'],
                    color: ['pink'],
                    brand: ["nike"]
                }
            },
            {
                name: "14203187-1-white.jpg",
                description: "Under Armour Training camo long sleeve top in grey",
                price: 38.0,
                properties: {
                    product_type: ['t-shirt'],
                    color: ['white'],
                    brand: ["nike"]
                }
            }
        ]
    };

    for (i = 0; i < images["images"].length; i++) {
        var obj = images["images"][i];
        obj["id"] = Number(i + 1);
    }

    var json = JSON.stringify(images);
    fs.writeFile("men_images.json", json);

    console.log("Json of men images loaded");
}

module.exports = load_men_json;