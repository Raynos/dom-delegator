var cuid = require("cuid")

var addEvent = require("./add-event.js")
var listen = require("./listen.js")

module.exports = createDelegator

function createDelegator(surface) {
    return Delegator

    function Delegator(target, opts) {
        if (!surface.is(target)) {
            opts = target
            target = null
        }
        
        target = target || surface.defaultTarget
        opts = opts || {}

        var delegator = {
            id: opts.id || cuid(),
            target: target,
            listenTo: listenTo,
            addEventListener: addEventListener
        }

        if (opts.defaultEvents !== false) {
            surface.allEvents.forEach(function (eventName) {
                listen(delegator, surface, eventName)
            })
        }

        return delegator

        function addEventListener(target, type, handler) {
            addEvent(delegator.id, target, type, handler)
        }

        function listenTo(eventName) {
            listen(delegator, surface, eventName)
        }
    }
}
