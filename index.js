import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookPage extends HTMLElement {
    constructor() {
        super();
        this.pageNum;
        this.cells = [];
    }
    getValuesFromStorage(pageNum) {
        var page;
        page = JSON.parse(localStorage.getItem(pageNum));
        if (!page)
            page = Storage.createPage(pageNum);
        this.cells = page.cells;
    }
    render() {
        var location = Router.getLocation();
        if (location.pageNum) {
            if (location.pageNum != this.pageNum) {
                this.pageNum = location.pageNum;
                this.cells = [];
            }
            if (this.cells.length == 0)
                this.getValuesFromStorage(location.pageNum);
            if (!this.querySelector(".cell")) {
                this.cells.forEach(this.createCell, this);
                this.createPaddingCells(28, 40);
            } else
                this.populateCells();
        } else {
            console.log("hide");
        }
    }
    populateCells() {
        this.querySelectorAll("input.cell").forEach(updateValue, this);

        function updateValue(element, index) {
            element.value = this.cells[index].value;
        }
    }
    createCell(cell, index) {
        let cellElement = document.createElement("input");
        cellElement.className = "cell";
        cellElement.value = cell.value;
        cellElement.maxLength = 1;
        cellElement.size = 1;
        cellElement.setAttribute('id', cell.id);
        this.querySelector(".grid").appendChild(cellElement);
    }
    createPaddingCells(x, y) {
        for (let i = 0; i < x - 2; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.querySelector("header").appendChild(el);
        }
        for (let i = 0; i < x - 2; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.querySelector("footer").appendChild(el);
        }
        for (let i = 0; i < y; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.querySelector(".aside-left").appendChild(el);
        }
        for (let i = 0; i < y; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.querySelector(".aside-right").appendChild(el);
        }
    }
}

class Counter extends HTMLElement {
    constructor() {
        super();
        this.pageNum;
    }
    getPageNumber() {
        this.pageNum = Router.getLocation().pageNum;
        if (!this.pageNum)
            this.pageNum = "";
        return (this.pageNum);
    }
    render() {
        this.getPageNumber();
        this.innerText = this.pageNum;
    }
}

customElements.define("notebook-page", NotebookPage);
customElements.define("page-counter", Counter);

var grid = document.querySelector("article.grid");
var page = document.querySelector("notebook-page");
var counter = document.querySelector("#page-num");

counter.render();
page.render();

grid.addEventListener("click", clickHandler);
grid.addEventListener("input", tabOnMaxLen);
grid.addEventListener("input", updateCellValue);
grid.addEventListener("keydown", gridNavHandler);
document.querySelector("#btn-next").addEventListener("click", nextPageHandler);
document.querySelector("#btn-prev").addEventListener("click", previousPageHandler);

// Event listeners. Mouse and keyboard controls. Navigation.

function clickHandler(e) {
    if (e.target && e.target.className == "cell") {
        e.target.focus();
    }
}

function tabOnMaxLen(e) {
    if (e.target &&
        e.target.className == "cell" &&
        e.target.value.length == e.target.maxLength) {
        if (e.target.nextSibling)
            e.target.nextSibling.focus();
    }
}

function updateCellValue(e) {
    //TODO rewrite as a Page method?
    if (e.target && e.target.className == "cell") {
        var value = e.target.value;
        var id = e.target.id;
        page.cells[id] = {
            value,
            id: Number(id)
        };
        Storage.updateStorageItem(Router.getLocation().pageNum, page);
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

function nextPageHandler() {
    Router.nextPage();
    page.render();
    counter.render();
}

function previousPageHandler() {
    Router.previousPage();
    page.render();
    counter.render();
}