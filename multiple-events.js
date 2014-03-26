multipleEvents.MultiHandler = MultiHandler

module.exports = multipleEvents

function multipleEvents() {
    var handles = parseHandles(arguments)

    return new MultiHandler(handles)
}

function MultiHandler(handles) {
    if (!(this instanceof MultiHandler)) {
        return new MultiHandler(handles)
    }

    this.handles = handles
}

MultiHandler.prototype.handleEvent = function (ev) {
    for (var i = 0, ii = this.handles.length; i < ii; i++) {
        this.handles[i].handleEvent(ev)
    }
}

function parseHandles(list) {
    var result = []

    for (var i = 0, ii = list.length; i < ii; i++) {
        var fn = list[i]

        if (typeof fn === "function") {
            result.push(new EventHandler(fn))
        } else if (Array.isArray(fn.handles)) {
            result.push.apply(result, fn.handles)
        } else if (typeof fn.handleEvent === "function") {
            result.push(fn)
        }
    }

    return result
}

function EventHandler(fn) {
    this.handleEvent = fn
}
