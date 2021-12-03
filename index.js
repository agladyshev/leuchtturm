import * as Storage from "./storage.js"

var pageNum = 1;

if (!history.state) {
    let path = document.location.pathname;
    if (path.includes("page")) {
        pageNum = path.replace(/\D/g, "");
        console.log(pageNum);
    }
}

if (!localStorage.getItem(pageNum - 1)) {
    Storage.initializeStorage();
}

var page = JSON.parse(localStorage.getItem(pageNum - 1));

var pageElement = document.querySelector("article.grid");

page.cells.forEach(function createCell(cell, index) {
    let cellElement = document.createElement("input");
    cellElement.className = "cell";
    cellElement.value = cell.value;
    // cellElement.innerText = cell.value;
    cellElement.maxLength = 1;
    cellElement.size = 1;
    // cellElement.setAttribute('tabindex', '-1');
    cellElement.setAttribute('id', cell.id);
    // cellElement.onchange = cellInputChange();
    pageElement.appendChild(cellElement);
})
pageElement.addEventListener("click", clickHandler);
pageElement.addEventListener("input", tabOnMaxLen);
pageElement.addEventListener("input", updateCellValue);
pageElement.addEventListener("keydown", gridNavHandler);

document.querySelector("#btn-next").addEventListener("click", nextPage);
document.querySelector("#btn-prev").addEventListener("click", previousPage);

var pageNumElement = document.querySelector("#page-num");
pageNumElement.innerText = pageNum;
// page.querySelector(".cell").focus();

function clickHandler(e) {
    if (e.target && e.target.className == "cell") {
        e.target.focus();
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

function updateCellValue(e) {
    if (e.target && e.target.className == "cell") {
        var value = e.target.value;
        var id = e.target.id;
        console.log(value, id);
        page.cells[id] = {
            value,
            id: Number(id)
        };
        console.log(page);
        Storage.updateStorageItem(pageNum, page);
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
    if (e.key == "Enter" && e.target.id && !isNaN(e.target.id)) {
        let next = document.getElementById((Math.floor(Number(e.target.id) / 26) + 1) * 26);
        if (next) {
            next.focus();
        }
    }
}

function nextPage() {
    if (pageNum < 100) {
        pageNum++;
        history.pushState({}, '', `/page/${pageNum}`);
        pageNumElement.innerText = pageNum;
    }
}

function previousPage() {
    if (pageNum > 1) {
        pageNum--;
        history.pushState({}, '', `/page/${pageNum}`);
        pageNumElement.innerText = pageNum;
    }
}