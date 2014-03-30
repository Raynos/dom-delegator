type Target := DOMNode

type Surface<Target> := {
    is: (target: Any) => Boolean,
    defaultTarget: Target,
    allEvents: Array<String>,
    addListener: (Target, eventName: String, Function) => void,
    getListener: (
        Surface, id: String, Target, type: String
    ) => null | Listener<T>,
    getParent: (Target) => Target
}

type Delegator<Target> := {
    id: String
    target: Target,
    listenTo: (eventName: String) => void
}

type CreateDelegator<Target> := (
    target?: Target,
    opts?: {
        id: String,
        defaultEvents?: Boolean
    }
) => Delegator<Target>

type EventHandler := Function | {
    handleEvent: Function
}

type Listener<Target> := {
    currentTarget: Target,
    handlers: [Function | EventHandler]
}

dom-delegator := CreateDelegator<Target>

dom-delegator/add-event := (
    id: String,
    target: Target,
    type: String,
    fn: EventHandler
)

dom-delegator/create-delegator :=
    (Surface) => CreateDelegator<Target>

dom-delegator/dom-surface := Surface

dom-delegator/get-listener := (
    Surface, id: String, Target, type: String
) => null | Listener<Target>

dom-delegator/listen := (Surface, Delegator, eventName: String) => void
