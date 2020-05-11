function loadShoppingBag() {
    let cookie = getCookie("velvet_bag");
    let main = document.getElementsByTagName('main')[0];

    if (cookie) {
        cookie = JSON.parse(cookie);
        console.log('cookie', cookie);

        main.innerHTML += `<div id="items"></div>`;
        let items = document.getElementById('items');
        for (let index in cookie) {
            let item = cookie[index];
            console.log('item', item);

            items.innerHTML +=
                `<img src="/content/sales_content/${item['gender']}/${item['name']}"/>`;
        }
    } else {
        main.innerHTML +=
            `<div id="no-items">
                <div id="bag-is-empty">
                    Your Shopping Bag is Empty
                </div>
                <button id="continue-shopping">
                    &#9668; CONTINUE SHOPPING
                </button>
            </div>`;
    }
}