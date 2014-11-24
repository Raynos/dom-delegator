var test = require("tape")
var document = require("global/document")
var setImmediate = require("timers").setImmediate

var h = require("./lib/h.js")
var createEvent = require("./lib/create-event.js")

var Delegator = require("../index.js")

test("can listen to handles", function (assert) {
    var elem = allocElem()
    var d = Delegator()

    var results = []

    var handle = Delegator.allocateHandle(function (ev) {
        results.push(ev)
    })
    d.addEventListener(elem, "click", handle)

    dispatchClick(elem, function () {
        assert.ok(true)
        assert.equal(results.length, 1)
        assert.equal(results[0].type, "click")

        freeElem(elem)
        assert.end()
    })
})

test("can transform a handle", function (assert) {
    var elem = allocElem()
    var d = Delegator()

    var results = []

    var handle = Delegator.allocateHandle(function (ev) {
        results.push(ev)
    })

    var handle2 = Delegator.transformHandle(handle, function (ev, write) {
        write({ foo: "bar", type: ev.type })
    })
    d.addEventListener(elem, "click", handle2)

    dispatchClick(elem, function () {
        assert.ok(true)
        assert.equal(results.length, 1)

        freeElem(elem)
        assert.end()
    })
})

test("transform handle respects falsey", function (assert) {
    var elem = allocElem()
    var d = Delegator()

    var results = []

    var handle = Delegator.allocateHandle(function (ev) {
        results.push(ev)
    })

    var handle2 = Delegator.transformHandle(handle, function (ev) {
        return null
    })
    d.addEventListener(elem, "click", handle2)

    dispatchClick(elem, function () {
        assert.ok(true)
        assert.equal(results.length, 0)

        freeElem(elem)
        assert.end()
    })
})

function allocElem() {
    var elem = h("div")
    document.body.appendChild(elem)

    return elem
}

function freeElem(elem) {
    document.body.removeChild(elem)
}

function dispatchClick(elem, cb) {
    var ev = createEvent("click")
    elem.dispatchEvent(ev)

    setImmediate(cb)
}
