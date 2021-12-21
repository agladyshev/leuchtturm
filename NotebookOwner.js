import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookOwner extends HTMLElement {
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
        stylesheet.setAttribute('href', '/owner.css');
        stylesheet.setAttribute('rel', 'stylesheet');
        var header = document.createElement('header');
        header.innerHTML = `
        <h6>bitte zurücksenden an</h6>
        <h6>please return to</h6>
        <h6> veuillez s.v.p. retourner à</h6>
        `
        this.form = document.createElement('form');
        for (let i = 0; i < 6; i++) {
            let line = document.createElement('input');
            line.id = "line-" + i;
            this.form.appendChild(line);
        }
        var footer = document.createElement('footer');
        footer.innerHTML = `
        <h6>herzlichen dank</h6>
        <h6>thank you very much</h6>
        <h6>merci beaucoup</h6>
        `
        this.form.addEventListener("input", this.updateInputValue);
        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(header);
        this.shadowRoot.appendChild(this.form);
        this.shadowRoot.appendChild(footer);
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
            var id = e.target.id.match(/\d+/)[0];
            this.ownerInfo[id] = value;
            Storage.updateItem("owner", this.ownerInfo);
        }
    }
    render() {
        this.getValuesFromStorage();
        this.form.querySelectorAll("input").forEach(function setInputValue(input, index) {
            input.value = this.ownerInfo[index];
        }.bind(this.form));
    }
}

customElements.define("notebook-owner", NotebookOwner);

export {
    NotebookOwner
};