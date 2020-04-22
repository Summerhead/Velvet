function checkStorage() {
    // sessionStorage.clear();
    document.getElementsByClassName(
        "dropdown-secbar"
    )[0].innerHTML = "";
    console.log(sessionStorage);
    for (let key = 0; key < sessionStorage.length - 1; key++) {
        // let key = sessionStorage.key(i);
        console.log(sessionStorage.length);
        console.log(key);
        console.log(sessionStorage.getItem(key));
        document.getElementsByClassName(
            "dropdown-content"
        )[0].innerHTML += sessionStorage.getItem(key);
    }
}