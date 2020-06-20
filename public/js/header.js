let womenMenLinks = document.querySelectorAll('.women-men>ul>li>a');
windowURL = window.location.href;

for (let element of womenMenLinks) {
    let urlDirectories = windowURL.split('/');
    if (urlDirectories && urlDirectories.includes(element.innerHTML.toLowerCase())) {
        element.style.fontWeight = 'bold';
        break;
    }
}