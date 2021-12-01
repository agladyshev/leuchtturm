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
    // cellElement.onchange = cellInputChange();
    page.appendChild(cellElement);
})

page.addEventListener("click", clickHandler);
page.addEventListener("input", tabOnMaxLen);
page.addEventListener("keydown", gridNavHandler);

// page.querySelector(".cell").focus();

function clickHandler(e) {
    if (e.target && e.target.className == "cell") {
        // console.log(e.target.id);
        // e.target.focus();
    }
}

// function cellInputChange(e) {
//     if (e && e.target) {
//         console.log(e.target.value);
//     }
// }

function tabOnMaxLen(e) {
    if (e.target &&
        e.target.className == "cell" &&
        e.target.value.length == e.target.maxLength) {
        if (e.target.nextSibling)
            e.target.nextSibling.focus();
    }
}

function gridNavHandler(e) {
    if (e.key == "ArrowLeft" && e.target.previousSibling && e.target.previousSibling.className == "cell") {
        e.target.previousSibling.focus();
    }
    if (e.key == "ArrowRight" && e.target.nextSibling) {
        e.target.nextSibling.focus();
    }
    if (e.key == "Backspace" && e.target.previousSibling && e.target.value == "" && e.target.previousSibling.className == "cell") {
        e.target.previousSibling.focus();
    }
    if (e.key == "ArrowDown" && e.target.id && !isNaN(e.target.id)) {
        let next = document.getElementById(Number(e.target.id) + 26);
        if (next) {
            next.focus();
        }
    }
    if (e.key == "ArrowUp" && e.target.id && !isNaN(e.target.id)) {
        let next = document.getElementById(Number(e.target.id) - 26);
        if (next) {
            next.focus();
        }
    }
}