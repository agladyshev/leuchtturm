function createPage(pageNum) {
    var page = {};
    page.cells = [];
    for (let j = 0; j < 26 * 38; j++) {
        page.cells.push({
            value: "",
            id: j
        });
    }
    localStorage.setItem(pageNum, JSON.stringify(page));
    return page;
}

function updateItem(itemName, item) {
    localStorage.setItem(itemName, JSON.stringify(item));
}

function getItem(itemName) {
    return JSON.parse(localStorage.getItem(itemName));
}

export {
    createPage,
    updateItem,
    getItem
};