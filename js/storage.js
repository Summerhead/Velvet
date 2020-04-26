var storage = [];
var storage_key = 'velvet_bag';

function checkStorage() {
    setDefaultStorage();
    setCartNumber();
}

function addToStorage(gender, value) {
    setDefaultStorage();
    console.log(value);
    storage.push(gender, value);
    sessionStorage.setItem(storage_key, storage);

    setCartNumber();
}

function setDefaultStorage() {
    if (sessionStorage.getItem(storage_key)) {
        storage = [sessionStorage.getItem(storage_key)];
    }
}

function setCartNumber() {
    document.getElementById('cart').getElementsByTagName('span')[0].innerHTML =
        getCookie(storage_key) ? (JSON.parse(getCookie(storage_key))).length : 0;
}