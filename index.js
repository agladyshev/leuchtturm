let pageArr = [];
for (let i = 0; i < 26 * 38; i++) {
    pageArr.push({
        value: "",
        id: i
    });
}
//customElements.define('cell', Cell, { extends: 'div' });

var page = document.querySelector("article.grid");

pageArr.forEach(function createCell(cell, index) {
    let cellElement = document.createElement("input");
    cellElement.className = "cell";
    cellElement.innerText = cell.value;
    cellElement.maxLength = 1;
    cellElement.size = 1;
    // cellElement.setAttribute('tabindex', '0');
    cellElement.setAttribute('id', cell.id);
    page.appendChild(cellElement);
})

page.addEventListener("click", clickHandler);

function clickHandler(e) {
    if (e.target && e.target.className == "cell") {
        console.log(e.target.id);
        // e.target.focus();
    }
}