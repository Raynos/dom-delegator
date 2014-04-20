var document = require("global/document")
var DataSet = require("data-set")

var addEvent = require("./add-event.js")
var ProxyEvent = require("./proxy-event.js")

module.exports = DOMDelegator

function DOMDelegator() {
    this.target = document.documentElement
    this.events = {}
    this.listeners = {}
}

DOMDelegator.prototype.addEventListener = addEvent

DOMDelegator.prototype.listenTo = function listenTo(eventName) {
    if (this.events[eventName]) {
        return
    }

    this.events[eventName] = true
    listen(this, eventName)
}

DOMDelegator.prototype.unlistenTo = function unlistenTo(eventName) {
    if (!this.events[eventName]) {
        return
    }

    this.events[eventName] = false
    unlisten(this, eventName)
}

function listen(delegator, eventName) {
    var listener = delegator.listeners[eventName]

    if (!listener) {
        listener = delegator.listeners[eventName] =
            createHandler(eventName)
    }

    delegator.target.addEventListener(eventName, listener, true)
}

function unlisten(delegator, eventName) {
    var listener = delegator.listeners[eventName]

    if (!listener) {
        throw new Error("dom-delegator#unlistenTo: cannot " +
            "unlisten to " + eventName)
    }

    delegator.target.removeEventListener(eventName, listener, true)
}

function createHandler(eventName) {
    return handler

    function handler(ev) {
        var listener = getListener(ev.target, eventName)
        if (!listener) {
            return
        }

        var arg = new ProxyEvent(ev, listener)

        listener.handlers.forEach(function (handler) {
            typeof handler === "function" ?
                handler(arg) : handler.handleEvent(arg)
        })
    }
}

function getListener(target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handler = ds[type]
    var allHandler = ds.event

    if (!handler && !allHandler) {
        return getListener(target.parentNode, type)
    }

    var handlers = [].concat(handler || [], allHandler || [])
    return new Listener(target, handlers)
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}
