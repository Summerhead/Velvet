let gender;
let items;
let itemsContainer;
let imagePropertiesDict = {};
let propertiesSort = {};

function loadDivs(g) {
    gender = g;
    // document.querySelector("main").innerHTML =
    //     `<div id="sort-bar"></div>
    //     <div id="items-container"></div>`;

    itemsContainer = document.getElementById("items-container");
    // setPagination();
    // loadContent();
    contentQuery();
}

async function contentQuery() {
    let resp = await fetch(document.location.pathname, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            url: document.location.search.substring(1)
        })
    });
    let data = await resp.json();
    console.log('data:', data);

    // items = data['results'];
}

function insertParam(key, value) {
    key = encodeURIComponent(key);
    value = encodeURIComponent(value);

    // kvp looks like ['key1=value1', 'key2=value2', ...]
    var kvp = document.location.search.substr(1).split('&');
    if (!kvp) {
        console.log('here');
    }
    let i = 0;

    for (; i < kvp.length; i++) {
        console.log(i, key, value, kvp[i]);
        if (kvp[i].startsWith(key + '=')) {
            let pair = kvp[i].split('=');
            pair[1] = value;
            kvp[i] = pair.join('=');
            break;
        }
    }

    if (i >= kvp.length) {
        let index = 0;
        if (kvp[0]) {
            index = kvp.length;
        }
        kvp[index] = [key, value].join('=');
    }

    let params = kvp.join('&');
    console.log(kvp, params);

    return params;
}

function reloadPage(params) {
    document.location.search = params;
}

// document.getElementById('btn').onclick = () => {
//     let params = insertParam('hui', 'piz da');
//     reloadPage(params);
// };
// document.getElementById('btn2').onclick = () => {
//     let params = insertParam('r', '123=');
//     reloadPage(params);
// };
// document.getElementById('btn3').onclick = () => {
//     let params = insertParam('r', '567');
//     reloadPage(params);
// };

function loadContent() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            items = JSON.parse(this.responseText);
            loadImages(items);
        }
    };

    xmlhttp.open("GET", `/public/js/json_work/${gender}_images.json`, true);
    xmlhttp.send();
}

function loadImages(items) {
    var properties;

    items.forEach(image => {
        properties = image["properties"];

        Object.keys(properties).forEach(key => {
            attributes = properties[key];
            propertiesSort[key] = new Set();

            if (key in imagePropertiesDict) {
                attributes.forEach(attribute => {
                    imagePropertiesDict[key].add(attribute);
                });
            } else {
                var values = new Set();

                attributes.forEach(attribute => {
                    values.add(attribute);
                });
                imagePropertiesDict[key] = values;
            }
        });
        loadImage(image);
    });
    loadSortBar();
}

function loadImage(image) {
    stringifiedImage = JSON.stringify(image).replace(/ /g, '&#32;');

    itemsContainer.innerHTML +=
        `<div class="image-wrapper">
            <a href="item/${image["id"]}.html" onclick=saveCookie('item','${stringifiedImage}')>
                <img src="/public/content/sales_content/${gender}/${image["name"]}" />
            </a>
            <div class="props">
                <p class="description">${image["description"]}</p>
                <p class="price">$${Number(image["price"]).toFixed(2)}</p>
            </div>
            <button onclick=addCookie('velvet_bag','${stringifiedImage}')>Add</button>
        </div>`;
}

function loadSortBar() {
    var sortBarContent = '<ul>';
    // var sortBarContent = `<li><button>Sort</button></li>`;

    Object.keys(imagePropertiesDict).forEach(key => {
        var fixed_key = key[0].toUpperCase() + key.slice(1);

        if (key.indexOf("_") != -1) {
            fixed_key = fixed_key.replace("_", " ");
        }

        sortBarContent +=
            `<li class='dropdown-sort' id='${key}'>
                <button class='dropbtn' onclick=openDropDownMenu(this.parentElement.id)>${fixed_key}</button>
                <div class='dropdown-sortbar'>
                    <ul>`;

        imagePropertiesDict[key].forEach(value => {
            let fixedValue = value;

            if (value.indexOf(" ") != -1) {
                fixedValue = value.replace(" ", "_");
            }

            let valueDisplay = value;

            if (key != "brand") {
                valueDisplay = value[0].toUpperCase() + value.slice(1);
            }

            sortBarContent +=
                `<li id='${fixedValue}'>
                    <a onclick="optionChosen('${fixedValue}');sort('${key}', '${value}')">
                        ${valueDisplay}
                    </a>
                </li>`;
        });

        sortBarContent += `</ul></div>`;
    });

    sortBarContent += `</ul>`;
    document.getElementById("sort-bar").innerHTML = sortBarContent;
}

function openDropDownMenu(id) {
    var dropdowns = document.getElementsByClassName("dropdown-sortbar");

    for (let i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
        }
    }

    document.querySelector(`#${id}>div`).classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches(".dropbtn") &&
        !event.target.matches(".dropdown-sortbar>ul>li") &&
        !event.target.matches(".dropdown-sortbar>ul>li>a")) {
        var dropdowns = document.getElementsByClassName("dropdown-sortbar");

        for (let i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains("show")) {
                openDropdown.classList.remove("show");
            }
        }
    }
};

function optionChosen(value) {
    document.querySelector(`#${value}`).classList.toggle("chosen");
}

function sort(option, value) {
    if (propertiesSort[option].has(value)) {
        propertiesSort[option].delete(value);
    } else {
        propertiesSort[option].add(value);
    }

    itemsContainer.innerHTML = "";

    items.forEach(image => {
        continue_ = true;

        for (let key in propertiesSort) {
            if (propertiesSort[key].size) {
                continue_ = false;

                for (let index = 0; index < image["properties"][key].length; index++) {
                    if (propertiesSort[key].has(image["properties"][key][index])) {
                        continue_ = true;
                        break;
                    }
                }

                if (!continue_) {
                    break;
                }
            }
        }

        if (continue_) {
            loadImage(image);
        }
    });
}