---
title: Introduction
slug: /getting-started/introduction
---

### Welcome to Refract

import Robot from '@site/static/img/refract-illustration.png';

:::info Version: Production
This is the latest documentation for **Refract**.  
For experimental features, see the [Staging docs](https://refract-stg.netlify.app/).
:::

<div style={{
  display: 'flex',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0bbbd6, #0d1f2d)',
  color: 'white',
  borderRadius: '10px',
  padding: '1.5rem 2rem',
  margin: '1.5rem 0'
}}>
  <div style={{flex: '0 0 180px', textAlign: 'center'}}>
   <img src={Robot} alt="Refract robot" style={{maxWidth: '150px'}} />
</div>
  <div style={{flex: 1, marginLeft: '2rem', maxWidth: '70%'}}>
    <h2 style={{marginBottom: '0.75rem', whiteSpace: 'nowrap'}}>
    </h2>
    <p style={{lineHeight: 1.5}}>
      <strong>Refract</strong> is a reactive, composable, and optics-powered JavaScript framework 
      for building user interfaces with precision. Whether you’re a seasoned React developer 
      or exploring declarative UI design, Refract offers a refreshing take on frontend development.
    </p>
  </div>
</div>


> "A new way to build reactive UIs — clear, declarative, and optics-powered."

### Why Refract?

**[Refract](https://refract-production.netlify.app/)** is designed for developers who are tired of juggling complex state logic, boilerplate, and frameworks that get in the way of building. Imagine being able to focus on **what your app should do** rather than how to wire everything together.  

With Refract, you spend less time fighting your tools and more time creating clear, predictable, and scalable UIs. It’s not about reinventing the wheel—it’s about giving you a sharper, more flexible lens to build with.  

Here’s what makes it stand out:  

- **Refractions**: Reactive state units  
- **Lenses**: Scoped state access and lifecycle handling  
- **Optics**: Reusable reactive logic patterns  
- **Optical Composition**: Modular, dependency-aware UI logic reuse  
- **Compiler Optimizations**: For better performance and tree-shaking  

:::info
Refract is designed with a focus on modularity, reactivity, and developer experience. It encourages clean abstractions that make complex UI logic easier to build, maintain, and scale.
:::

### Core Concepts

#### Components

In **[Refract](https://refract-production.netlify.app/)**, components are created using `createComponent()`. Think of them like React components, but without the boilerplate:

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

- **[Quick Start Guide](http://localhost:3000/docs/getting-started/introduction)**

- **[Core Concepts](http://localhost:3000/docs/core-concepts/refractions)**

- **[Advanced Features](http://localhost:3000/docs/advanced-guides/side-effects-management)**

- Want to contribute?
Visit the [GitHub repo](https://github.com/Mike-4-prog/Refract) or check the [Contributing Guide](http://localhost:3000/docs/contributing-guide).

Ready to build better, reactive UIs?

 Let’s get started!


