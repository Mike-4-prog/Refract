---
title: Introduction
slug: /getting-started/introduction
---

### Welcome to Refract

> "A new way to build reactive UIs — clear, declarative, and optics-powered."

Refract is a **reactive, composable, and refraction-based JavaScript framework** for building user interfaces with clarity and precision. Whether you're a seasoned React developer or just diving into the world of declarative UI design, Refract offers a refreshing take on modern frontend development.

### What Is Refract?

Refract is a fictional JavaScript framework that emphasizes **modular, reactive, and declarative** UI development. While it borrows ideas from frameworks like React, Solid, and Svelte, Refract introduces its own powerful abstractions:

- **Refractions**: Reactive state units  
- **Lenses**: Scoped state access and lifecycle handling  
- **Optics**: Reusable reactive logic patterns  
- **Optical Composition**: Modular, dependency-aware UI logic reuse  
- **Compiler Optimizations**: For better performance and tree-shaking  

:::info
Refract is an experimental concept and not intended for production use.
:::

### Why Refract?

Refract was designed with a few key principles:

- 🧠 **Clarity** – Emphasizes readability and mental model simplicity  
- ⚛️ **Reactivity by Design** – Changes flow automatically through your UI  
- 🔬 **Composable Optics** – Write logic once, reuse it everywhere  
- 🎯 **Precise Control** – Built-in effect scoping and animation handling  


### Core Concepts

#### Components

In Refract, components are created using `createComponent()`. Think of them like React components, but without the boilerplate:

```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  );
});
```
####  Refractions
Refractions are the reactive state units in Refract:
```javascript
import { useRefraction } from 'refract';

const theme = useRefraction('light');

theme.set('dark');
console.log(theme.value); // 'dark'
```
They update your UI automatically when changed.

#### Lenses
Lenses connect component logic to reactive state and side-effects:
```js
const TodoList = createComponent(({ lens }) => {
  const todos = lens.useRefraction([]);
  lens.useEffect(() => {
    fetchTodos().then(todos.set);
  }, []);
});
```
#### Optical Composition
Encapsulate logic using `useOptic()`:
```js
function useMousePosition() {
  const pos = useRefraction({ x: 0, y: 0 });

  useOptic(() => {
    const handler = e => pos.set({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', handler);
    return () => window.removeEventListener('mousemove', handler);
  }, []);

  return pos;
}
```
![Figure 1: Refract Documentation Flowchart](/img/flow-chart1.png)
*Figure 1: Visual flow of the Refract documentation process and structure.*

#### Side Effects
Use `useEffect`, `useOptic`, and `useFlash` to handle side effects:

- `useEffect`: Standard reactive effect

- `useOptic`: Logic-level effects with caching

- `useFlash`: Post-render effects for animation
### How Refract Compares
| Feature         | Refract          | React           | Svelte          |
|-----------------|------------------|-----------------|-----------------|
| State Model     | Refractions      | Hooks/State     | Stores          |
| Reactivity      | Automatic        | Manual deps     | Compile-time    |
| Logic Reuse     | Optics           | Hooks           | Stores/Context  |

### What’s Next?
Now that you understand the basics, jump into:

📄 [Quick Start Guide](http://localhost:3000/docs/getting-started/quick-start)

🧠 Core Concepts

🧰 Advanced Features

💬 Want to contribute?
Visit the [GitHub repo](https://github.com/Mike-4-prog/Refract) or check the Contributing Guide.

Ready to build better, reactive UIs?

👉 Let’s get started!


