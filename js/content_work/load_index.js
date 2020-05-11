// var c = 0;

// function loaded() {
//     c++;
//     if (c === 3) {
//         loadFeelYourself();
//         loadShopNow();
//     }
// }

// function loadFeelYourself() {
//     document.getElementById("feel-yourself").style.height = "auto";
//     document
//         .querySelectorAll("div#feel-yourself>img")
//         .forEach(img => {
//             img.style.display = "block";
//         });
//     document.querySelector("div#feel-yourself>h1").style.display =
//         "block";
// }

// function loadShopNow() {
//     document.getElementById("shop-now").style.display = "block";
// }

// function checkForCoockies() {
//     document.getElementsByClassName(
//         "dropdown-content"
//     )[0].innerHTML = sessionStorage.getItem(0);
// }

// let images = {
//     first_line: ['/content/index_content/mens-black-man-official-hoodie-with-bandana-snood.jpg',
//         '/content/index_content/mens-black-spray-on-skinny-biker-jeans-with-zips.jpg',
//         '/content/index_content/mens-mint-utility-pocket-cargo-jogger-trouser.jpg',
//         '/content/index_content/mens-white-reflective-detail-lace-up-trainer.jpg',
//         '/content/index_content/womens-grey-bridesmaid-loopback-joggers.jpg'
//     ],
//     second_line: ['/content/index_content/womens-white-cotton-mix-volume-sleeve-ruffle-neck-blouse.jpg',
//         '/content/index_content/man-in-white-jacket-with-mask-2974658.jpg'
//     ]
// }

// let trendingContent = document.getElementById('trending-content');
// let trendingContentNodes = trendingContent.getElementsByTagName('div');
// console.log("trendingContentNodes: ", trendingContentNodes);

// let divNode, trendingContentNodesInnerHTML = '',
//     lineImages;
// for (let item in trendingContentNodes) {
//     divNode = trendingContentNodes[item];
//     if (divNode.nodeName == 'DIV') {
//         // console.log("divNode: ", divNode);

//         let divNodeId = divNode.id.replace('-', '_');
//         lineImages = images[divNodeId];

//         for (let lineImageIndex in lineImages) {
//             let lineImageSrc = lineImages[lineImageIndex];
//             // console.log("lineImageSrc: ", lineImageSrc);

//             trendingContentNodesInnerHTML +=
//                 `<div class='trending-images-container'>
//                 <img src='${lineImageSrc}'/><button></button>
//                 </div>`;
//             console.log("trendingContentNodesInnerHTML: ", trendingContentNodesInnerHTML);
//         }

//         // console.log("divNode.innerHTML: ", divNode.innerHTML);
//         divNode.innerHTML = trendingContentNodesInnerHTML;
//         console.log("divNode.innerHTML: ", divNode.innerHTML);
//     }
// }

// function replaceAll(string, search, replace) {
//     return string.split(search).join(replace);
// }