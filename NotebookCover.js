import * as Storage from "./storage.js"
import * as Router from "./router.js"

class NotebookCover extends HTMLElement {
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
        stylesheet.setAttribute('href', '/cover.css');
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
        var svgBookClosure = document.createElement("div");
        svgBookClosure.className = "svg-container";
        svgBookClosure.innerHTML = `
                    <svg class="icon" id="wave" viewBox="0 0 150 300" preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <line id="line1" x1="10" x2="10" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line2" x1="20" x2="20" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line3" x1="30" x2="30" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line4" x1="40" x2="40" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line5" x1="50" x2="50" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line6" x1="60" x2="60" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line7" x1="70" x2="70" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line8" x1="80" x2="80" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line9" x1="90" x2="90" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line10" x1="100" x2="100" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line11" x1="110" x2="110" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line12" x1="120" x2="120" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line13" x1="130" x2="130" y1="0" y2="300" stroke="black" stroke-width="5" />
                    <line id="line14" x1="140" x2="140" y1="0" y2="300" stroke="black" stroke-width="5" />
                </svg>
        `
        this.shadowRoot.appendChild(svgBookClosure);
        // this.shadowRoot.appendChild(asideLeft);
        // this.shadowRoot.appendChild(header);
        // this.shadowRoot.appendChild(this.grid);
        // this.shadowRoot.appendChild(footer);
        // this.shadowRoot.appendChild(asideRight);
    }
    addListeners() {}
    render() {}
}

customElements.define("notebook-cover", NotebookCover);

export {
    NotebookCover
};