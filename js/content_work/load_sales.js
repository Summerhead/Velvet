var gender;
var images;

function loadDivs(g) {
    gender = g;
    document.querySelector("section").innerHTML = `<div id="sort-bar"></div>
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
    var keys = new Set();
    var dict = {};
    var properties;

    images["images"].forEach(image => {
        properties = image["properties"];

        Object.keys(properties).forEach(key => {
            attributes = properties[key];

            if (key in dict) {
                attributes.forEach(attribute => {
                    dict[key].add(attribute);
                });
            } else {
                keys.add(key);

                var values = new Set();

                attributes.forEach(attribute => {
                    values.add(attribute);
                });
                dict[key] = values;
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

    loadSortBar(keys, dict);
}

function loadSortBar(keys, dict) {
    var sort_bar_content = `<ul><li><button>Sort</button></li>`;

    keys.forEach(key => {
        var fixed_key = key[0].toUpperCase() + key.slice(1)
        if (key.indexOf("_") != -1) {
            fixed_key = fixed_key.replace("_", " ");
        }

        sort_bar_content += `<li class='dropdown-sort' id='${key}'>
        <button class='dropbtn' onclick=openDropDownMenu(this.parentElement.id)>${fixed_key}</button>
        <div class='dropdown-content'>
        <ul>`;

        dict[key].forEach(value => {
            let fixed_value = value
            if (value.indexOf(" ") != -1) {
                fixed_value = value.replace(" ", "_");
            }
            if (key.toLowerCase() != "brand") {
                value = value[0].toUpperCase() + value.slice(1);
            }

            sort_bar_content += `<li id='${fixed_value}'>
            <a onclick="optionChosen('${fixed_value}');
            sort('${key}', this.innerText);")">${value}</a></li>`;
        });

        sort_bar_content += `</ul></div>`;
    });

    sort_bar_content += `</ul>`;
    document.getElementById("sort-bar").innerHTML = sort_bar_content;
}

function closeDropDown(value) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains("show")) {
            openDropdown.classList.remove("show");
        }
    }
}

function openDropDownMenu(id) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
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
        !event.target.matches(".dropdown-content>ul>li") &&
        !event.target.matches(".dropdown-content>ul>li>a")) {
        var dropdowns = document.getElementsByClassName("dropdown-content");

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
    document.getElementById(`${gender}`).innerHTML = "";

    images["images"].forEach(image => {
        if (image["properties"][option].includes(value.toLowerCase())) {
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
    document.getElementsByClassName("dropdown-content")[0].innerHTML += value;
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