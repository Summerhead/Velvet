var fs = require("fs");

function loadWomenJson() {
    var images = {
        images: [{
                name: "14147636-1-cream.jpg",
                description: "ASOS DESIGN Tall linen oversized bomber jacket in cream",
                price: 60.0,
                properties: {
                    product_type: ['jacket'],
                    color: ['white'],
                    brand: ["asos"],
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
                    brand: ["bershka"],
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
                    brand: ["asos"],
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
                    brand: ["asos"],
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
                    brand: ["oasis"],
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
                    brand: ["asos"],
                    sizes: ["M", "L", "XL", "XL", "XLL"]
                }
            }
        ]
    };

    for (i = 0; i < images["images"].length; i++) {
        var obj = images["images"][i];
        obj["id"] = Number(i + 1);
    }

    var json = JSON.stringify(images);
    fs.writeFile("women_images.json", json);

    console.log("Json of women images loaded");
}


module.exports = loadWomenJson;