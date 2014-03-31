var DataSet = require("data-set")

module.exports = getListener

function getListener(surface, id, target, type) {
    // terminate recursion if parent is `null`
    if (target === null) {
        return null
    }

    var ds = DataSet(target)
    // fetch list of handler fns for this event
    var handlers = getHandlers(ds[type] || {}, ds.event || {}, id)

    if (!handlers) {
        return getListener(surface, id,
            surface.getParent(target), type)
    }

    return new Listener(target, handlers)
}

function getHandlers(events, allEvents, id) {
    // support { handleEvent: Function, id: String }
    // and Object<id: String, Function | { handleEvent: Function }>
    var handler = events.id === id ? events : events[id]
    var allHandler = allEvents.id === id ? allEvents : allEvents[id]

    // return null if nothing else flatten into one array
    return !handler && !allHandler ?
        null : [].concat(handler || [], allHandler || [])
}

function Listener(target, handlers) {
    this.currentTarget = target
    this.handlers = handlers
}
