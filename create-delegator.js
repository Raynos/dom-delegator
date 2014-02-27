var uuid = require("uuid")

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
            id: opts.id || uuid(),
            target: target,
            listenTo: listenTo
        }

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
}
