function loadItem() {
    let item = JSON.parse(getCookie("item"));

    let itemCodeWindowLocation = getItemCodeWindowLocation();
    if (item && item['id'] == itemCodeWindowLocation) {
        setItem(item);
    } else {
        console.log("item: ", getItemFromJSON(itemCodeWindowLocation));
    }
}

function getItemCodeWindowLocation() {
    let itemCode = window.location.pathname.split('/')[4].replace('.html', '');

    return itemCode;
}

function setItem(item) {
    let gender = item['gender'];
    let item_name = item["name"];
    let item_description = item["description"];
    let props = item["properties"];
    let item_sizes = props["sizes"];

    let left_side = document.getElementById('left-side');
    left_side.innerHTML +=
        `<img src="/content/sales_content/${gender}/${item_name}"/>`;

    let right_side = document.getElementById('right-side');
    right_side.innerHTML +=
        `<div id="item-description">${item_description}</div>`;

    let sizes_divs =
        `<div id="sizes"><span>Sizes: </span>`;
    item_sizes.forEach(item_size => {
        sizes_divs += `<div class="size">${item_size}</div>`;
    });

    right_side.innerHTML += `${sizes_divs}</div>`;
}

function getItemFromJSON(id) {

    let genders = ["men", "women"];
    let images = [];
    let responses = 0;

    for (let index in genders) {
        var xmlhttp = new XMLHttpRequest();


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
                    console.log("item: ", item);
                    return item;
                }
            }
        }
    }
}