import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookPage extends HTMLElement {
    constructor() {
        super();
        this.pageNum;
        this.cells = [];
        this.attachShadow({
            mode: 'open'
        });
        this.generateShadowDOM();
        this.addListeners();
    }
    generateShadowDOM() {
        var stylesheet = document.createElement('link');
        stylesheet.setAttribute('href', '/page.css');
        stylesheet.setAttribute('rel', 'stylesheet');
        var asideLeft = document.createElement('aside');
        asideLeft.className = "aside-left";
        var header = document.createElement('header');
        var asideRight = document.createElement('aside');
        asideRight.className = "aside-right";
        this.grid = document.createElement('article');
        this.grid.className = "grid";
        var footer = document.createElement('footer');
        this.counter = document.createElement('page-counter');
        this.counter.id = "page-num";
        footer.appendChild(this.counter);
        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(asideLeft);
        this.shadowRoot.appendChild(header);
        this.shadowRoot.appendChild(this.grid);
        this.shadowRoot.appendChild(footer);
        this.shadowRoot.appendChild(asideRight);
    }
    addListeners() {
        this.grid.addEventListener("click", this.clickHandler);
        this.grid.addEventListener("input", this.tabOnMaxLen);
        this.grid.addEventListener("input", this.updateCellValue);
        this.grid.addEventListener("beforeinput", this.rewriteCell);
        this.grid.addEventListener("keydown", this.gridNavHandler);
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
            this.counter.render();
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
        this.page.querySelectorAll("input.cell").forEach(updateValue, this);

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
        cellElement.setAttribute('id', 'cell' + cell.id);
        this.grid.appendChild(cellElement);
    }
    createPaddingCells(x, y) {
        for (let i = 0; i < x - 2; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.shadowRoot.querySelector("header").appendChild(el);
        }
        for (let i = 0; i < x - 2; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.shadowRoot.querySelector("footer").appendChild(el);
        }
        for (let i = 0; i < y; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.shadowRoot.querySelector(".aside-left").appendChild(el);
        }
        for (let i = 0; i < y; i++) {
            let el = document.createElement("div");
            el.className = "cell";
            this.shadowRoot.querySelector(".aside-right").appendChild(el);
        }
    }

    rewriteCell(e) {
        var newValue = e.data;
        if (e.inputType == "deleteContentBackward")
            newValue = "";
        if (typeof newValue == "string" && e.data != e.target.value) {
            e.target.value = e.data;
            let event = new Event("input", {
                "bubbles": true
            });
            e.target.dispatchEvent(event);
        }
    }

    clickHandler(e) {
        if (e.target && e.target.className == "cell") {
            e.target.focus();
        }
    }

    tabOnMaxLen(e) {
        if (e.target &&
            e.target.className == "cell" &&
            e.target.value.length == e.target.maxLength) {
            if (e.target.nextSibling)
                e.target.nextSibling.focus();
        }
    }

    updateCellValue(e) {
        //TODO rewrite as a Page method?
        if (e.target && e.target.className == "cell") {
            var value = e.target.value;
            var id = e.target.id.match(/\d+/)[0];
            page.cells[id] = {
                value,
                id: Number(id)
            };
            var pageObj = {
                cells: page.cells
            };
            Storage.updateStorageItem(Router.getLocation().pageNum, pageObj);
        }
    }

    gridNavHandler(e) {
        if (e.key == "ArrowLeft" && e.target.previousSibling && e.target.previousSibling.className == "cell") {
            e.target.previousSibling.focus();
        }
        if (e.key == "ArrowRight" && e.target.nextSibling) {
            e.target.nextSibling.focus();
        }
        if (e.key == "Backspace" && e.target.previousSibling && e.target.value == "" && e.target.previousSibling.className == "cell") {
            e.target.previousSibling.focus();
        }
        if (e.key == "ArrowDown" && e.target.id) {
            let next = this.querySelector("#cell" + (Number(e.target.id.match(/\d+/)[0]) + 26));
            if (next) {
                next.focus();
            }
        }
        if (e.key == "ArrowUp" && e.target.id) {
            let next = this.querySelector("#cell" + (Number(e.target.id.match(/\d+/)[0]) - 26));
            if (next) {
                next.focus();
            }
        }
        if (e.key == "Enter" && e.target.id) {
            let next = this.querySelector("#cell" + (Math.floor(Number(e.target.id.match(/\d+/)[0]) / 26) + 1) * 26);
            if (next) {
                next.focus();
            }
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

var notebook = document.querySelector("main.notebook");
var page = document.createElement("notebook-page");
notebook.appendChild(page);
// var page2 = document.createElement("notebook-page");
// notebook.appendChild(page2);
page.render();
// page2.render();
document.querySelector("#btn-next").addEventListener("click", nextPageHandler);
document.querySelector("#btn-prev").addEventListener("click", previousPageHandler);

// Event listeners. Mouse and keyboard controls. Navigation.


function nextPageHandler() {
    Router.nextPage();
    page.render();
    // counter.render();
}

function previousPageHandler() {
    Router.previousPage();
    page.render();
    // counter.render();
}