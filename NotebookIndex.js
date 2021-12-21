import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookIndex extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.generateShadowDOM();
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

        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(header);
        this.shadowRoot.appendChild(this.form);

        function generateIndexLine(i) {
            var line = document.createElement('div');
            line.className = "line";
            var numInput = document.createElement('input');
            numInput.className = "input-num";
            numInput.size = 3;
            numInput.setAttribute("aria-labelledby", "label-num");
            var textInput = document.createElement('input');
            textInput.className = "input-text";
            textInput.setAttribute("aria-labelledby", "label-text");
            line.appendChild(numInput);
            line.appendChild(textInput);
            line.id = "line-" + i;
            return line;
        }
    }
    getValuesFromStorage() {
        var owner;
        owner = Storage.getItem("owner");
        if (!owner) {
            owner = Storage.updateItem("owner", ["", "", "", "", "", ""]);
            owner = Storage.getItem("owner");
        }
        this.form.ownerInfo = owner;
    }
    // addListeners() {}
    updateInputValue(e) {
        if (e.target && e.target.tagName == "INPUT") {
            var value = e.target.value;
            // var id = e.target.id.match(/\d+/)[0];
            // this.ownerInfo[id] = value;
            // Storage.updateItem("owner", this.ownerInfo);
        }
    }
    render() {
        this.getValuesFromStorage();
        this.form.querySelectorAll("input").forEach(function setInputValue(input, index) {
            input.value = this.ownerInfo[index];
        }.bind(this.form));
    }
}

customElements.define("notebook-index", NotebookIndex);

export {
    NotebookIndex
};