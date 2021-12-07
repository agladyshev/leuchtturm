import * as Router from "./router.js"

class Counter extends HTMLElement {
    constructor() {
        super();
        this.pageNum;
    }
    getPageNumber() {
        this.pageNum = Router.getLocation().pageNum;
        if (!this.pageNum)
            this.pageNum = "";
        return (this.pageNum);
    }
    render() {
        this.getPageNumber();
        this.innerText = this.pageNum;
    }
}

customElements.define("page-counter", Counter);

export {
    Counter
};