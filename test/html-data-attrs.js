var test = require("tape")
var h = require("hyperscript")
var DOMEvent = require("synthetic-dom-events")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var Delegator = require("../index.js")
var event = require("../event.js")

function createEvent(type, attrs) {
    attrs = attrs || {}
    attrs.bubbles = true

    return DOMEvent(type, attrs)
}

test("can listen to events through data-", function (assert) {
    var d = Delegator(["foo"])
    var sinks = d.sinks
    var tuples = []

    var elem = h("div", {
        "data-click": event(sinks.foo, { bar: "baz" })
    })
    document.body.appendChild(elem)

    d.sources.foo(function (tuple) {
        tuples.push(tuple)
    })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(tuples.length, 1)
        assert.equal(tuples[0].value.bar, "baz")

        document.body.removeChild(elem)
        assert.end()
    })
})
