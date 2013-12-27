var test = require("tape")

var domDelegator = require("../index")

test("domDelegator is a function", function (assert) {
    assert.equal(typeof domDelegator, "function")
    assert.end()
})
