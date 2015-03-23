(function(w) {
    if (w.requestAnimationFrame) return;
    if ((w.requestAnimationFrame = w.webkitRequestAnimationFrame) &&
        (w.cancelAnimationFrame = w.webkitCancelAnimationFrame)) return;
    var lastTime = 0;
    w.requestAnimationFrame = function(callback) {
        var currTime = new Date().getTime(),
            timeToCall = Math.max(0, 16 - (currTime - lastTime)),
            id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };
    w.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    }
}(window));
