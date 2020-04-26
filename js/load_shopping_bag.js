var storage = []

if (sessionStorage.getItem('velvet_storage')) {
    storage = sessionStorage.getItem('velvet_storage').split(',')
}

for (let index = 0; index < storage.length; index += 2) {
    document.getElementById('items').innerHTML += `<img src="../content/sales_content/${storage[index]}/${storage[index+1]}" />`
}