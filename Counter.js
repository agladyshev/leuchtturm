import * as Router from "./router.js"

class Counter extends HTMLElement {
    constructor() {
        super();
        // this.pageNum;
    }
    // getPageNumber() {
    // this.pageNum = Router.getLocation().pageNum;
    // if (!this.pageNum)
    // this.pageNum = "";
    // return (this.pageNum);
    // }
    render(pageNum) {
        // this.getPageNumber();
        this.innerText = pageNum;
    }
}

customElements.define("page-counter", Counter);

export {
    Counter
};