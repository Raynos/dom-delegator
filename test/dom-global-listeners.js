var test = require("tape")
var setImmediate = require("timers").setImmediate
var document = require("global/document")

var createEvent = require("./lib/create-event.js")

var Delegator = require("../index.js")

test("global listeners", function (assert) {
    var d = Delegator()
    var values = []

    function fn(ev) {
        values.push(["fn", ev])
    }
    
    function fn2(ev) {
        values.push(["fn2", ev])
    }

    d.addGlobalEventListener("click", fn)
    d.addGlobalEventListener("click", fn2)


    var ev2 = createEvent("click")
    document.documentElement.dispatchEvent(ev2)

    d.removeGlobalEventListener("click", fn)

    var ev3 = createEvent("click")
    document.documentElement.dispatchEvent(ev3)

    setImmediate(function () {
        assert.equal(values.length, 3)
        assert.equal(values[0][0], "fn")
        assert.equal(values[1][0], "fn2")
        assert.equal(values[2][0], "fn2")

        assert.end()
    })
})

test("duplicates", function (assert) {
    var d = Delegator()
    var values = []

    function fn(ev) {
        values.push(["fn", ev])
    }
    
    function fn2(ev) {
        values.push(["fn2", ev])
    }

    d.addGlobalEventListener("click", fn)
    d.addGlobalEventListener("click", fn)
    d.addGlobalEventListener("click", fn2)
    d.addGlobalEventListener("click", fn2)


    var ev2 = createEvent("click")
    document.documentElement.dispatchEvent(ev2)

    setImmediate(function () {
        assert.equal(values.length, 2)
        assert.equal(values[0][0], "fn")
        assert.equal(values[1][0], "fn2")

        assert.end()
    })
})

test("duplicate removes", function (assert) {
    var d = Delegator()
    var values = []

    function fn(ev) {
        values.push(["fn", ev])
    }
    
    function fn2(ev) {
        values.push(["fn2", ev])
    }

    d.addGlobalEventListener("click", fn)
    d.addGlobalEventListener("click", fn2)


    var ev2 = createEvent("click")
    document.documentElement.dispatchEvent(ev2)

    assert.doesNotThrow(function () {
        d.removeGlobalEventListener("badevent", fn)
    })

    d.removeGlobalEventListener("click", fn)
    d.removeGlobalEventListener("click", fn)

    var ev3 = createEvent("click")
    document.documentElement.dispatchEvent(ev3)

    setImmediate(function () {
        assert.equal(values.length, 3)
        assert.equal(values[0][0], "fn")
        assert.equal(values[1][0], "fn2")
        assert.equal(values[2][0], "fn2")

        assert.end()
    })
})
