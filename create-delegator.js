var weakMap = require("weakmap")
var GevalEvent = require("geval/event")
var uuid = require("uuid")

var defaultMap = require("./event-map.js")
var listen = require("./listen.js")
var Sink = require("./sink.js")

var allEvents = [
    "blur", "focus", "focusin", "focusout", "load", "resize",
    "scroll", "unload", "click", "dblclick", "mousedown",
    "mouseup", "change", "select", "submit", "keydown",
    "keypress", "keyup", "error", "contextmenu"
]

module.exports = createDelegator

function createDelegator(surface) {
    return Delegator

    function Delegator(target, eventNames, opts) {
        var args = parseArgs(target, eventNames, opts)
        
        opts = args.opts

        if (!opts.map && opts.shared !== false) {
            opts.map = defaultMap
        }

        var map = opts.map || weakMap()
        map.id = map.id || uuid()
       
        var events = createEvents(map, args.eventNames)
        var delegator = {
            sources: events.sources,
            sinks: events.sinks,
            map: map,
            target: args.target
        }

        if (opts.defaultEvents !== false) {
            allEvents.forEach(function (eventName) {
                listen(delegator, eventName)
            })
        }

        return delegator
    }

    function parseArgs(target, eventNames, opts) {
        if (Array.isArray(target)) {
            eventNames = target
            target = null
        } else if (!surface.is(target)) {
            opts = target
            target = null
        }

        if (!Array.isArray(eventNames)) {
            opts = eventNames
            eventNames = null
        }

        opts = opts || {}
        eventNames = eventNames || []
        target = target || surface.defaultTarget

        return { opts: opts, eventNames: eventNames, target: target }
    }
}

function createEvents(map, eventNames) {
     var events = eventNames.reduce(function (acc, key) {
        acc[key] = GevalEvent()
        return acc
    }, {})

    var sources = Object.keys(events)
        .reduce(function (acc, key) {
            acc[key] = events[key].listen
            return acc
        }, {})

    var sinks = Object.keys(events)
        .reduce(function (acc, key) {
            acc[key] = new Sink({
                id: map.id,
                key: key,
                broadcast: events[key].broadcast,
                map: map
            })
            return acc
        }, {})

    return { sources: sources, sinks: sinks }
}
