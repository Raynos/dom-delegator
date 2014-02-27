type Sink = require('event-sinks').Sink

type Target := DOMNode

type Surface := {
    is: (target: Any) => Boolean,
    defaultTarget: Target,
    allEvents: Array<String>,
    addListener: (Target, eventName: String, Function) => void
}

type DelegatorEvent<T> := {
    value: T,
    ev: null | {
        currentValue: Object
    }
}

type Delegator<Target> := {
    id: String
    target: Target
}

type CreateDelegator<Target> := (
    target?: Target,
    opts?: {
        id: String,
        defaultEvents?: Boolean
    }
) => Delegator<Target>

type Listener<T> := {
    currentTarget: Target,
    data: T,
    sink: Sink & {
        dispatch: EventDispatcher
    }
}

type EventDispatcher<T> := (Listener<T>, DOMEvent) => void

dom-delegator := CreateDelegator<Target>

dom-delegator/add-event := (
    target: Target,
    type: String,
    sink: Sink,
    data: Any
)

dom-delegator/create-delegator :=
    (Surface) => CreateDelegator<Target>

dom-delegator/dom-surface := Surface

dom-delegator/get-listener := (
    id: String, Target, type: String
) => null | Listener<T>

dom-delegator/listen := (Delegator, eventName: String) => void
