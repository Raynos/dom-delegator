var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var addEvent = require("../add-event.js")
var removeEvent = require("../remove-event.js")
var Delegator = require("../index.js")

test("removing event", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    Delegator()
    var values = []

    function fn(ev) {
        values.push(ev)
    }
    
    addEvent(elem, "click", fn)
    removeEvent(elem, "click", fn)


    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 0)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("remove one of multiple events", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)

    var d = Delegator()
    var values = []

    function fn1(ev) {
        values.push(["fn1", ev])
    }

    function fn2(ev) {
        values.push(["fn2", ev])
    }

    function fn3(ev) {
        values.push(["fn3", ev])
    }

    d.addEventListener(elem, "click", fn1)
    d.addEventListener(elem, "click", fn2)
    d.addEventListener(elem, "click", fn3)

    d.removeEventListener(elem, "click", fn2)

    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0][0], "fn1")
        assert.equal(values[1][0], "fn3")
        assert.equal(values[0][1].target, elem)

        document.body.removeChild(elem)
        assert.end()
    })
})

test("removing event doesn't throw", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)
    var d = Delegator()

    assert.doesNotThrow(function () {
        d.removeEventListener(elem, "click", function () {})
    })

    document.body.removeChild(elem)
    assert.end()
})

test("removing other listener", function (assert) {
    var elem = h("div")
    document.body.appendChild(elem)
    var d = Delegator()

    d.addEventListener(elem, "click", function () {})

    assert.doesNotThrow(function () {
        d.removeEventListener(elem, "click", function () {})
    })

    document.body.removeChild(elem)
    assert.end()
    })
