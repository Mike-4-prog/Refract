---
id: overview
title: Extending Refract
sidebar_label: Overview
description: Learn how to extend Refract with plugins, custom routers, and even compilers. This section introduces the flexibility and extensibility of the Refract framework.
---

### An Overview

Refract is lightweight at its core, but it’s not meant to stop there. You can **extend it in powerful ways**—from adding plugins that bring in extra functionality, to wiring up your own router, or even exploring compiler-level customization. This section gives you a **bird’s-eye view** of what’s possible and points you toward the deep dives in later pages.

### Why Extension Matters

Out of the box, [Refract’s core concepts](../core-concepts/refractions.md) give you state management, composition, and reactive updates. But in real-world apps, you’ll often need more:

- Custom routing for navigation  
- Plugins to share logic across projects  
- Compiler tweaks for performance or custom syntax  

Extensibility is how you shape Refract to fit your project’s unique needs.

:::info
 If you’re just getting started, make sure you’ve gone through the [Getting Started section](../getting-started/introduction.md) first. This overview assumes you’re already comfortable with the basics of building apps with Refract.
:::

### What You'll Learn Here

This section is divided into four main topics:

1. [**Plugins**](http://localhost:3000/docs/extending-refract/plugins) — How to package reusable features and share them across apps.  
2. [**Router**](http://localhost:3000/docs/extending-refract/router) — Adding navigation and route-based state handling.  
3. [**Compiler**](http://localhost:3000/docs/extending-refract/compiler) — Advanced customization at the build layer.  
4. **Overview (this page)** — Context, philosophy, and how everything ties together.  

Think of this page as your **map of the territory**, while the others are your **field guides**.

### Plugins at a Glance

Plugins let you bundle up functionality so you don’t repeat yourself. For example, imagine a plugin for **global theming** or **analytics integration**. They can hook into [components](../core-concepts/components.md), extend the lifecycle, and even expose new utilities.

 **Pro Tip**: Plugins are especially useful if you’re building a design system or shared infrastructure across multiple apps.

Dive into details in the [Plugins page](http://localhost:3000/docs/extending-refract/plugins).

### The Router

Routing in Refract isn’t baked in by default. This is intentional—you have the freedom to choose the right approach for your project. In this section, we’ll show you how to build or plug in a router that feels **native** to Refract’s reactive model.

We’ll connect the dots back to concepts like [optics](../core-concepts/optics.md), since routing often requires scoping and composition of state.

:::caution
 If your app is small (like the [Counter App tutorial](../tutorials/build-a-counter-app.md)), adding a router may be overkill. Consider it only when your app truly needs navigation.
:::

Learn more in the [Router page](http://localhost:3000/docs/extending-refract/router).

### Compiler Customization

This is where things get really advanced. The compiler is how Refract transforms your code into something that runs efficiently in the browser. Extending it means you can:

- Add **syntax sugar** for your team  
- Experiment with **performance optimizations**  
- Integrate **custom build-time checks**  

It’s not for everyone, but if you’re building a framework on top of Refract, or you need deep-level control, this is your playground.

We’ll revisit concepts from [Performance Optimization](../advanced-guides/performance-optimization.md) here, since compilers are a big part of squeezing out speed.

Go deeper in the [Compiler page](http://localhost:3000/docs/extending-refract/compiler).

### How This Fits Into the Bigger Picture

Here’s how extensibility connects to the rest of the documentation:

- If you want **practical examples**, revisit the [Tutorials](../tutorials/build-a-counter-app.md) — they lay the foundation you’ll later extend.  
- If you’re interested in **maintaining code quality**, check out [Side Effects Management](../advanced-guides/side-effects-management.md).  
- For typing and safety, see [Type Safety in Refract](../advanced-guides/typescript-support.md).  

Refract is designed so you can learn **step by step**, and extension is one of the final layers.

### Further Reading

- [Refractor: Compiler Customization in JS Frameworks (external)](https://esbuild.github.io/) — learn how popular compilers shape modern frameworks.  
- [The Plugin Ecosystem (external)](https://vitejs.dev/guide/api-plugin.html) — Vite’s plugin system is a great mental model.  

### Wrapping Up

Extending Refract isn’t just about adding more features—it’s about **making Refract your own**. Whether that’s through plugins, routing, or compiler hacks, you now know the roadmap.  

 Next, head over to the [Plugins guide](http://localhost:3000/docs/extending-refract/plugins) to see how you can package and share functionality in a clean, reusable way.
