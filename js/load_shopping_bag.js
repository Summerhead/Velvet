function loadShoppingBag() {
    var cookie = getCookie("velvet_bag");

    if (cookie) {
        cookie = JSON.parse(cookie);
        console.log('cookie', cookie);
        for (index in cookie) {
            let item = cookie[index];
            console.log('item', item);

            document.getElementById('items').innerHTML +=
                `<img src="/content/sales_content/${item['gender']}/${item['name']}"/>`
        }
    } else {
        document.getElementById('items').innerHTML =
            `<div class="no-items">
                <p>Your Shopping Bag is Empty</p>
            </div>
            <div class="continue-shopping">
                <p>CONTINUE SHOPPING</p>
            </div>`;
    }
}