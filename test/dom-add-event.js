var test = require("tape")
var cuid = require("cuid")
var setImmediate = require("timers").setImmediate
var document = require("global/document")
var EventSinks = require("event-sinks/geval")

var h = require("./lib/h.js")
var addSinkEvent = require("./lib/add-sink-event.js")
var createEvent = require("./lib/create-event.js")

var Delegator = require("../index.js")

test("Delegator is a function", function (assert) {
    assert.equal(typeof Delegator, "function")
    assert.end()
})

test("can listen to events", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var events = EventSinks(d.id, ["foo"])
    var called = 0
    var id = cuid()

    addSinkEvent(elem, "click", events.sinks.foo, {
        id: id
    })

    events.foo(function (value) {
        called++

        assert.equal(value.id, id)
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
    var elem = h("foo", [
        h("bar"),
        h("baz")
    ])
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var events = EventSinks(d.id, ["foo"])
    var foo = events.sinks.foo
    var values = []

    addSinkEvent(elem.childNodes[0], "click", foo, {
        name: "bar"
    })

    addSinkEvent(elem.childNodes[1], "click", foo, {
        name: "baz"
    })

    events.foo(function (value) {
        values.push(value)
    })

    var ev = createEvent("click")
    elem.childNodes[0].dispatchEvent(ev)

    var ev2 = createEvent("click")
    elem.childNodes[1].dispatchEvent(ev2)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0].name, "bar")
        assert.equal(values[1].name, "baz")

        document.body.removeChild(elem)
        assert.end()
    })
})

test("can register multiple sinks", function (assert) {
    var elem = h("foo", [
        h("bar"),
        h("baz")
    ])
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var events = EventSinks(d.id, ["bar", "baz"])

    var bar = events.sinks.bar, baz = events.sinks.baz
    var hash = {}

    addSinkEvent(elem.childNodes[0], "click", bar, {
        name: "baz"
    })

    addSinkEvent(elem.childNodes[1], "click", baz, {
        name: "bar"
    })

    events.bar(function (value) {
        hash.bar = value
    })

    events.baz(function (value) {
        hash.baz = value
    })

    var ev = createEvent("click")
    elem.childNodes[0].dispatchEvent(ev)

    var ev2 = createEvent("click")
    elem.childNodes[1].dispatchEvent(ev2)

    setImmediate(function () {
        assert.ok("bar" in hash)
        assert.ok("baz" in hash)
        assert.equal(hash.bar.name, "baz")
        assert.equal(hash.baz.name, "bar")

        document.body.removeChild(elem)
        assert.end()
    })
})
