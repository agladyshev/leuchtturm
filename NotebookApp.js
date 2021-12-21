import * as Router from "./router.js"
import {
    NotebookPage
} from "./NotebookPage.js";
import {
    NotebookCover
} from "./NotebookCover.js";
import {
    NotebookOwner
} from "./NotebookOwner.js";
import {
    NotebookIndex
} from "./NotebookIndex.js";
var paths = {
    views: ["/", "/owner", "/index", "/page/1"],
    pagesMax: 100,
    getNextPath() {
        if (location.pathname.match(/^\/page\/([0-9]+)\/?$/)) {
            let pageNum = location.pathname.replace(/\D/g, "");
            if (pageNum == this.pagesMax)
                return (location.pathname);
            else
                return (`/page/${Number(pageNum) + 1}`);
        } else {
            let current = this.views.indexOf(location.pathname);
            if (current + 1 == this.views.length)
                return (location.pathname);
            else
                return (this.views[current + 1])
        }
    },
    getPrevPath() {
        if (location.pathname.match(/^\/page\/([0-9]+)\/?$/)) {
            let pageNum = location.pathname.replace(/\D/g, "");
            if (pageNum != 1) {
                return (`/page/${Number(pageNum) - 1}`);
            }
        }
        let current = this.views.indexOf(location.pathname);
        if (current == 0)
            return (location.pathname);
        else
            return (this.views[current - 1])

    }
}

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
            let pageNum = location.pathname.replace(/\D/g, "");
            if (pageNum > paths.pagesMax) {
                Router.navigate("/");
            } else {
                this.createView("notebook-page");
                this.view.render(pageNum);
            }
        } else if (location.pathname.match(/^\/index\/?$/)) {
            this.createView("notebook-index");
            this.view.render();
        } else if (location.pathname.match(/^\/owner\/?$/)) {
            this.createView("notebook-owner");
            this.view.render();
        } else if (location.pathname == "/") {
            this.createView("notebook-cover");
        } else {
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
            Router.navigate(paths.getNextPath());
            // Router.nextPage();
            // this.render();
        }
    }

    previousPageHandler(e) {
        if (e.target && e.target.id == "btn-prev") {
            Router.navigate(paths.getPrevPath());
            // Router.previousPage();
            // this.render();
        }
    }
}

customElements.define("notebook-app", NotebookApp);

export {
    NotebookApp
};