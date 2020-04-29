function loadItems() {
    var cookie = getCookie("velvet_bag");

    if (cookie) {

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