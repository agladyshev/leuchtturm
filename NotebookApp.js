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
        window.addEventListener("popstate", this.render.bind(this));
    }

    render() {
        if (location.pathname.match(/^\/page\/([0-9]+)\/?$/)) {
            this.pageNum = location.pathname.replace(/\D/g, "");
            if (!this.page) {
                this.page = document.createElement("notebook-page");
                this.notebook.appendChild(this.page);
            }
            this.page.render(this.pageNum);
        } else if (location.pathname == "/") {
            // location.pageNum = 1;
            console.log("here2")
        }
        else {
            console.log("here3");
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