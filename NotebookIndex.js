import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookIndex extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.generateShadowDOM();
        this.addListeners();
    }
    generateShadowDOM() {
        var stylesheet = document.createElement('link');
        stylesheet.setAttribute('href', '/index.css');
        stylesheet.setAttribute('rel', 'stylesheet');
        // var asideLeft = document.createElement('aside');
        // asideLeft.className = "aside-left";
        // var header = document.createElement('header');
        // var asideRight = document.createElement('aside');
        // asideRight.className = "aside-right";
        // this.grid = document.createElement('article');
        // this.grid.className = "grid";
        // var footer = document.createElement('footer');
        this.shadowRoot.appendChild(stylesheet);
        // this.shadowRoot.appendChild(asideLeft);
        // this.shadowRoot.appendChild(header);
        // this.shadowRoot.appendChild(this.grid);
        // this.shadowRoot.appendChild(footer);
        // this.shadowRoot.appendChild(asideRight);
    }
    addListeners() {
    }
    render() {
    }
}

customElements.define("notebook-index", NotebookIndex);

export {
    NotebookIndex
};