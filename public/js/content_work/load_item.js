function loadItem() {
    let item = JSON.parse(getCookie("item"));

    let itemCodeWindowLocation = getItemCodeWindowLocation();
    if (item && item['id'] == itemCodeWindowLocation) {
        setItem(item);
        console.log("item from cookies: ", item);
    } else {
        getItemFromJSON(itemCodeWindowLocation);
    }
}

function getItemCodeWindowLocation() {
    let itemCode = window.location.pathname.split('/')[4].replace('.html', '');

    return itemCode;
}

function setItem(item) {
    let gender = item['gender'];
    let itemName = item["name"];
    let itemDescription = item["description"];
    let props = item["properties"];
    let itemSizes = props["sizes"];

    let leftSide = document.getElementById('left-side');
    leftSide.innerHTML +=
        `<img src="/content/sales_content/${gender}/${itemName}"/>`;

    let rightSide = document.getElementById('right-side');
    rightSide.innerHTML +=
        `<div id="item-description">${itemDescription}</div>`;

    let sizesDivs =
        `<div id="sizes"><span>Sizes: </span>`;
    itemSizes.forEach(item_size => {
        sizesDivs += `<div class="size">${item_size}</div>`;
    });

    rightSide.innerHTML += `${sizesDivs}</div>`;
    rightSide.innerHTML += '<button id="button-checkout">CHECKOUT</button>'
}

function getItemFromJSON(id) {
    let genders = ["men", "women"];
    let images = [];
    let responses = 0;

    for (let index in genders) {
        let xmlhttp = new XMLHttpRequest();

        let gender = genders[index];
        console.log(gender);

        xmlhttp.open("GET", `/js/json_work/${gender}_images.json`, true);
        xmlhttp.send();

        xmlhttp.onreadystatechange = function (req, resp) {
            if (this.readyState == 4 && this.status == 200) {
                let resp = JSON.parse(this.responseText);
                images.push(resp);

                responses++;
                if (responses == genders.length) {
                    let item = getImage(images);
                    setItem(item);
                    return item;
                }
            }
        };
    }

    function getImage(images) {
        for (let indexGenderItems in images) {
            let genderItems = images[indexGenderItems];
            for (itemIndex in genderItems) {
                let item = genderItems[itemIndex];
                if (item['id'] == id) {
                    console.log("item from JSON: ", item);
                    return item;
                }
            }
        }
    }
}