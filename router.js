var location = resolvePath() || {};

function getLocation() {
    return location;
}

function resolvePath() {
    var location = {};
    location.pathname = document.location.pathname;
    if (location.pathname.includes("page")) {
        // location.page = "dotted";
        location.pageNum = location.pathname.replace(/\D/g, "");
    } else if (location.pathname == "/") {
        // location.page = "main";
        location.pageNum = 1;
    }
    return location;
}

function navigate(path) {
    // var state = { id: location.pageNum };
    var state = {};
    history.pushState({ state }, '', `/`);
    sendPopState(state);

}

function nextPage() {
    if (!location.pageNum)
        location.pageNum = 1;
    if (location.pageNum < 100) {
        location.pageNum++;
        var state = { id: location.pageNum };
        history.pushState({
            state
        }, '', `/page/${location.pageNum}`);
        sendPopState(state);
    }
}

function previousPage() {
    if (!location.pageNum)
        location.pageNum = 1;
    if (location.pageNum > 1) {
        location.pageNum--;
        var state = { id: location.pageNum };
        history.pushState({
            state
        }, '', `/page/${location.pageNum}`);
        sendPopState(state);
    }
}

function sendPopState(state) {
    var popStateEvent = new PopStateEvent('popstate', { state: state });
    dispatchEvent(popStateEvent);
}

export {
    resolvePath,
    nextPage,
    previousPage,
    getLocation,
    navigate
};