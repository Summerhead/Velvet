var storage = []
var storage_key = 'velvet_storage'

function checkStorage() {
    // // sessionStorage.clear();
    // document.getElementsByClassName("added-stuff")[0].innerHTML = "";
    // console.log('document.getElementById("added-stuff"):', document.getElementsByClassName("added-stuff")[0])
    // console.log(sessionStorage);

    // for (let storage_key = 0; storage_key < sessionStorage.length - 1; storage_key++) {
    //     // let storage_key = sessionStorage.storage_key(i);
    //     console.log(sessionStorage.length);
    //     console.log(storage_key);
    //     console.log(sessionStorage.getItem(storage_key));
    //     document.getElementsByClassName("added-stuff")[0].innerHTML += sessionStorage.getItem(storage_key);
    // }

    setDefaultStorage()
    setCartNumber()
}

function addToStorage(gender, value) {
    setDefaultStorage()
    storage.push(gender, value)
    sessionStorage.setItem(storage_key, storage)

    console.log(storage)
    console.log(sessionStorage.getItem(storage_key))

    console.log(Object.keys(storage).includes(storage_key))
    setCartNumber()
}

function setDefaultStorage() {
    // console.log(storage)
    if (sessionStorage.getItem(storage_key)) {
        storage = [sessionStorage.getItem(storage_key)]
    }
    // console.log(storage)
}

function setCartNumber() {
    document.getElementById('cart').getElementsByTagName('span')[0].innerHTML = sessionStorage.getItem(storage_key) ? sessionStorage.getItem(storage_key).split(',').length / 2 : 0
}

// var i = sessionStorage.length - 1;

// function checkStorage() {
//     // sessionStorage.clear();
//     document.getElementsByClassName("dropdown-secbar")[1].innerHTML = "";
//     console.log(sessionStorage);
//     for (let storage_key = 0; storage_key < sessionStorage.length - 1; storage_key++) {
//         // let storage_key = sessionStorage.storage_key(i);
//         console.log(sessionStorage.length);
//         console.log(storage_key);
//         console.log(sessionStorage.getItem(storage_key));
//         document.getElementsByClassName("dropdown-secbar")[1].innerHTML += sessionStorage.getItem(storage_key);
//     }
// }