---
title: Lifecycle API
sidebar_label: lifecycle-api
description: Learn how to run side effects and short-lived reactions in Refract components using useEffect and useFlash hooks.
---

Refract's **Lifecycle API** lets you run code in sync with your component’s life in the UI —  
whether that means setting up data when it appears, cleaning up resources when it disappears,  
or reacting to quick bursts of change.

In plain terms: **it’s how your components talk to the outside world** — APIs, timers, browser events, logging, and so on.

### Why Lifecycle Hooks Matter

Most of your components will at some point:
- Fetch data when they mount
- Listen to DOM or browser events
- Sync state with localStorage or other storage
- Clean up subscriptions when they unmount

Without lifecycle hooks, you'd end up scattering that logic everywhere.  
With Refract, it’s **built-in and scoped**, so everything stays predictable and clean.

### The Two Main Hooks

Refract merges traditional effect APIs into **two clear tools**:

1. **`useEffect`** – Run code whenever dependencies change (or on mount/unmount).
2. **`useFlash`** – Run code instantly after a reactive change, for quick one-off reactions.

Think of it like:
- `useEffect` = *longer-term* subscription & cleanup
- `useFlash` = *short-lived* “react and forget” moment

### `useEffect`

`useEffect` works a lot like React’s effect hook,  
but it’s deeply integrated with Refract’s [reactivity system](../core-concepts/lenses.md).

**What it’s for:**
- Fetching data from an API
- Setting up event listeners
- Subscribing to streams
- Watching for prop or state changes

**Example:**
```ts
import { createComponent, useEffect } from 'refract';

export const Timer = createComponent((props, lens) => {
  const [seconds, setSeconds] = lens.state(0);

  useEffect(() => {
    const interval = setInterval(() => setSeconds(s => s + 1), 1000);
    return () => clearInterval(interval); // cleanup
  }, []);

  return () => <p>Time: {seconds}s</p>;
});
```
:::tip
Always return a cleanup function from useEffect when you start something that needs stopping —
like intervals, subscriptions, or listeners. It prevents memory leaks and weird bugs later.
:::
### How `useEffect` Tracks Changes
When you pass dependencies to useEffect, it only re-runs when those values change — similar to React, but with a twist:
Refract’s dependency tracking works with both props and lens state, so you can watch reactive values without extra boilerplate.
```js
useEffect(() => {
  console.log(`User changed to: ${props.user}`);
}, [props.user]);
```
If you leave the dependency array empty ([]), the effect runs only once when the component mounts.

### `useFlash()`

Think of `useFlash` as your quick "reaction shot" - it fires immediately when dependencies change, but unlike `useEffect`, it doesn't persist or maintain subscriptions. It's perfect for those moments when you need an immediate, one-time response to changes.

#### When to Reach for `useFlash`:

- **Triggering animations** when values change
- **Firing analytics events** for user interactions
- **Debugging** by logging important changes
- **Showing temporary UI messages** or notifications

```js
import { createComponent, useFlash } from 'refract';

export const Notifier = createComponent(({ lens }) => {
  const message = lens.useRefraction('');

  lens.useFlash(() => {
    if (message.value) {
      console.log(`New message: ${message.value}`);
    }
  }, [message]);

  return (
    <input 
      onChange={(e) => message.set(e.target.value)} 
      placeholder="Type something..." 
    />
  );
});
```

:::important
**Remember:** `useFlash` is for instant, lightweight reactions. For anything asynchronous or resource-intensive, always use [`useEffect`](#useeffect---your-swiss-army-knife) instead.
:::

#### Key Characteristics:

1. **Immediate Execution**: Runs right after render when dependencies change
2. **No Persistent Effects**: Doesn't maintain subscriptions between runs
3. **Lightweight**: Designed for fast synchronous operations

For these cases, you'll want to use `useEffect` instead, which is better suited for ongoing or resource-intensive operations.

**When deciding between `useFlash` and `useEffect`:**  
Ask yourself: "Is this an instant reaction to a change, or an ongoing process?" If it's the former, `useFlash` is your friend. For anything that needs to persist or manage resources, stick with `useEffect`.

For more advanced patterns using these lifecycle methods, see how they integrate with [optical composition](http://localhost:3000/docs/advanced-guides/optical-composition-patterns) in Refract.

### Choosing Between `useEffect` and `useFlash`

| Use case                                    | Hook       |
|---------------------------------------------|------------|
| Fetch data on mount                         | `useEffect`|
| Subscribe to a WebSocket                    | `useEffect`|
| Trigger CSS animation on value change       | `useFlash` |
| Log to analytics when prop updates          | `useFlash` |
| Set up & clean up event listeners           | `useEffect`|

**A good mental model:**

- If it needs cleanup → **`useEffect`**
- If it’s fire-and-forget → **`useFlash`**

### Integration with Other APIs

Lifecycle hooks play well with:

- **[Lenses](http://localhost:3000/docs/core-concepts/lenses)** for reactive state
- **[Refractions](http://localhost:3000/docs/core-concepts/refractions)** for shared global state
- **[Optics](http://localhost:3000/docs/core-concepts/optics)** for scoped logic reuse

You can even chain them — run `useFlash` inside a component that already has `useEffect` managing longer-term state.

### Common Pitfalls

**Pitfall:** Forgetting dependencies in `useEffect` or `useFlash`  
If you use variables in the hook but don’t list them in the dependency array, your code may run with stale values.

:::tip
Use [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) or similar tooling to catch missing dependencies automatically.
:::

### Practical Example: Combining Hooks

```js
export const ChatBox = createComponent(({ userId }, lens) => {
  const [messages, setMessages] = lens.state([]);

  // Long-term subscription
  useEffect(() => {
    const socket = connectToChat(userId);
    socket.onMessage(msg => setMessages(m => [...m, msg]));
    return () => socket.disconnect();
  }, [userId]);

  // Fire animation when a new message arrives
  useFlash(() => {
    highlightNewMessage();
  }, [messages.length]);

  return () => (
    <div class="chat-box">
      {messages.map(m => <p>{m}</p>)}
    </div>
  );
});
```

Lifecycle hooks are your bridge between the UI and the outside world.
They let you manage both long-lived effects and instant reactions without messy code.

