let cookie;

function loadShoppingBag() {
    cookie = getCookie("velvet_bag");
    cookie = JSON.parse(cookie);
    let main = document.getElementsByTagName('main')[0];
    let itemsTable = document.getElementById("items-table");
    if (itemsTable != undefined) {
        main.removeChild(itemsTable);
    }

    if (cookie && cookie.length) {
        console.log(cookie.length);
        console.log('cookie', cookie);

        main.innerHTML +=
            `<table id="items-table">
                <thead id="table-header">
                    <tr>
                        <th id="item-header">ITEM</th>
                        <th id="item-header">DESCRIPTION</th>
                        <th id="price-header">PRICE</th>
                    </tr>
                </thead>
                <tbody id="items"></tbody>
            </table>`;
        let items = document.getElementById('items');
        for (let index in cookie) {
            let item = cookie[index];
            console.log('item', item);

            items.innerHTML +=
                `<tr class="item-row">
                    <td class="image-cell">
                        <img src="/content/sales_content/${item['gender']}/${item['name']}"/>
                    </td>
                    <td class="description"><span>${item['description']}</span></td>
                    <td class="price-cell">
                        <div><span>$${Number(item['price']).toFixed(2)}</span></div>
                    <button class="remove-item" onclick="removeItem(${item['id']});">Remove</button>
                    </td>
                </tr>`;
        }

        let firstBodyRow = items.firstChild;
        firstBodyRow.classList.add('first-body-row');
    } else {
        main.innerHTML +=
            `<div id="no-items">
                <div id="bag-is-empty">
                    Your Shopping Bag is Empty
                </div>
                <button onclick="location.href='/html/sales/women.html'" id="continue-shopping">
                    &#9668;   CONTINUE SHOPPING
                </button>
            </div>`;
    }
}

function removeItem(id) {
    let item;
    for (let itemIndex in cookie) {
        item = cookie[itemIndex];

        if (item['id'] == id) {
            cookie.splice(itemIndex, 1);
            console.log(cookie);

            saveCookie('velvet_bag', JSON.stringify(cookie));
            loadShoppingBag();
            setCartNumber();
        }
    }
}