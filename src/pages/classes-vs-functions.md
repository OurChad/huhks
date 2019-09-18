---
title: "Classes vs. Functions"
date: "2019-09-17"
previous: "custom-hooks"
previousLabel: "Custom Hooks a.k.a. The Good 💩"
next: "refactor-example"
nextLabel: "Real Refactor 💪"
---
So far we've looked at the basics of Hooks in Functional Components and seen some of the difference they present to Class Component. Now lets explicitly call out the differences and dive a little deeper.

## Easier to Understand
Something we've talked about already, but is always worth mentioning. Hooks in Functional Components are by nature more declaritive than the equivalent functionality in Class Components. From a human-readable perspective this makes code easier to understand (at least at a high level 😅).

> Code is written once and read many times.

Related code is kept together and not split as can be the case with the different lifecycle methods in Class Components.

Even for machines, Functional Components are typically easier to understand. With Classes a compiler needs to keep track of scope and the respective bindings that can be implemented and initialised. With Functional Components we implicitly create closures and avoid the overhead creating Class instances and binding event handlers.

## No "false hierarchy"
Previously I mentioned Class Components that use HOCs / render props increase tree complexity. Unlike render props or higher-order components, Hooks don’t create a “false hierarchy” in your render tree.

<br/>

### React DOM Component structure with HOCs
```jsx
<withEventListener(MyComponent)>
    <MyComponent>
        HOC'd conent ❄️
    </MyComponent>
</withEventListener(MyComponent)>
```

<br/>

### React DOM Component structure with Hooks
```jsx
    <MyComponent>
        MyComponent is using a "useEventLisener" Hook 🔥🔥🔥
    </MyComponent>
```

<br/>

## What about PureComponents?!
Good question. React has you covered with `React.memo(props)`.

> `React.memo` is equivalent to PureComponent, but it only compares props. (You can also add a second argument to specify a custom comparison function that takes the old and new props. If it returns true, the update is skipped.)

> React.memo doesn’t compare state because there is no single state object to compare.

## When should I use Classes over Functions?
The React team eventually hopes to make it so that Classes are not needed (but not deprecated). You can see some of the use cases Hooks to not currently support in the [React Hooks FAQ](https://reactjs.org/docs/hooks-faq.html#do-hooks-cover-all-use-cases-for-classes).

The main use case right now would be a React `ErrorBoundary` implementation. Hooks do not have an equivalent of the lifecycle method `componentDidCatch` and as such you cannot implement an ErrorBoundary using a Functional Component.