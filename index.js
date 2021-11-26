let pageArr = [];
for (let i = 0; i < 26 * 38; i++) {
    pageArr.push({});
}
//customElements.define('cell', Cell, { extends: 'div' });

var page = document.querySelector("article.page");

pageArr.forEach(function createCell(cell, index) {
    let cellElement = document.createElement("div");
    cellElement.className = "cell";
    page.appendChild(cellElement);
})