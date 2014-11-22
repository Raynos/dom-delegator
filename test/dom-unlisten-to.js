var test = require("tape")
var setImmediate = require("timers").setImmediate
var Document = require("global/document").constructor

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var addEvent = require("../add-event.js")
var Delegator = require("../dom-delegator.js")

test("unlistening to event", function (assert) {
    var elem = h("div")
    var doc = new Document()
    doc.body.appendChild(elem)

    var d = Delegator(doc)
    d.listenTo("click")
    var values = []

    var fn = function (ev) {
        values.push(ev)
    }

    addEvent(elem, "click", fn)

    d.unlistenTo("click")

    assert.throws(function () {
        d.unlistenTo("click")
    })

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 0)

        doc.body.removeChild(elem)
        assert.end()
    })
})

test("delegator throws if mutated manually", function (assert) {
    var d = Delegator()

    d.listenTo("foobar")

    // NAUGHTY MUTATE
    d.rawEventListeners.foobar = null

    assert.throws(function () {
        d.unlistenTo("foobar")
    }, /cannot unlisten to foobar/)

    assert.end()
})
