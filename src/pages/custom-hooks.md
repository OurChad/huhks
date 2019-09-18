---
title: "Custom Hooks"
date: "2019-08-07"
previous: "what-are-hooks"
previousLabel: "What are Hooks? 🤔"
next: "classes-vs-functions"
nextLabel: "Classes 🆚 Functions"
---
Custom Hooks are the most powerful aspect of React Hooks. They provide all of the benefits list on the previous page with emphasis on **enabling the reuse of stateful logic between components.**

Lets look at our scroll `EventListener` from before. Adding `EventListeners` to React Components is a frequent use case. Wouldn't it be great if we had a way to take the functionality needed to add `EventListeners` to React Lifecycle methods and reuse it anywhere in our application. With Custom Hooks that dream becomes a reality.

```jsx
import { useState, useRef, useEffect, useCallback } from 'react';

// Usage
function App(){
  // State for storing window position
  const [windowY, setWindowY] = useState(window.scrollY);
  
  // Event handler utilizing useCallback ...
  // ... so that reference never changes.
  const handleScroll = useCallback(
    () => {
        setWindowY(window.scrollY);
    },
    [setWindowY]
  );
  
  // Add event listener using our hook
  useEventListener('scroll', handleScroll);
  
  return (
    <h1>
      The window position is {windowY} 🥳
    </h1>
  );
}

// Hook
function useEventListener(eventName, handler, element = window){
  // Create a ref that stores handler
  const savedHandler = useRef();
  
  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(
    () => {
      // Make sure element supports addEventListener
      // On 
      const isSupported = element && element.addEventListener;
      if (!isSupported) return;
      
      // Create event listener that calls handler function stored in ref
      const eventListener = event => savedHandler.current(event);
      
      // Add event listener
      element.addEventListener(eventName, eventListener);
      
      // Remove event listener on cleanup
      return () => {
        element.removeEventListener(eventName, eventListener);
      };
    },
    [eventName, element] // Re-run if eventName or element changes
  );
};
```

<br />

You're probably thinking, "but wait Chad can't I just use a Higher-order Component or Render props for that same functionality in Class Components?", yes Timmy, you can, but HOCs and Render Props add unnecessary Component tree nesting that increases complexity.

This also has the added potential performance benefit: 
> Idiomatic code using Hooks doesn’t need the deep component tree nesting that is prevalent in codebases that use higher-order components, render props, and context. With smaller component trees, React has less work to do.