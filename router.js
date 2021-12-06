var location = resolvePath() || {};

function getLocation() {
    return location;
}

function resolvePath() {
    var location = {};
    location.pathname = document.location.pathname;
    if (location.pathname.includes("page")) {
        location.pageNum = location.pathname.replace(/\D/g, "");
    } else if (location.pathname == "/")
        location.pageNum = 1;
    return location;
}

function nextPage() {
    if (!location.pageNum)
        location.pageNum = 1;
    if (location.pageNum < 100) {
        location.pageNum++;
        history.pushState({
            id: location.pageNum
        }, '', `/page/${location.pageNum}`);
    }
}

function previousPage() {
    if (!location.pageNum)
        location.pageNum = 1;
    if (location.pageNum > 1) {
        location.pageNum--;
        history.pushState({
            id: location.pageNum
        }, '', `/page/${location.pageNum}`);
    }
}

export {
    resolvePath,
    nextPage,
    previousPage,
    getLocation
};