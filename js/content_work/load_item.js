var image;

function loadItem(item) {
    props = item.split(',');
    image = `<img src="../content/sales_content/${props[0]}/${props[1]}" />`

    document.getElementsByTagName('main')[0].innerHTML = image;
}