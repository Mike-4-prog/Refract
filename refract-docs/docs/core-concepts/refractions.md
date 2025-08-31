---
id: refractions
title: Refractions
slug: /core-concepts/refractions
---

import useBaseUrl from '@docusaurus/useBaseUrl';

If you've already read the [Introduction](/docs/getting-started/introduction), you know that **Refractions** are at the very core of how Refract thinks about state and reactivity.  They’re not just “variables that change.” They’re *streams of intent*, little beams of data and behavior that can bend, split, and merge as they flow through your application.

Imagine a shaft of light passing through a prism:  It starts unified, but can be split into multiple
colors, redirected, or even combined back together.  Refractions work the same way for your app’s state.

### Why Refractions

We didn’t just pick a cool-sounding name. In optics, *refraction* describes how light changes direction when passing through a new medium. In Refract, **a Refraction describes how state changes shape or direction as it moves through your UI**.

This optical analogy is powerful because:

- **It’s about flow, not storage** — data moves, transforms, and keeps going.
- **It’s about relationships** — one change can ripple through many parts of your app.
- **It’s about composition** — small beams can be combined into richer streams.

### The Role of Refractions in Your App

You can think of a Refraction as a *first-class citizen* of your app, on the same level as components and effects:

- **Components** render things.
- **Effects** handle side effects.
- **Refractions** hold and manage your reactive data.

A good mental model is that a **Refraction** is like a “live value” that other parts of your app can watch and respond to. If the value changes, the change propagates to all observers automatically.
### A Conversation with Your State

Let’s make this concrete.

Without Refractions, you might write something like:

```jsx
let count = 0;

function increment() {
  count++;
  renderUI();
}
```
Here, you’re manually telling the UI when to update (renderUI()), and managing that update chain yourself. This can get messy quickly.

With Refractions:
```jsx
import { createRefraction, useRefraction } from 'refract';

const counter = createRefraction(0);

function Counter() {
  const count = useRefraction(counter);
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => counter.set(count + 1)}>Increment</button>
    </div>
  );
}
```
No `renderUI()` call needed because when the refraction changes, the UI knows. It’s like saying "Hey UI, here’s a value. Watch it. I’ll let you know when it changes."
#### Counter Result
Here’s a more interactive counter example that shows increment, decrement, and reset buttons:
```jsx
import { createRefraction, useRefraction } from 'refract';

export default function Counter() {
  const counter = createRefraction(0);
  const [count, setCount] = useRefraction(counter);

  return (
    <div style={{ fontFamily: 'sans-serif', padding: '1rem' }}>
      <h2>Refract Counter</h2>
      <p>Count: <strong>{count}</strong></p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)} style={{ marginLeft: '0.5rem' }}>
        Decrement
      </button>
      <button onClick={() => setCount(0)} style={{ marginLeft: '0.5rem' }}>
        Reset
      </button>
    </div>
  );
}
```
This version makes it clear that refractions work seamlessly for both increasing and decreasing state values — no extra wiring needed.

### From a Single Beam to a Network of State
Refractions don’t have to be standalone. You can connect them.

Let’s say you have a `counter` refraction and you want a `doubled` value:
```jsx
import { deriveRefraction } from 'refract';

const doubled = deriveRefraction(counter, (value) => value * 2);
```
Now, anytime `counter` changes, `doubled` automatically updates.
This is the flow aspect of the optical metaphor — data can be transformed and branched without manually keeping them in sync.
### Local vs. Global Refractions
When working with Refract, you’ll notice something:
refractions aren’t always global — and that’s by design. Think of them like light beams in a room:

1. **Local Refractions** – Created inside a component and live only while that component is mounted.
#### When to use them:

When the state is only relevant to that component.

When you want to keep things isolated, avoiding accidental changes from elsewhere in the app.

Great for UI state, form fields, toggles, temporary animations.

**Example**
```jsx
import { createRefraction, useRefraction } from 'refract';

function Counter() {
  // Local refraction: exists only while Counter is mounted
  const countRefraction = createRefraction(0);
  const [count, setCount] = useRefraction(countRefraction);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}
```
**Key points**:

- countRefraction only lives inside Counter.

- If you unmount Counter, the refraction disappears.

- No other component can access it.

2. **Global Refractions** – Defined once and shared across your entire app.
**When to use them**:

- For **shared state** that multiple components need to read or update.

- For global settings like theme, authentication, notifications.

- For data that should persist across navigation.

**Example**:
```jsx
// themeRefraction.js
import { createRefraction } from 'refract';

export const themeRefraction = createRefraction('light');
```
```jsx
// ThemeToggle.js
import { useRefraction } from 'refract';
import { themeRefraction } from './themeRefraction';

function ThemeToggle() {
  const [theme, setTheme] = useRefraction(themeRefraction);

  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      Switch to {theme === 'light' ? 'dark' : 'light'} mode
    </button>
  );
}
```
```jsx
// Header.js
import { useRefraction } from 'refract';
import { themeRefraction } from './themeRefraction';

function Header() {
  const [theme] = useRefraction(themeRefraction);
  return <h1>Current theme: {theme}</h1>;
}
```
Here:

- Both `ThemeToggle` and `Header` share the same refraction.

- Changing it in one place updates it everywhere instantly.

:::tip
Start with local refractions for most state. Reach for global ones only when multiple distant parts of your app need the same source of truth.
:::
#### A Mental Picture
Here’s one way to visualize it:


**Source refraction** — where the data originates.

**Transformations** — filters, mappings, combinations.

**Consumers — components**, effects, or other refractions.

**Changes ripple outward**, just like ripples from a pebble dropped into water.






