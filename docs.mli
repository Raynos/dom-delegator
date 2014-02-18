type Target := DOMNode

type Surface := {
    is: (target: Any) => Boolean,
    defaultTarget: Target
}

type Delegator<Target> := {
    sources: Object<String, Event>,
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

type Listener := {
    currentTarget: Target,
    data: Any,
    sink: Sink
}

type Sink := {
    dispatch: (Listener, DOMEvent) => void
}

dom-delegator := CreateDelegator<Target>

dom-delegator/add-event := (
    target: Target,
    type: String,
    data: Any,
    opts?: {
        map?: WeakMap
    }
)

dom-delegator/create-delegator :=
    (Surface) => CreateDelegator<Target>

dom-delegator/dom-surface := Surface

dom-delegator/event-map := WeakMap

dom-delegator/get-listener := (
    WeakMap, Target, type: String
) => null | Listener

dom-delegator/listen := (Delegator, eventName: String) => void

dom-delegator/sink := ({
    id: String,
    key: String,
    broadcast: (Any) => void,
    map: WeakMap
}) => Sink
