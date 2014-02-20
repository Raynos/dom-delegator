# dom-delegator

<!--
    [![build status][1]][2]
    [![NPM version][3]][4]
    [![Coverage Status][5]][6]
    [![gemnasium Dependency Status][7]][8]
    [![Davis Dependency status][9]][10]
-->

<!-- [![browser support][11]][12] -->

Decorate elements with delegated events

## Motivation

When building a web application you don't want to deal with
  messing around with the DOM directly if you can avoid it.

What you really want to do is write application logic. Generally
  how application logic works is that you react to some kind of
  user input, run some logic and maybe change some state.

Let's take a look at a calendar example. For a calendar we just
  want to react to a bunch of date change events and update the
  state of the calendar accordingly. We don't really care what
  triggers the date change events.

```js
var Calendar = function () {
    var calendarState = { ... }
    var calendarInputs = { ... }

    calendarInputs.dateChange(function (newDate) {
        var d = new Date(newDate)

        calendarState.theTime.set(d)
    })
}
```

The above code is basically the application logic you want to
  express. Now imagine we had some kind of data binding that
  re-rendered the template / view for the calendar each time
  we update the calendarState.

```js
function render(calendarState) {
    var WEEK = 1000 * 60 * 60 * 24 * 7
    var prevWeek = +calendarState.theTime - WEEK
    var nextWeek = +calendarState.theTime + WEEK

    return h("div", [
        h("table", calendarGrid(calendarState)),
        h("div.controls", [
            h("button.prev", {
                "data-click": "dateChange:" + prevWeek
            }, "previous week"),
            h("button.next", {
                "data-click": "dateChange:" + nextWeek
            }, "next week")
        ])
    ])
}
```

Something will need to trigger the date change events, since we
  don't want to write any manual DOM code and since we already
  have a reactive templating system we should just add hooks to
  our templates that say when this DOM event occurs I want you
  to trigger this "meaningful" event in my system

### Other motivations

 - solution should be a module, not a framework
 - solution should work recursively without namespace conflicts
 - solution should use event delegation, it shouldnt require
      binding to each DOM element manually
 - solution should allow rendering logic to be seperate from
      input handling logic.
 - solution doesn't require passing concrete functions to the
      rendering logic. The rendering and input handling most
      be loosely coupled.
 - solution should allow passing data to the event listener.
 - solution should discourage passing a DOM Event object to
      listener. You shouldn't read the `ev` or `ev.target` in
      your input handling code
 - library should only do input handling. Not input handling AND
      reactive rendering.

## Example DOM

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var h = require("hyperscript")
var addEvent = require("dom-delegator/add-event")

var delegator = Delegator(document.body, [
  "textClicked"
])
var sinks = delegator.sinks
var elem = h("div.foo", [
    h("div.bar", "bar"),
    h("span.baz", "baz")
])
var bar = elem.querySelector(".bar")
var baz = elem.querySelector(".baz")
document.body.appendChild(elem)


// add individual elems.
addEvent(bar, "click", sinks.textClicked, {
  type: "bar"
})
addEvent(baz, "click", sinks.textClicked, {
  type: "baz"
})

delegator.sources.textClicked(function (tuple) {
    var value = tuple.value

    console.log("doSomething", value.type)
})
```

## Example data- attributes

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var h = require("hyperscript")
var event = require("dom-delegator/event")

var delegator = Delegator(document.body, [
  "textClicked"
])
var sinks = delegator.sinks

var elem = h("div.foo", [
    h("div.bar", { 
        "data-click": event(sinks.textClicked, { type: "bar" })
    }, "bar"),
    h("div.baz", {
        "data-click": event(sinks.textClicked, { type: "baz" })
    }, "baz")
])
document.body.appendChild(elem)

delegator.sources.textClicked(function (tuple) {
    var value = tuple.value

    console.log("doSomething", value.type)
})
```

## Example JSONML

```js
var document = require("global/document")
var Delegator = require("dom-delegator")
var event = require("jsonml-event")
var dom = require("jsonml-dom")

var delegator = Delegator(document.body, [
  "textClicked"
])
var sinks = delegator.sinks

var elem = dom(["div.foo", [
    ["div.bar", { 
        "click": event(sinks.textClicked, { type: "bar" })
    }, "bar"],
    ["div.baz", {
        "click": event(sinks.textClicked, { type: "baz" })
    }, "baz"]
]])
document.body.appendChild(elem)

delegator.sources.textClicked(function (tuple) {
    var value = tuple.value

    console.log("doSomething", value.type)
})
```

