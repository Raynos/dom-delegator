var extend = require("xtend")

var getListener = require("./get-listener.js")

module.exports = listen

function listen(delegator, surface, eventName) {
    surface.addListener(delegator.target, eventName, function (ev) {
        var listener = getListener(surface, delegator.id,
            ev.target, eventName)

        if (!listener) {
            return
        }

        var arg = extend(ev, {
            currentTarget: listener.currentTarget
        })

        listener.handlers.forEach(function (handler) {
            typeof handler === "function" ?
                handler(arg) : handler.handleEvent(arg)
        })
    })
}
