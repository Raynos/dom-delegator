var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")
var DataSet = require("data-set")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var Delegator = require("../index.js")

test("setting event listeners with data-set directly", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var values = []

    var events = {}
    events[d.id] = function (ev) {
        values.push(ev)
    }
    DataSet(elem).click = events

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("setting an id'd event handler", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator(elem)
    var values = []

    var handler = {
        handleEvent: function (ev) {
            values.push(ev)
        },
        id: d.id
    }

    DataSet(elem).click = handler

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})
