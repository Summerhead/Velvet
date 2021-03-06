let cookie, main, checkoutButton, itemsTable, checkoutTab, cookieName = 'velvet_bag';

function loadShoppingBag() {
    cookie = getCookie(cookieName);
    try {
        cookie = JSON.parse(cookie);
    } catch (e) {}

    main = document.getElementsByTagName("main")[0];
    itemsTable = document.getElementById("items-table");
    if (itemsTable != undefined) {
        main.removeChild(itemsTable);
    }

    if (cookie && cookie.length) {
        console.log(cookie.length);
        console.log("cookie", cookie);

        if (document.getElementById("checkout-button") == undefined) {
            createCheckoutButton();
        }

        if (document.getElementById("checkout-tab") == undefined) {
            createCheckoutTab();
        }

        main.innerHTML +=
            `<table id="items-table">
                <thead id="items-table-header">
                    <tr>
                        <th id="item-header">ITEM</th>
                        <th id="item-header">DESCRIPTION</th>
                        <th id="price-header">PRICE</th>
                    </tr>
                </thead>
                <tbody id="items"></tbody>
            </table>`;

        let items = document.getElementById("items");
        for (let index in cookie) {
            let item = cookie[index];
            console.log("item", item);

            items.innerHTML +=
                `<tr class="item-row">
                    <td class="image-cell">
                        <img src="/public/content/sales_content/${
                            item["gender"]
                        }s/${item["name"]}"/>
                    </td>
                    <td class="description"><span>${
                        item["description"]
                    }</span></td>
                    <td class="price-cell">
                        <div><span>$${Number(item["price"]).toFixed(
                            2
                        )}</span></div>
                    <button class="remove-item" onclick="removeItem(${
                        item["id"]
                    });">Remove</button>
                    </td>
                </tr>`;
        }

        let firstBodyRow = items.firstChild;
        firstBodyRow.classList.add("first-body-row");
    } else {
        let checkoutButton = document.getElementById("checkout-button");
        if (checkoutButton != undefined) {
            main.removeChild(checkoutButton);
        }

        loadEmptyBag();
    }

    checkoutButton = document.getElementById("checkout-button");
    checkoutTab = document.getElementById("checkout-tab");
}

function loadEmptyBag() {
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            main.innerHTML += this.responseText;
        }
    };

    xmlhttp.open("GET", `/html/partials/bag/empty_bag.html`, true);
    xmlhttp.send();
}

function createCheckoutButton() {
    main.innerHTML += `<button id="checkout-button" onclick="showCheckoutTab()">CHECKOUT</button>`;
}

function removeItem(id) {
    let item;
    for (let itemIndex in cookie) {
        item = cookie[itemIndex];

        if (item["id"] == id) {
            cookie.splice(itemIndex, 1);
            console.log(cookie);

            saveCookie("velvet_bag", JSON.stringify(cookie));
            loadShoppingBag();
            setCartNumber();
        }
    }
}

function createCheckoutTab() {
    main.innerHTML +=
        `<div id="checkout-tab">
            <form action="bag" method="POST">
                <span id="close-checkout-button" onclick="document.getElementById('checkout-tab').style.display='none'" class="close" title="Close Modal">&times;</span>
                <div id="checkout-tab-container">
                    <input id="address" type="text" placeholder="Address" name="address">
                    <button id="checkout-tab-checkout-button" type="submit" onclick=checkResponse()>ORDER</button>
                </div>
            </form>
        </div>`;
}

function showCheckoutTab() {
    document.getElementById("checkout-tab").style.display = "block";
}

window.onclick = function (event) {
    try {
        if (
            checkoutTab.style.display != "none" &&
            event.target != checkoutTab &&
            event.target != this.document.getElementById("checkout-tab-container") &&
            event.target != this.document.getElementById("address") &&
            event.target != checkoutButton
        ) {
            checkoutTab.style.display = "none";
        }
    } catch (e) {}
};

function checkResponse() {
    $.ajax({
        url: 'bag',
        type: 'POST',
        data: 'your form data',
        success: function (response) {
            showSuccessfullOrderTab();

            deleteCookie(cookieName);
            loadShoppingBag();
        }
    });
}

function showSuccessfullOrderTab() {
    main.innerHTML +=
        `<div id="order-success-tab">
            <span id="close-order-success-button" onclick="document.getElementById('order-success-tab').style.display='none'" class="close" title="Close Modal">&times;</span>
            <div id="order-success-tab-container">
                <div>ORDER IS CONFIRMED!</div>
            </div>
        </div>`;
}