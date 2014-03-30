var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")
var Sink = require("event-sinks/sink")

var h = require("./lib/h.js")
var addSinkEvent = require("./lib/add-sink-event.js")
var createEvent = require("./lib/create-event.js")

var Delegator = require("../index.js")

test("adding multiple listeners", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var values = []
    var sink = Sink(d.id, "", function (value) {
        values.push(value)
    })

    addSinkEvent(elem, "event", sink, { key: "foo" })
    addSinkEvent(elem, "event", sink, { key: "bar" })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0].key, "foo")
        assert.equal(values[1].key, "bar")

        document.body.removeChild(elem)
        assert.end()
    })
})

test("add multiple listeners of different types", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var values = []
    var sink = Sink(d.id, "", function (value) {
        values.push(value)
    })

    addSinkEvent(elem, "event", sink, { key: "foo" })
    addSinkEvent(elem, "click", sink, { key: "bar" })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0].key, "bar")
        assert.equal(values[1].key, "foo")

        document.body.removeChild(elem)
        assert.end()
    })
})
