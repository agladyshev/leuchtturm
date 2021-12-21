import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookOwner extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.generateShadowDOM();
        this.addListeners();
        this.owner;
    }
    generateShadowDOM() {
        var stylesheet = document.createElement('link');
        stylesheet.setAttribute('href', '/owner.css');
        stylesheet.setAttribute('rel', 'stylesheet');
        // var footer = document.createElement('footer');
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
        this.form.addEventListener("input", this.updateCellValue);
        this.shadowRoot.appendChild(stylesheet);
        this.shadowRoot.appendChild(header);
        this.shadowRoot.appendChild(this.form);
        this.shadowRoot.appendChild(footer);
    }
    getValuesFromStorage() {
        var owner;
        owner = JSON.parse(localStorage.getItem("owner"));
        if (!owner) {
            owner = localStorage.setItem("owner", ["", "", "", "", "", ""]);
            owner = localStorage.getItem("owner");
        }
        this.owner = owner;
    }
    addListeners() {}
    // updateCellValue(e) {
    //     //TODO rewrite as a Page method?
    //     if (e.target && e.target.tagName == "INPUT") {
    //         var value = e.target.value;
    //         console.log(value);
    //         var id = e.target.id.match(/\d+/)[0];
    //         console.log(id);
    //         this.owner[id] = value;
    //         console.log(this);
    //         console.log(this.owner);
    //         // this.cells[id] = {
    //         // value,
    //         // id: Number(id)
    //         // };
    //         // var pageObj = {
    //         // cells: this.cells
    //         // };
    //         // Storage.updateStorageItem(Router.getLocation().pageNum, pageObj);
    //     }
    // }
    render() {
        this.getValuesFromStorage();
        this.form.querySelectorAll("input").forEach(function setInputValue(input, index) {
            input.value = this.owner[index];
        }.bind(this))
    }
}

customElements.define("notebook-owner", NotebookOwner);

export {
    NotebookOwner
};