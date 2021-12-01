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
            num: i,
            cells: cells
        })
    }
    localStorage.setItem('pages', JSON.stringify(pages));
}

export {
    initializeStorage
};