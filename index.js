import * as Router from "./router.js"
import {
    NotebookPage
} from "./NotebookPage.js";

var notebook = document.querySelector("main.notebook");
var page = document.createElement("notebook-page");
notebook.appendChild(page);
page.render();

document.querySelector("#btn-next").addEventListener("click", nextPageHandler);
document.querySelector("#btn-prev").addEventListener("click", previousPageHandler);

function nextPageHandler() {
    Router.nextPage();
    page.render();
    // counter.render();
}

function previousPageHandler() {
    Router.previousPage();
    page.render();
    // counter.render();
}