var weakMap = require("weakmap")
var GevalEvent = require("geval/event")
var uuid = require("uuid")

var listen = require("./listen.js")
var Sink = require("./sink.js")

var DEFAULT_MAP = require("./constants/event-map.js")
var DELIMINATOR = require("./constants/deliminator.js")
var ID_SEPERATOR = require("./constants/id-seperator.js")
var SINK_MAP = require("./constants/sink-map.js")

module.exports = createDelegator

function createDelegator(surface) {
    return Delegator

    function Delegator(target, eventNames, opts) {
        var args = parseArgs(target, eventNames, opts)
        
        opts = args.opts

        if (!opts.map && opts.global === true) {
            opts.map = DEFAULT_MAP
        }

        var map = opts.map || weakMap()
        var id = map.id || opts.id || uuid()
        map.id = id

        var events = createEvents(map, args.eventNames)
        var delegator = {
            sources: events.sources,
            sinks: events.sinks,
            map: map,
            target: args.target,
            listenTo: listenTo
        }
        SINK_MAP[id] = events.sinks

        if (opts.defaultEvents !== false) {
            surface.allEvents.forEach(function (eventName) {
                listen(surface, delegator, eventName)
            })
        }

        return delegator

        function listenTo(eventName) {
            listen(surface, delegator, eventName)
        }
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

        var replaceDelimRegex = new RegExp(DELIMINATOR, "g")
        var replaceSepRegex = new RegExp(ID_SEPERATOR, "g")

        eventNames = eventNames.map(function (eventName) {
            return eventName
                .replace(replaceDelimRegex, "")
                .replace(replaceSepRegex, "")
        })

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
