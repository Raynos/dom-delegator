var extend = require("xtend/mutable")

var getListener = require("./get-listener.js")

module.exports = listen

function listen(delegator, eventName) {
    delegator.target.addEventListener(eventName, function (ev) {
        var listener = getListener(ev.target, eventName)
        if (!listener) {
            return
        }

        var arg = new ProxyEvent(ev, listener)

        listener.handlers.forEach(function (handler) {
            typeof handler === "function" ?
                handler(arg) : handler.handleEvent(arg)
        })
    }, true)
}

function ProxyEvent(ev, listener) {
    this._rawEvent = ev
    extend(this, ev)
    this.currentTarget = listener.currentTarget
}

ProxyEvent.prototype.preventDefault = function () {
    this._rawEvent.preventDefault()
}
