import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookIndex extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.generateShadowDOM();
        this.form.enableButton = function enableButton(button, i) {
            var pageNum = button.form.index[i].page;
            if (typeof pageNum == "string" && pageNum != "") {
                button.disabled = false;
                button.style.display = "block";
            } else {
                button.disabled = true;
                button.style.display = "none";
            }
        }
        // this.addListeners();
    }
    generateShadowDOM() {
        var stylesheet = document.createElement('link');
        stylesheet.setAttribute('href', '/index.css');
        stylesheet.setAttribute('rel', 'stylesheet');
        var header = document.createElement('header');
        header.innerHTML = "<h5>INHALT / CONTENT / CONTENU</h5>";

        this.form = document.createElement('form');
        this.form.appendChild(generateIndexLine(0));

        var labels = document.createElement('div');
        labels.className = "labels";
        var labelNum = document.createElement('label');
        labelNum.innerHTML = "SEITE / PAGE";
        labelNum.id = "label-num";
        var labelText = document.createElement('label');
        labelText.innerText = "THEMA / TOPIC / SUJET";
        labelText.id = "label-text";
        labels.appendChild(labelNum);
        labels.appendChild(labelText);
        this.form.appendChild(labels);

        for (let i = 1; i < 29; i++) {
            this.form.appendChild(generateIndexLine(i));
        }
        this.form.addEventListener("input", this.updateInputValue);
        this.form.addEventListener("click", this.navigateToPage);

        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(header);
        this.shadowRoot.appendChild(this.form);

        function generateIndexLine(i) {
            var line = document.createElement('div');
            line.className = "line";
            var numInput = document.createElement('input');
            numInput.className = "input-num";
            numInput.id = `input-num-${i}`
            numInput.type = "number";
            numInput.inputMode = "numeric";
            numInput.min = 1;
            numInput.max = 100;
            numInput.setAttribute("aria-labelledby", "label-num");
            var textInput = document.createElement('input');
            textInput.className = "input-text";
            textInput.id = `input-text-${i}`
            textInput.setAttribute("aria-labelledby", "label-text");
            var navArrow = document.createElement("button");
            navArrow.className = "nav-arrow";
            navArrow.innerText = "〉";
            navArrow.id = `button-arrow-${i}`;
            navArrow.disabled = true;
            navArrow.style.display = "none";
            line.appendChild(numInput);
            line.appendChild(textInput);
            line.appendChild(navArrow);
            line.id = "line-" + i;
            return line;
        }
    }
    getValuesFromStorage() {
        var index;
        index = Storage.getItem("index");
        if (!index) {
            let arr = [];
            for (let i = 0; i < 29; i++) {
                let obj = {
                    page: "",
                    topic: ""
                };
                arr.push(obj);
            }
            index = Storage.updateItem("index", arr);
            index = Storage.getItem("index");
        }
        this.form.index = index;
    }
    // addListeners() {}
    updateInputValue(e) {
        if (e.target && e.target.tagName == "INPUT") {
            var value = e.target.value;
            if (e.target.type == "number" && (value == "" || e.data == "."))
                e.target.value = value;
            if (e.target.type == "number" && !isNaN(value) && value > 100) {
                value = "100";
                e.target.value = "100";
            }
            var id = e.target.id.match(/\d+/)[0];
            if (e.target.type == "number") {
                this.index[id].page = value;
                Storage.updateItem("index", this.index);
                let btn = e.target.form.querySelector(`#button-arrow-${id}`);
                this.enableButton(btn, id);
            } else if (e.target.type = "text") {
                this.index[id].topic = value;
                Storage.updateItem("index", this.index);
            }
        }
    }
    navigateToPage(e) {
        e.preventDefault();
        if (e.target && e.target.className == "nav-arrow") {
            var id = e.target.id.match(/\d+/)[0];
            var pageNum = (e.target.form.index[id].page);
            if (typeof pageNum == "string" && pageNum != "")
                Router.navigate(`/page/${pageNum}`);
        }
    }
    render() {
        this.getValuesFromStorage();
        this.form.querySelectorAll("input").forEach(function setInputValue(input, i) {
            i = Math.floor(i / 2);
            if (input.type == "number")
                input.value = this.index[i].page;
            else if (input.type == "text")
                input.value = this.index[i].topic;
        }.bind(this.form));
        this.renderButtons();
    }
    renderButtons() {
        this.form.querySelectorAll("button.nav-arrow").forEach(this.form.enableButton);
    }

}
customElements.define("notebook-index", NotebookIndex);

export {
    NotebookIndex
};