## Concept.

The concept behind `dom-delegator` is to seperate declaring
  which UI elements trigger well named user input events from 
  the event handling.

For example you might have an `input.js` where you handle user
  input, based on well named, non-DOM specific events.

```js
// input.js
module.exports = Input

function Input(state, sources) {
    // when the input event todo addition occurs
    // create a fresh item and add it
    sources.todoAdded(function (data, ev) {
        var value = ev.currentValue
        var todo = { title: value, completed: false }
        state.todos.push(todo)
    })

    // when the input event todo removal occurs
    // find the item and delete it from the list
    sources.todoRemoved(function (data, ev) {
        var id = data
        var index = -1
        state.todos.some(function (todo, itemIndex) {
            if (todo.id() === id) {
                index = itemIndex
                return true
            }
        })

        state.todos.splice(index, 1)
    })
}
```

One thing to notice here is that the input handling is coupled
  to keypress or click events. Those are implementation details
  of the declarative UI. The input handling has been described 
  in a loosely coupled way.

The only coupling is that addition is based on the current value
  of the UI element that triggered the `todoAdded` event.

Since we have defined our input handling, we now need to add
  the declarative event hooks to our UI.

We will use `HTML` and the `data- attributes` style interface
  for the delegator

```html
// ui.html
<ul>
    <li data-id="4">
        <span class="todo-title">Some todo</span>
        <button data-click="todoRemoved:4">Remove</button>
    </li>
</ul>
<input class="add-todo" name="title" data-submit="todoAdded" />
```

Here we have decorated the todo item UI with a click event.
  whenever it is clicked it will emit the `todoRemoved` event
  and data will be set to the value after the `:` in this case
  `4`.

We also decorated the input with the `todoAdded` event.

The contract between the input handler and the UI is fairly
  loosely defined and it should be possible to refactor the UI
  without breaking the input handler. You can make the
  `todoAdded` event more generic like:

```html
// ui.html

<div class="todo-addition" data-submit="todoAdded">
    <input class="add-todo" name="title" />
</div>
```

Then update the input handler

```js
// when the input event todo addition occurs
// create a fresh item and add it
delegator.sources.todoAdded(function (tuple) {
    var ev = tuple.ev
    var title = ev.currentValue.title
    var todo = { title: title, completed: false }
    state.todos.push(todo)
})
```

We have now bound the `todoAdded` event less tightly to 
  `currentValue` and as long as there is some kind of `input`
  or `textarea` or `custom element` with a name called `'title'`
  the input handling code will still work.

## Custom events

The `type: "submit"` or `data-submit` event and the
  `type: "change"` or `data-change` event are not the normal
  DOM events for `addEventListener('submit')` or 
  `addEventListener('change')` 

`data-submit` and `data-change` actually have more complex
  semantics. They can be bound to a container and well then
  emit the named event every time any child changes by the
  submit or change semantics.

If bound to a container it will use `FormData(...)` to read
  the currentValue as a hash of name to value of elements.

If bound to a single element it will get the value of that 
  element based on what kind of element it is.

### submit semantics

`submit` triggers on `keypress` if the key is ENTER or triggers
  on a click if the click target is a `button` or `input` of 
  type `"submit"`

### change semantics

`change` triggers on `change` (DOM change event) or on `keypress`

## Installation

`npm install dom-delegator`

## Contributors

 - Raynos

## MIT Licenced

  [1]: https://secure.travis-ci.org/Raynos/dom-delegator.png
  [2]: https://travis-ci.org/Raynos/dom-delegator
  [3]: https://badge.fury.io/js/dom-delegator.png
  [4]: https://badge.fury.io/js/dom-delegator
  [5]: https://coveralls.io/repos/Raynos/dom-delegator/badge.png
  [6]: https://coveralls.io/r/Raynos/dom-delegator
  [7]: https://gemnasium.com/Raynos/dom-delegator.png
  [8]: https://gemnasium.com/Raynos/dom-delegator
  [9]: https://david-dm.org/Raynos/dom-delegator.png
  [10]: https://david-dm.org/Raynos/dom-delegator
  [11]: https://ci.testling.com/Raynos/dom-delegator.png
  [12]: https://ci.testling.com/Raynos/dom-delegator
