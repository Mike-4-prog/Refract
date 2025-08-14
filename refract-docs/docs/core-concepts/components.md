---
title: Components
slug: /core-concepts/components
---

### Building with Components

Components are the **building blocks** of Refract apps. Think of them like LEGO pieces—each one encapsulates a piece of UI, its behavior, and its connection to state. But unlike other frameworks, Refract components are *reactive by default* and *optically aware*.

```js
import { createComponent } from 'refract';

const Greeting = createComponent(({ lens }) => {
  const name = lens.useRefraction('World');
  return <h1>Hello, {name}!</h1>;
});
```
*↑ The simplest Refract component (try it in [our playground](https://play.refract.dev))*(link needed)

### Why Refract Components?

#### 1. **Automatic Reactivity**  
No need for `useState` or `useEffect`—just use refractions and everything stays in sync:
```js
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0); // Auto-updates UI when changed
  return <button onClick={() => count.set(count.value + 1)}>{count.value}</button>;
});
```

#### 2. **Optical Composition**  
Seamlessly plug in optics (reusable state logic):
```js
const UserCard = createComponent(({ lens }) => {
  const user = lens.useOptic(useUserProfile); // Reusable optic
  return <div>{user.name}</div>;
});
```
*🔗 Learn more: [Optics Guide](http://localhost:3000/docs/core-concepts/optics)*

#### 3. **Scoped Effects**  
Side effects are contained within components using lenses:
```js
lens.useEffect(() => {
  fetchData().then(updateUI);
}, []);
```
*No more dependency array guesswork—Refract tracks them automatically.*

### Component Anatomy

Here’s what makes a Refract component unique:

| Part              | Purpose                                                                 | Example                          |
|-------------------|-------------------------------------------------------------------------|----------------------------------|
| **`lens`**        | Gateway to state/effects                                                | `lens.useRefraction()`           |
| **Optics**        | Reusable state logic                                                    | `lens.useOptic(useMousePosition)`|
| **JSX**           | Declarative UI (like React)                                             | `<div>{value}</div>`             |

:::tip  
**Keep components small** and pair them with optics for complex logic. Need a pattern? See [Optical Composition Patterns](http://localhost:3000/docs/advanced-guides/optical-composition-patterns).
:::

### Creating Components

#### Basic Component
```js
const Button = createComponent(({ lens }) => {
  const clicks = lens.useRefraction(0);
  return (
    <button onClick={() => clicks.set(clicks.value + 1)}>
      Clicked {clicks.value} times
    </button>
  );
});
```

#### Composed Component
```js
// Uses an optic for mouse tracking
const MouseTracker = createComponent(({ lens }) => {
  const { x, y } = lens.useOptic(useMousePosition);
  return <div>Mouse at: {x}, {y}</div>;
});
```
*🔗 Try this in [Mouse Tracker Tutorial](http://localhost:3000/docs/tutorials/mouse-tracker-with-optics)*

### Performance Tips

:::caution  
Avoid these common pitfalls:
```js
// ❌ Don’t create refractions in render (use optics instead)
const unstable = createComponent(() => {
  const temp = useRefraction(0); // Recreated on every render
});

// ❌ Don’t forget lens for effects
createComponent(() => {
  useEffect(() => {}); // ❌ Won’t auto-cleanup! Use lens.useEffect
});
```
:::

For optimization strategies:  
➡️ [Performance Guide](/advanced-guides/performance-optimization)(link needed)

### Next Steps
- 🧩 [Build a Counter App](http://localhost:3000/docs/tutorials/build-a-counter-app) (Beginner)  
- 🎨 [Global Theme Switcher](/tutorials/global-theme-switcher) (Intermediate)(link, needed)  
- ⚡ [Performance Tricks](/advanced-guides/performance-optimization) (Advanced)(link needed)