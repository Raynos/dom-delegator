var cuid = require("cuid")

var defaultListen = require("./listen.js")

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

        var listen = opts.listen || surface.listen || defaultListen
        var delegator = {
            id: opts.id || cuid(),
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
