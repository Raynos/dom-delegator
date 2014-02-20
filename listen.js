var  getListener = require("./get-listener.js")

module.exports = listen

function listen(surface, delegator, eventName) {
    var target = delegator.target
    var map = delegator.map

    surface.addListener(target, eventName, function (ev) {
        var listener = getListener(surface, map, ev.target, eventName)

        if (!listener) {
            return
        }

        listener.sink.dispatch(listener, ev)
    })
}
