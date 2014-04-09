var extend = require("xtend/mutable")

var getListener = require("./get-listener.js")

module.exports = listen

function listen(delegator, surface, eventName) {
    surface.addListener(delegator.target, eventName, function (ev) {
        var listener = getListener(surface, delegator.id,
            ev.target, eventName)

        if (!listener) {
            return
        }

        var arg = new ProxyEvent(ev, listener)

        listener.handlers.forEach(function (handler) {
            typeof handler === "function" ?
                handler(arg) : handler.handleEvent(arg)
        })
    })
}

function ProxyEvent(ev, listener) {
    this._rawEvent = ev
    extend(this, ev)
    this.currentTarget = listener.currentTarget
}

ProxyEvent.prototype.preventDefault = function () {
    this._rawEvent.preventDefault()
}
