import * as Storage from "./storage.js"
import * as Router from "./router.js"
import {
    Counter
} from "./Counter.js"

class NotebookPage extends HTMLElement {
    constructor() {
        super();
        this.pageNum;
        // this.cells = [];
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
        this.grid.cells = page.cells;
    }
    render(pageNum) {
        // var location = Router.getLocation();
        if ((typeof pageNum == "number" || typeof pageNum == "string") && !Number.isNaN(pageNum)) {
            this.counter.render(pageNum);
            if (pageNum != this.pageNum) {
                this.pageNum = pageNum;
                this.grid.cells = [];
            }
            if (this.grid.cells.length == 0)
                this.getValuesFromStorage(pageNum);
            if (!this.grid.querySelector("input.cell")) {
                this.grid.cells.forEach(this.createCell, this);
                this.createPaddingCells(28, 40);
            } else
                this.populateCells();
        } else {
            console.log("hide");
        }
    }
    populateCells() {
        this.grid.querySelectorAll("input.cell").forEach(updateValue, this.grid);

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
        if (e.target && e.target.className == "cell") {
            var value = e.target.value;
            var id = e.target.id.match(/\d+/)[0];
            this.cells[id] = {
                value,
                id: Number(id)
            };
            var pageObj = {
                cells: this.cells
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

customElements.define("notebook-page", NotebookPage);

export {
    NotebookPage
};