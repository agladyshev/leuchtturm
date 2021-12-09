import * as Router from "./router.js"
import {
    NotebookPage
} from "./NotebookPage.js";
import { NotebookCover } from "./NotebookCover.js";
import { NotebookOwner } from "./NotebookOwner.js";
import { NotebookIndex } from "./NotebookIndex.js";

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
            this.createView("notebook-page");
            this.view.render(this.pageNum);
        } else if (location.pathname.match(/^\/index\/?$/)) {
            this.createView("notebook-index");
        } else if (location.pathname.match(/^\/owner\/?$/)) {
            this.createView("notebook-owner");
        }
        else if (location.pathname == "/") {
            this.createView("notebook-cover");
        }
        else {
            Router.navigate("/");
        }
    }
    createView(viewName) {
        if (this.view && this.view.tagName != viewName.toUpperCase()) {
            this.view.remove();
            this.view = null;
        }
        if (!this.view) {
            this.view = document.createElement(viewName);
            this.notebook.appendChild(this.view);
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