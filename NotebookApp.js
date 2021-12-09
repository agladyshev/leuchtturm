import * as Router from "./router.js"
import {
    NotebookPage
} from "./NotebookPage.js";
import { NotebookCover } from "./NotebookCover.js";

class NotebookApp extends HTMLElement {
    constructor() {
        super();
        this.notebook = document.querySelector("main.notebook");
        this.nextButton = document.querySelector("#btn-next");
        this.addEventListener("click", this.nextPageHandler);
        this.addEventListener("click", this.previousPageHandler);
        window.addEventListener("popstate", this.render.bind(this));
    }

    render() {
        if (location.pathname.match(/^\/page\/([0-9]+)\/?$/)) {
            this.pageNum = location.pathname.replace(/\D/g, "");
            if (this.view && this.view.tagName != "NOTEBOOK-PAGE") {
                this.view.remove();
                this.view = null;
            }
            if (!this.view) {
                this.view = document.createElement("notebook-page");
                this.notebook.appendChild(this.view);
            }
            this.view.render(this.pageNum);
        } else if (location.pathname == "/") {
            if (this.view && this.view.tagName != "NOTEBOOK-COVER") {
                this.view.remove();
            }
            this.view = document.createElement("notebook-cover");
            console.log(this.view);
            this.notebook.appendChild(this.view);
        }
        else {
            Router.navigate("/");
        }
    }

    nextPageHandler(e) {
        if (e.target && e.target.id == "btn-next") {
            Router.nextPage();
            // this.render();
        }
    }

    previousPageHandler(e) {
        if (e.target && e.target.id == "btn-prev") {
            Router.previousPage();
            // this.render();
        }
    }
}

customElements.define("notebook-app", NotebookApp);

export {
    NotebookApp
};