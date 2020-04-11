var c = 0;

function loaded() {
    c++;
    if (c === 3) {
        loadFeelYourself();
        loadShopNow();
    }
}

function loadFeelYourself() {
    document.getElementById("feel-yourself").style.height = "auto";
    document
        .querySelectorAll("div#feel-yourself>img")
        .forEach(img => {
            img.style.display = "block";
        });
    document.querySelector("div#feel-yourself>h1").style.display =
        "block";

    console.log(document.querySelector("section").style);
}

function loadShopNow() {
    document.getElementById("shop-now").style.display = "block";
}

function checkForCoockies() {
    console.log(sessionStorage.getItem(0));
    document.getElementsByClassName(
        "dropdown-content"
    )[0].innerHTML = sessionStorage.getItem(0);
}