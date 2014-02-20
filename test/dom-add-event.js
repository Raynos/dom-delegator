var test = require("tape")
var h = require("hyperscript")
var uuid = require("uuid")
var DOMEvent = require("synthetic-dom-events")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var Delegator = require("../index.js")
var addEvent = require("../add-event.js")

function createEvent(type, attrs) {
    attrs = attrs || {}
    attrs.bubbles = true

    return DOMEvent(type, attrs)
}

test("Delegator is a function", function (assert) {
    assert.equal(typeof Delegator, "function")
    assert.end()
})

test("can listen to events", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem, ["foo"])
    var called = 0
    var id = uuid()

    addEvent(elem, "click", d.sinks.foo, {
        id: id
    })

    d.sources.foo(function (tuple) {
        called++

        assert.ok("value" in tuple)
        assert.ok("ev" in tuple)

        assert.equal(tuple.ev, null)
        assert.equal(tuple.value.id, id)
    })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(called, 1)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("can set different data on same sink", function (assert) {
    var elem = h(".foo", [
        h(".bar"),
        h(".baz")
    ])
    document.body.appendChild(elem)

    var d = Delegator(elem, ["foo"])
    var foo = d.sinks.foo
    var tuples = []

    addEvent(elem.querySelector(".bar"), "click", foo, {
        name: "bar"
    })

    addEvent(elem.querySelector(".baz"), "click", foo, {
        name: "baz"
    })

    d.sources.foo(function (tuple) {
        tuples.push(tuple)
    })

    var ev = createEvent("click")
    elem.querySelector(".bar").dispatchEvent(ev)

    var ev2 = createEvent("click")
    elem.querySelector(".baz").dispatchEvent(ev2)

    setImmediate(function () {
        assert.equal(tuples.length, 2)
        assert.equal(tuples[0].value.name, "bar")
        assert.equal(tuples[1].value.name, "baz")

        document.body.removeChild(elem)
        assert.end()
    })
})

test("can register multiple sinks", function (assert) {
    var elem = h(".foo", [
        h(".bar"),
        h(".baz")
    ])
    document.body.appendChild(elem)

    var d = Delegator(elem, ["bar", "baz"])
    var bar  = d.sinks.bar, baz = d.sinks.baz
    var events = {}

    addEvent(elem.querySelector(".bar"), "click", bar, {
        name: "baz"
    })

    addEvent(elem.querySelector(".baz"), "click", baz, {
        name: "bar"
    })

    d.sources.bar(function (tuple) {
        events.bar = tuple
    })

    d.sources.baz(function (tuple) {
        events.baz = tuple
    })

    var ev = createEvent("click")
    elem.querySelector(".bar").dispatchEvent(ev)

    var ev2 = createEvent("click")
    elem.querySelector(".baz").dispatchEvent(ev2)

    setImmediate(function () {
        assert.ok("bar" in events)
        assert.ok("baz" in events)
        assert.equal(events.bar.value.name, "baz")
        assert.equal(events.baz.value.name, "bar")

        document.body.removeChild(elem)
        assert.end()
    })
})
