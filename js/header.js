let women_men_links = document.querySelectorAll('.women-men>ul>li>a')
window_url = window.location.href

for (let el of women_men_links) {
    if (window_url.split('/')[4].includes(el.innerHTML.toLowerCase())) {
        el.style.fontWeight = 'bold'
        break;
    }
}