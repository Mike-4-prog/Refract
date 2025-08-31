---
id: side-effects-management
title: Side Effects Management
slug: /advanced-guides/side-effects-management
---

Managing side effects is one of the most important skills you’ll develop as you build more complex applications with **Refract**. While **[refractions](../core-concepts/refractions.md)** and  **[lenses](../core-concepts/lenses.md)** give you precise reactive state control, side effects help your app interact with the outside world—think HTTP requests, timers, logging, or interacting with browser APIs.  

In this guide, we’ll explore **how to handle side effects cleanly, efficiently, and safely** so your Refract apps stay predictable and maintainable.

### What Are Side Effects?

In simple terms, a side effect is **any operation that reaches outside the scope of your component or function and modifies something elsewhere**. Examples include:

- Fetching data from a server  
- Updating `localStorage`  
- Logging events or analytics  
- Triggering a timer or interval  

:::Pro tip
If you’re unsure whether something counts as a side effect, ask: “Does this affect anything outside my component or observable state?” If yes, it’s a side effect.
:::

In Refract, we manage side effects primarily using the **`useEffect`** and **`useFlash`** APIs. You can read their detailed reference in **[lifecycle-Api](http://localhost:3000/docs/api-reference/lifecycle-api)**

### Basic Side Effects with `useEffect`

`useEffect` in Refract is inspired by familiar patterns from other reactive frameworks. It allows you to **run code in response to reactive state changes**.  

Think of it as a bridge between your reactive logic and the real world. For example, updating the document title when a counter changes is a side effect.

:::caution
Avoid placing heavy computations inside `useEffect` directly. Instead, compute values reactively and use effects only for interactions with external systems.
:::

For a hands-on example, check out our tutorial on the **[Global Theme Switcher](http://localhost:3000/docs/tutorials/global-theme-switcher)**. It demonstrates how theme changes trigger a side effect to update CSS variables in real-time.

### One-Time and Cleanup Effects

Not all effects should run every time state changes. Refract lets you **control when effects run** and how they clean up afterward.  

- **One-time effect:** Run code only once, e.g., fetching initial data when a component mounts.  
- **Cleanup effect:** Clean up subscriptions, timers, or event listeners to prevent memory leaks.

:::important
Remember, neglecting cleanup can lead to **unexpected bugs** or **performance degradation**, especially in long-lived apps.
:::

For more, see our detailed breakdown of **[lifecycle API](http://localhost:3000/docs/api-reference/lifecycle-api)**.

### Flash Effects with `useFlash`

Sometimes, effects are **temporary and ephemeral**, meant to happen just for a moment or under a very specific condition. That’s where **`useFlash`** comes in.  

`useFlash` is perfect for:

- Showing a toast or notification  
- Triggering a one-off animation  
- Temporary logging 

 Learn how `useFlash` integrates with **[optics](../core-concepts/optics.md)** for reusable, composable logic.

### Best Practices for Side Effects

Managing side effects can get tricky in larger applications. Here are some tips for keeping them clean:

1. **Keep effects small and focused**  
   Each effect should do **one thing**. Avoid mixing multiple responsibilities.  

2. **Use cleanup functions**  
   Any effect that subscribes to an event or timer should clean up after itself.  

3. **Prefer reactive state over manual updates**  
   When possible, compute derived values with **refractions** or **lenses** instead of manually syncing external states.  

4. **Isolate heavy operations**  
   Offload long-running tasks to background workers or asynchronous functions to avoid blocking the UI.

:::info
For performance-focused apps, refer to our **[Performance Optimization guide](http://localhost:3000/docs/advanced-guides/optical-composition-patterns)**, which includes tips for efficient effect management.
:::

### Composing Effects

Advanced Refract patterns allow you to **compose side effects with optics**. This makes it possible to reuse effect logic across multiple components or modules.  

For example, you might create an optic that manages notifications globally or logs analytics events without duplicating code. See **[Optical Composition Patterns](./optical-composition-patterns.md)** for practical examples.

### External References

For a broader understanding of reactive side effect management, these resources are highly recommended:

- [React Hooks – Using the Effect Hook](https://reactjs.org/docs/hooks-effect.html) – Excellent conceptual overview  
- [MDN Web Docs: EventTarget.addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) – Deep dive into cleanup patterns  
- [JavaScript Promises & Async Patterns](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises) – For managing asynchronous effects  

### Summary

- Side effects allow your Refract app to interact with the outside world.  
- `useEffect` handles reactive and persistent effects, while `useFlash` manages temporary effects.  
- Always clean up effects and keep them focused for predictable apps.  
- Composing effects with optics ensures **reusable and maintainable logic**.  

 **Next Step:** 

 Once you’re comfortable with side effects, check out **[performance optimization](http://localhost:3000/docs/advanced-guides/performance-optimization)** to make your effects efficient and your app snappy.


