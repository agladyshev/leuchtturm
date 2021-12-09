function navigate(path) {
    // var state = { id: location.pageNum };
    var state = {};
    history.pushState({ state }, '', path);
    sendPopState(state);

}

function sendPopState(state) {
    var popStateEvent = new PopStateEvent('popstate', { state: state });
    dispatchEvent(popStateEvent);
}

export {
    navigate
};