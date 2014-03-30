var extend = require("xtend")

module.exports = listen

function listen(surface, delegator, eventName) {
    var target = delegator.target
    var id = delegator.id
    var getListener = surface.getListener

    surface.addListener(target, eventName, function (ev) {
        var listener = getListener(surface, id, ev.target, eventName)

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
