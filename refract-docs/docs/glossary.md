---
id: glossary
title: Glossary
slug: /glossary
---

Welcome to the Refract glossary! This page explains all the important terms and concepts you'll encounter while learning and using Refract. Think of this as your quick reference guide whenever you come across unfamiliar terminology.

:::tip How to Use This Glossary
- **New to Refract?** Browse through to get familiar with key concepts
- **Reading documentation?** Use this page as a quick reference when you encounter unfamiliar terms
- **Getting stuck?** Return here to clarify concepts before moving forward
:::

### A-C

#### App
A Refract application is the top-level container that manages your entire UI. You create an app using the [`createApp`](/docs/api-reference/create-app) function, which sets up the optical system and serves as the foundation for all your components.

#### Component
Components are reusable pieces of UI that can contain their own state and logic. In Refract, components are created using [`createComponent`](/docs/api-reference/create-component) and integrate seamlessly with the optical system. They're similar to components in other frameworks but with built-in optical capabilities.

#### Compiler
The Refract compiler processes your code to optimize performance and enable advanced features. While you typically don't interact with it directly, understanding its role helps appreciate how Refract works under the hood. Learn more in the [Compiler extension guide](/docs/extending-refract/compiler).

:::info Relationship Alert
Components use refractions for state, optics for transformations, and lenses for focused access—all working together within an app!
:::

### D-F

#### Effects
In Refract, effects refer to operations that interact with the outside world, such as API calls, DOM manipulations, or subscriptions. They're managed through Refract's effect system, which helps keep them predictable and testable. The [Side Effects Management guide](/docs/advanced-guides/side-effects-management) covers this in detail.

#### Flash (useFlash)
Part of Refract's lifecycle management system, `useFlash` (now merged into the lifecycle API) handles short-lived operations and cleanup tasks. It's particularly useful for operations that need to complete quickly or require specific cleanup.

### G-L

#### Global State
State that's accessible across multiple components in your application. Refract provides patterns for managing global state through shared refractions and optical patterns. The [Global Theme Switcher tutorial](/docs/tutorials/global-theme-switcher) demonstrates practical global state management.

#### Lens
A lens is a powerful concept that lets you "focus" on a specific part of a larger data structure. Think of it like zooming in on one detail in a complex object without losing sight of the whole picture. Lenses are incredibly useful for working with nested state. Dive deeper in the [Lenses guide](/docs/core-concepts/lenses).

:::important Optical Family
Lenses belong to the broader category of optics—they're one specific type of optical tool among several available in Refract.
:::

#### Lifecycle
Refract components have a lifecycle that includes creation, updates, and destruction. The lifecycle API (which merges `useEffect` and `useFlash` concepts) helps you manage side effects and component behavior throughout these stages. Learn more in the [Lifecycle API documentation](/docs/api-reference/lifecycle-api).

### M-O

#### Optics
Optics are reusable patterns for working with data transformations. They provide a structured way to manipulate and access data within your refractions. Optics include various types like lenses, prisms, and traversals—each serving different purposes. Start with the [Optics overview](/docs/core-concepts/optics) to understand this fundamental concept.

#### Optical Composition
The practice of combining multiple optics to create more complex data transformations. This allows you to build sophisticated behavior from simple, reusable pieces. The [Optical Composition Patterns guide](/docs/advanced-guides/optical-composition-patterns) shows how to master this technique.

:::success Composition Power
Optical composition lets you build complex data transformations like building with LEGO bricks—small, simple pieces that combine into something powerful!
:::

### P-R

#### Performance Optimization
Techniques and patterns for making your Refract applications faster and more efficient. Refract's optical approach offers unique optimization opportunities that differ from traditional frameworks. The [Performance Optimization guide](/docs/advanced-guides/performance-optimization) covers specific strategies.

#### Plugin
Extend Refract's capabilities by creating or using plugins. Plugins can add new functionality, integrate with other libraries, or customize Refract's behavior. Learn how to work with them in the [Plugins guide](/docs/extending-refract/plugins).

#### Prism
Another type of optic that's particularly useful for working with optional or conditional data structures. Prisms help you safely access data that might not exist, similar to how you might handle optional values in TypeScript.

#### Reactivity
The system that automatically updates your UI when underlying data changes. Refract's reactivity is built on refractions and optics, providing fine-grained control over what gets updated and when. The [Reactivity API guide](/docs/api-reference/reactivity-api) explains the available tools.

#### Refraction
The fundamental reactive state unit in Refract. Refractions are containers that hold your data and automatically notify dependent parts of your application when that data changes. They're similar to state in other frameworks but with optical capabilities built in. Start learning with the [Refractions guide](/docs/core-concepts/refractions).

:::info Core Concept
If you learn only one term from this glossary, make it "refraction"—it's the heart of Refract's state management system!
:::

#### Router
While not built into core Refract, routing is available as an extension. The router helps manage navigation and URL state in single-page applications. See the [Router extension guide](/docs/extending-refract/router) for implementation details.

### S-Z

#### Side Effects
Operations that interact with the world outside your application's state, such as API calls, timers, or DOM manipulations. Refract provides structured ways to manage side effects to keep them predictable and testable.

#### Traversal
A type of optic that lets you work with collections of data, like arrays or lists. Traversals help you apply operations to multiple items in a consistent way.

#### TypeScript Support
Refract's compatibility with TypeScript, including type definitions and type-safe patterns. The framework is designed with TypeScript in mind, providing excellent type safety throughout. The [TypeScript Support guide](/docs/advanced-guides/typescript-support) helps you set it up.

#### useFlash
Now part of the lifecycle API, this concept handled short-lived operations and immediate effects. It was particularly useful for operations that needed to complete quickly or required specific cleanup procedures.

#### useOptic
Merged into the reactivity API, this was a hook for working with optics within components. It allowed components to access and transform data using optical patterns.

#### useRefraction
Also merged into the reactivity API, this hook was used for creating and accessing refractions within components. It served as the primary way components interacted with reactive state.

### Conceptual Relationships

#### How These Terms Fit Together
Understanding how Refract's concepts relate to each other is key to mastering the framework:

- **Apps** contain **components**
- **Components** use **refractions** for state
- **Refractions** are manipulated using **optics** (including **lenses**, **prisms**, and **traversals**)
- **Optical composition** combines multiple optics for complex transformations
- The **lifecycle API** manages **effects** and component behavior
- Everything can be extended through **plugins** and optimized for **performance**

:::success Learning Path
Start with refractions and components, then explore optics and lenses. Once comfortable, dive into advanced topics like optical composition and effects management.
:::

### Still Not Finding What You Need?

If you encounter a term that isn't covered here:

1. **Check the search function** in the documentation—the term might be covered elsewhere
2. **Look at practical examples** in the [tutorials section](/docs/tutorials/build-a-counter-app)
3. **Review API references** for specific functions or patterns
4. **Consider it might be framework-agnostic**—some terms are general web development concepts

:::important Community Resource
This glossary grows with the framework. If you notice a term missing or need clarification, please consider [contributing](/docs/contributing-guide) to make this resource better for everyone!
:::

*This glossary is part of the Technical Writers Mentorship Program capstone project. The terms and concepts explained here demonstrate documentation best practices for a comprehensive framework glossary.*

