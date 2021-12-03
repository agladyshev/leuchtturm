function initializeStorage() {
    localStorage.clear();
    var pages = [];
    for (let i = 0; i < 100; i++) {
        let cells = [];
        for (let j = 0; j < 26 * 38; j++) {
            cells.push({
                value: "",
                id: j
            });
        }
        pages.push({
            // num: i,
            cells: cells
        })
    }
    pages.forEach((page, index) => localStorage.setItem(index, JSON.stringify(page)));
}

function updateStorageItem(itemName, item) {
    console.log("here");
    console.log(typeof itemName);
    console.log(item);
    localStorage.setItem(itemName - 1, JSON.stringify(item));
    console.log(localStorage.getItem(itemName - 1));
}

export {
    initializeStorage,
    updateStorageItem
};