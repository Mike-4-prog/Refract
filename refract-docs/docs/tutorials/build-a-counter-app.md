---
id: build-a-counter-app
title: Build a Counter App
slug: /tutorials/build-a-counter-app
---

### Build a Counter App with Refract

Welcome to your first hands-on tutorial with Refract! In this guide, we'll build a simple counter application while learning fundamental concepts like **refractions** (reactive state) and **component creation**. This is the perfect starting point before tackling more advanced topics like [optics](http://localhost:3000/docs/core-concepts/optics) or [global state](http://localhost:3000/docs/tutorials/mouse-tracker-with-optics).

>  **What You'll Learn**
> - Creating reactive state with refractions
> - Building components with `createComponent`
> - Handling user interactions
> - Basic state updates

### Prerequisites

Before we begin, make sure you've:
1. Set up a Refract project  [Quick Start](/getting-started/quick-start.md)
2. Understand basic [JavaScript](https://javascript.info/)

>  **New to Refract?**  
> If terms like "refractions" sound unfamiliar, check out our [Core Concepts overview](/core-concepts/refractions.md) first.

### Initialize Your App

First, let's set up the foundation in your main app file:

```javascript
import { createApp } from '@refract-framework/core';

const app = createApp();
```
This creates a new Refract application instance. The `createApp` function is your gateway to all Refract features - we'll explore more advanced uses in the [API Reference](http://localhost:3000/docs/api-reference/create-app).

### Create a Counter Component
Now, let's build our counter component using `createComponent`:
```js
import { createComponent, useRefraction } from '@refract-framework/core';

const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0); // Initialize with 0

  return {
    view: () => (
      <div>
        <p>Current count: {count.value}</p>
        <button onClick={() => setCount(count.value + 1)}>
          Increment
        </button>
      </div>
    )
  };
});
```
#### Live Demo

import CounterDemo from '@site/src/components/CounterDemo';

<CounterDemo />

```jsx
// This is the actual code used in the demo
const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0);
  
  return {
    view: () => (
      <div>
        <p>Count: {count.value}</p>
        <button onClick={() => setCount(count.value + 1)}>
          Increment
        </button>
      </div>
    )
  };
});
```
Let's break this down:

- `useRefraction(0)` creates a reactive state (refraction) initialized to `0`

- `count.value` accesses the current value

- `setCount()` updates the value and triggers re-renders

Here’s a simple timeline of what happens when you click the button:
```cpp
Button Click
    ↓
count.value++
    ↓
Refract detects change
    ↓
UI auto re-renders
```
No manual DOM updates needed — Refract handles the reactivity for you.
:::important
Unlike React's useState, refractions are part of Refract's reactive system that works seamlessly with optics and effects..
:::
### Add Decrement Functionality
Let's enhance our counter with decrement logic:
```js
const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0);

  const increment = () => setCount(count.value + 1);
  const decrement = () => setCount(count.value - 1);

  return {
    view: () => (
      <div>
        <p>Current count: {count.value}</p>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
      </div>
    )
  };
});
```
### Register and Mount the Component
Finally, let's add our component to the app:
```js
app.registerComponent('counter', Counter);

// In your HTML:
// <div id="app"></div>

app.mount('#app');
```




