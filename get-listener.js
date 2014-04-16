var DataSet = require("data-set")

module.exports = getListener

function getListener(surface, target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handlers = getHandlers(ds[type], ds.event)
    if (!handlers) {
        return getListener(surface, surface.getParent(target), type)
    }

    return new Listener(target, handlers)
}

function getHandlers(handler, allHandler) {
    var result = null

    if (handler) {
        result = result || []
        if (Array.isArray(handler)) {
            result.push.apply(result, handler)
        } else {
            result.push(handler)
        }
    }

    if (allHandler) {
        result = result || []
        if (Array.isArray(allHandler)) {
            result.push.apply(result, allHandler)
        } else {
            result.push(allHandler)
        }
    }

    return result
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}
