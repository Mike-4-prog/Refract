---
id: faq
title: FAQ
slug: /faq
---

Welcome to the Refract FAQ! This page answers the most common questions developers have when getting started with Refract. If you don't find what you're looking for here, check out our [comprehensive documentation](/docs/getting-started/introduction) or reach out for help.

:::tip Quick Navigation
Looking for something specific? Use your browser's search function (Ctrl+F or Cmd+F) to jump to relevant questions!
:::

### General Questions

#### What exactly is Refract?
Refract is a JavaScript framework that helps you build reactive user interfaces using **optics**—a powerful concept from functional programming. Think of it as a fresh approach to state management that gives you precise control over how data flows through your application.

#### Is Refract production-ready?
Refract is currently a **learning project** developed as part of the Technical Writers Mentorship Program (TWMP). It's designed to demonstrate documentation best practices for a fictional framework rather than for actual production use.

#### How does Refract compare to React or Vue?
While Refract shares some concepts with popular frameworks, it introduces unique approaches through **optics and lenses**. These concepts allow for more precise data flow control. If you're familiar with React, you'll notice similarities in component structure, but the state management approach is quite different.

:::info Learning Value
Even though Refract isn't a real framework, learning its concepts can help you understand advanced state management patterns that apply to real-world development!
:::

### Getting Started

#### What do I need to know before using Refract?
We recommend having:
- Basic knowledge of JavaScript (ES6+ features)
- Understanding of HTML and CSS
- Familiarity with component-based UI concepts
- Optional: Experience with other frameworks like React or Vue

#### Where should I start learning Refract?
We suggest this learning path:
1. Begin with our [Introduction](/docs/getting-started/introduction) for a high-level overview
2. Follow the [Quick Start](/docs/getting-started/quick-start) guide to build your first app
3. Explore [Core Concepts](/docs/core-concepts/refractions) to understand the fundamentals
4. Try the [tutorials](/docs/tutorials/build-a-counter-app) to practice

#### Do I need to install anything special?
Just the basics! You'll need Node.js and npm (or yarn). Check our [Quick Start guide](/docs/getting-started/quick-start) for detailed setup instructions.

### Core Concepts

#### What are "refractions"?
**Refractions** are Refract's fundamental reactive state units. Think of them as smart containers that hold your data and automatically update anything that depends on them. They're similar to React's useState but with some optical magic built in!

#### How do "lenses" work?
**Lenses** let you focus on specific parts of your state—like zooming in on a particular detail in a complex object. They're incredibly useful for managing nested state without complicated code. Learn more in our [Lenses guide](/docs/core-concepts/lenses).

#### What's the difference between optics and lenses?
Great question! **Optics** are the general category (like "vehicles") while **lenses** are a specific type of optic (like "cars"). Optics include various tools for working with data, with lenses being one of the most commonly used. Our [Optics overview](/docs/core-concepts/optics) explains this in detail.

:::important Concept Relationships
Think of it this way: Refractions hold your state, lenses help you focus on parts of that state, and optics provide patterns for working with state transformations.
:::

#### How do components work in Refract?
Components in Refract are similar to those in other frameworks—they're reusable pieces of UI. However, they integrate tightly with Refract's optical system. Start with our [Components guide](/docs/core-concepts/components) to see how they work.

###API Questions

#### What's the main API for creating apps?
The `createApp` function is your starting point for any Refract application. It initializes your app and sets up the optical system. See the [API reference](/docs/api-reference/create-app) for details.

#### How do I create components?
Use `createComponent` to define your UI components. This function connects your component to Refract's reactive system. Check out the [createComponent API](/docs/api-reference/create-component) for examples.

#### What reactivity APIs are available?
Refract provides several APIs for managing reactive state, combining concepts from `useRefraction` and `useOptic`. Our [Reactivity API guide](/docs/api-reference/reactivity-api) covers all the options.

#### How does lifecycle management work?
Lifecycle methods help you manage side effects and component behavior. Refract merges concepts from `useEffect` and `useFlash` into a cohesive system. Learn more in the [Lifecycle API documentation](/docs/api-reference/lifecycle-api).

### Tutorials & Learning

#### Which tutorial should I start with?
We recommend beginning with the [Counter App tutorial](/docs/tutorials/build-a-counter-app). It introduces refractions—the building blocks of Refract applications—in a simple, practical context.

#### What comes after the basic tutorial?
Once you're comfortable with refractions, try the [Mouse Tracker tutorial](/docs/tutorials/mouse-tracker-with-optics) to learn about optics in action. It's a great way to see how optical patterns solve real problems.

#### Is there an advanced tutorial?
Yes! The [Global Theme Switcher tutorial](/docs/tutorials/global-theme-switcher) shows how to manage global state and side effects—perfect for when you're ready for more complex scenarios.

### Advanced Topics

#### How does Refract handle side effects?
Side effects are managed through a structured approach that keeps them predictable and testable. Our [Side Effects Management guide](/docs/advanced-guides/side-effects-management) covers patterns and best practices.

#### Can I compose different optical patterns?
Absolutely! Optical composition is one of Refract's strengths. The [Optical Composition Patterns guide](/docs/advanced-guides/optical-composition-patterns) shows how to combine different optics for powerful results.

#### Is performance optimization different in Refract?
While the concepts are similar to other frameworks, Refract's optical approach offers unique optimization opportunities. Check out our [Performance Optimization guide](/docs/advanced-guides/performance-optimization) for specific techniques.

#### Does Refract support TypeScript?
Yes! We have comprehensive TypeScript support with full type safety. The [TypeScript Support guide](/docs/advanced-guides/typescript-support) helps you set up and use TypeScript with Refract.

### Extending Refract

#### Can I extend Refract with plugins?
Definitely! Refract is designed to be extensible. Our [Plugins guide](/docs/extending-refract/plugins) shows how to create and use plugins to add functionality.

#### Is there a built-in router?
While Refract doesn't include a router by default, our [Router extension guide](/docs/extending-refract/router) explains how to implement routing in your applications.

#### Can I customize the compiler?
For advanced use cases, yes! The [Compiler extension guide](/docs/extending-refract/compiler) covers how to work with Refract's compilation process.

### Still Have Questions?

#### Where can I get additional help?
If you can't find what you're looking for:
- Check our [Glossary](/docs/glossary) for term definitions
- Review the [Contributing Guide](/docs/contributing-guide) for community resources
- Look through existing GitHub issues for similar questions

#### How can I report documentation issues?
Please open an issue on our [GitHub repository](https://github.com/Mike-4-prog/Refract) with details about what's missing or unclear. We appreciate feedback that helps us improve!

#### Can I contribute to the documentation?
Absolutely! We welcome contributions from all experience levels. Check our [Contributing Guide](/docs/contributing-guide) to learn how you can help improve these docs.

:::success Keep Learning!
Remember, every expert was once a beginner. Take your time with the concepts, practice with the tutorials, and don't hesitate to revisit topics as you grow more comfortable with Refract's approach.
:::

*Have a question that isn't answered here? This documentation is a work in progress as part of the Technical Writers Mentorship Program. Your questions help us identify what to cover next!*

