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
    sources: Object<String, Event<DelegatorEvent<T>>>,
    sinks: Object<String, Sink>,
    map: WeakMap,
    target: Target
}

type CreateDelegator<Target> := (
    target?: Target,
    events?: Array<String>,
    opts?: {
        map?: WeakMap,
        shared?: Boolean,
        defaultEvents?: Boolean
    }
) => Delegator<Target>

type Listener<T> := {
    currentTarget: Target,
    data: T,
    sink: Sink
}

type Sink<T> := {
    dispatch: (Listener<T>, DOMEvent) => void,
    map: WeakMap
}

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

dom-delegator/event-map := WeakMap

dom-delegator/get-listener := (
    WeakMap, Target, type: String
) => null | Listener<T>

dom-delegator/listen := (Delegator, eventName: String) => void

dom-delegator/sink := ({
    id: String,
    key: String,
    broadcast: (T) => void,
    map: WeakMap
}) => Sink<T>
