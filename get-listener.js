var DataSet = require("data-set")

module.exports = getListener

function getListener(surface, id, target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handlers = getHandlers(ds[type], ds.event, id)
    if (!handlers) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    return new Listener(target, handlers)
}

function getHandlers(events, allEvents, id) {
    var handler = parseHandler(events || {}, id)
    var allHandler = parseHandler(allEvents || {}, id)

    // return null if nothing else flatten into one array
    return !handler && !allHandler ?
        null : [].concat(handler || [], allHandler || [])
}

// support { handleEvent: Function, id: String }
// and Array<{ handleEvent: Function, id: String }
// and Object<id: String, Function | { handleEvent: Function }>
function parseHandler(hash, id) {
    if (hash.id === id) {
        return hash
    } else if (Array.isArray(hash)) {
        return hash.filter(function (ev) { return ev.id === id })
    } else {
        return hash[id]
    }
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}
