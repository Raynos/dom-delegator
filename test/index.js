var test = require("tape")
var h = require("hyperscript")
var uuid = require("uuid")
var createEvent = require("synthetic-dom-events");
var setImmediate = require("timers").setImmediate

var Delegator = require("../index.js")
var addEvent = require("../add-event.js")

test("Delegator is a function", function (assert) {
    assert.equal(typeof Delegator, "function")
    assert.end()
})

test("can listen to events", function (assert) {
    var elem = h("div")


    var d = Delegator(elem, ["foo"])
    var called = 0
    var id = uuid()

    addEvent(elem, "click", d.sinks.foo, {
        id: id
    })

    d.sources.foo(function (tuple) {
        called++

        assert.ok("values" in tuple)
        assert.ok("ev" in tuple)

        assert.equal(tuple.ev, null)
        assert.ok(Array.isArray(tuple.values))
        assert.equal(tuple.values.length, 1)
        assert.equal(tuple.values[0].id, id)
    })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(called, 1)

        assert.end()
    })
})
