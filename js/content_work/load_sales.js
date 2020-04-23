var gender;
var images;
var image_properties_dict = {};
var properties_sort = {};

function loadDivs(g) {
    gender = g;
    document.querySelector("main").innerHTML = `<div id="sort-bar"></div>
    <div id="${gender}"></div>`;

    loadContent();
}

function loadContent() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            images = JSON.parse(this.responseText);
            loadImages(images);
        }
    };

    xmlhttp.open("GET", `../js/json_work/${gender}_images.json`, true);
    xmlhttp.send();
}

function loadImages(images) {
    var properties;

    images["images"].forEach(image => {
        properties = image["properties"];

        Object.keys(properties).forEach(key => {
            attributes = properties[key];

            properties_sort[key] = new Set()

            if (key in image_properties_dict) {
                attributes.forEach(attribute => {
                    image_properties_dict[key].add(attribute);
                });
            } else {
                var values = new Set();

                attributes.forEach(attribute => {
                    values.add(attribute);
                });
                image_properties_dict[key] = values;
            }
        });

        document.getElementById(
            `${gender}`
        ).innerHTML += `<div class="image-wrapper">
                           <img src="../content/sales_content/${gender}/${
            image["name"]
        }" />
                           <div class="props">
                               <p class="description">${
                                   image["description"]
                               }</p>
                               <p class="price">$${Number(
                                   image["price"]
                               ).toFixed(2)}</p>
                               </div>
                               <button onclick=addToStorage('${
                                   image["name"]
                               }')>Add</button>
                               </div>`;
    });

    loadSortBar();
}

function loadSortBar() {
    var sort_bar_content = `<ul><li><button>Sort</button></li>`;

    Object.keys(image_properties_dict).forEach(key => {
        var fixed_key = key[0].toUpperCase() + key.slice(1)
        if (key.indexOf("_") != -1) {
            fixed_key = fixed_key.replace("_", " ");
        }

        sort_bar_content += `<li class='dropdown-sort' id='${key}'>
        <button class='dropbtn' onclick=openDropDownMenu(this.parentElement.id)>${fixed_key}</button>
        <div class='dropdown-sortbar'>
        <ul>`;

        image_properties_dict[key].forEach(value => {
            let fixed_value = value
            if (value.indexOf(" ") != -1) {
                fixed_value = value.replace(" ", "_");
            }
            if (key != "brand") {
                value = value[0].toUpperCase() + value.slice(1);
            }

            sort_bar_content += `<li id='${fixed_value}'>
            <a onclick="optionChosen('${fixed_value}');
            sort('${key}', '${fixed_value}');")">${value}</a></li>`;
        });

        sort_bar_content += `</ul></div>`;
    });

    sort_bar_content += `</ul>`;
    document.getElementById("sort-bar").innerHTML = sort_bar_content;
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
    document.querySelector(`#${value}>a`).classList.toggle("chosen");
}

function sort(option, value) {
    if (properties_sort[option].has(value)) {
        properties_sort[option].delete(value)
    } else {
        properties_sort[option].add(value)
    }

    document.getElementById(`${gender}`).innerHTML = "";

    images["images"].forEach(image => {
        continue_ = true;

        for (let key in properties_sort) {
            if (properties_sort[key].size) {
                continue_ = false

                for (let index = 0; index < image["properties"][key].length; index++) {
                    if (properties_sort[key].has(image["properties"][key][index])) {
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
            document.getElementById(
                `${gender}`
            ).innerHTML += `<div class="image-wrapper">
                <img src="../content/sales_content/${gender}/${
        image["name"]
    }" />
                <div class="props">
                    <p class="description">${
                        image["description"]
                    }</p>
                    <p class="price">$${Number(
                        image["price"]
                    ).toFixed(2)}</p>
                    </div>
                    <button onclick=addToStorage('${
                        image["name"]
                    }')>Add</button>
                    </div>`;

        }
    });
}

var i = sessionStorage.length - 1;

function addToStorage(value) {
    sessionStorage.setItem(i++, value);
    document.getElementsByClassName("dropdown-sortbar")[0].innerHTML += value;
}

function saveCookies(name, value) {
    options = {
        path: "/",
        "max-age": 60 * 60 * 24 * 3
    };

    let updatedCookie =
        encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}