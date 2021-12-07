import * as Router from "./router.js"
import {
    NotebookPage
} from "./NotebookPage.js";

class NotebookApp extends HTMLElement {
    constructor() {
        super();
        this.notebook = document.querySelector("main.notebook");
        this.nextButton = document.querySelector("#btn-next");
        this.addEventListener("click", this.nextPageHandler);
        this.addEventListener("click", this.previousPageHandler);
    }

    render() {
        if (!this.page) {
            this.page = document.createElement("notebook-page");
            this.notebook.appendChild(this.page);
        }
        this.page.render();
    }

    nextPageHandler(e) {
        if (e.target && e.target.id == "btn-next") {
            Router.nextPage();
            this.render();
        }
    }

    previousPageHandler(e) {
        if (e.target && e.target.id == "btn-prev") {
            Router.previousPage();
            this.render();
        }
    }
}

customElements.define("notebook-app", NotebookApp);

export {
    NotebookApp
};