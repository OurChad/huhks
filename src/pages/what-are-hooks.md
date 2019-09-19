---
title: "What Are Hooks?"
date: "2019-08-07"
next: "custom-hooks"
nextLabel: "Custom Hooks a.k.a. The Good 💩"
---
**Hooks are a new addition in React 16.8. They let you use state and other React features without writing a class.**


## Why would I want to use Hooks?
Hooks have some very useful benefits and are recommended as the primary way to build components with React by the React Development Team.

Some of the main reasons to use Hooks are:
- Hooks let us **organize the logic inside a component into reusable isolated units**
- Hooks enable **reuse of stateful logic between components** through Custom Hooks
- Hooks mean **components are truly declarative even if they contain state and side effects**

React is designed with the principle of composition over inhertience in mind. The above points speak strongly to that principle.


## The Basics
Lets take a look on the most common patterns in React Class Components and how they map to React Hooks.

### State
By default, functional components do not have a state. If you want a component to be stateful in some way, traditional you would use a Class Component.

```jsx
import React, { Component } from 'react';

class Count extends Component {
    state = {
      count: 0
    };

    render() {
      const { count } = this.state;
      return (
        <div>
          <p>You clicked {count} times</p>
          <button
            onClick={() => this.setState({ count: count + 1 })}>
              Click me
          </button>
        </div>
      );
    }
}
```

<br />

With Hooks, we can achieve the same functionality in a Function Component and be more declaritive of the stateful logic.

```jsx
import React, { useState } from 'react';

function Count() {
  // Declare a new state variable, which we'll call "count"
  const [count, setCount] = useState(0);
  
  return (
      <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

```

<br />

`useState` takes an initial state as an agrument and returns an array of elements: the new state, and the setState function. Using array destructuring we can **explicitly name our state and setState function with clear and meaningful names**.

## Lifecycle
Normally components need to perform some sort of complex logic such as data fetching. To implement this kind of functionality you would need to use React Class Component Lifecycle methods i.e. `componentDidMount`, `componentDidUpdate`, `componentWillUnmount`, etc.

Lets look at an example of adding an `EventListener` to a component and removing the `EventListner` when we unmount the component.

```jsx
import React, { Component } from 'react';

export default class Useless extends Component {

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
  }

  handleScroll = () => {
    console.log(`User is scrolling... 💩`);
  };

  render() {
    return (
      <div> I'm a pretty useless component 😢</div>
    );
  }
  
}

```

<br />

We can achieve the same functionality in a Function Component with the `useEffect` Hook.

```jsx
import React, { useEffect } from 'react';

export default function Useful() {

  useEffect(() => {
    const handleScroll = () => {
      console.log(`User is scrolling... 💯`);
    };

    window.addEventListener(`scroll`, handleScroll);

    return () => window.removeEventListener(`scroll`, handleScroll);
  }, []);

  return (
    <div>I'm a really useful component 💪</div>
  );
  
}

```

So what's the benefits here? It's a simple example, but what we now have is **all of the logic associated with the user scroll functionality and the lifecycle of the Component contained together** and not spead across different functions of the component.

<br />
Now that the brain juices are flowing and we're starting to see how Hooks can be useful, lets move on and take a look at some practical examples with Custom Hooks.
