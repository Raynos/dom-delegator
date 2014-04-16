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

    Delegator()
    var values = []

    DataSet(elem).click = function (ev) {
        values.push(ev)
    }

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem)
        assert.equal(typeof values[0].preventDefault, "function")

        document.body.removeChild(elem)
        assert.end()
    })
})

test("setting an id'd event handler", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator()
    var values = []
    var eventValues = []

    var handler = {
        handleEvent: function (ev) {
            values.push(ev)
        },
        id: d.id
    }
    var eventHandler = {
        handleEvent: function (ev) {
            eventValues.push(ev)
        },
        id: d.id
    }

    DataSet(elem).click = handler
    DataSet(elem).event = eventHandler

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 1)
        assert.equal(values[0].target, elem)

        assert.equal(eventValues.length, 1)
        assert.equal(eventValues[0].target, elem)
        assert.equal(eventValues[0].type, "click")

        document.body.removeChild(elem)
        assert.end()
    })
})

test("setting data-event to array", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []

    DataSet(elem).click = [function (ev) {
        values.push(ev)
    }, function (ev) {
        values.push(ev)
    }]

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0], values[1])
        assert.equal(values[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("data-event to array of id'd handlers", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator()
    var changes = []
    var submits = []

    var submitHandler = {
        handleEvent: function (ev) {
            submits.push(ev)
        },
        id: d.id
    }
    var changeHandler = {
        handleEvent: function (ev) {
            changes.push(ev)
        },
        id: d.id
    }

    DataSet(elem).event = [submitHandler, changeHandler]

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(submits.length, 1)
        assert.equal(changes.length, 1)

        assert.equal(submits[0], changes[0])
        assert.equal(submits[0].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})
