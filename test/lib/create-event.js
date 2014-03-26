var DOMEvent = require("synthetic-dom-events")

module.exports = createEvent

function createEvent(type, attrs) {
    attrs = attrs || {}
    attrs.bubbles = true

    return DOMEvent(type, attrs)
}
