---
id: typescript-support
title: TypeScript Support
sidebar_label: TypeScript Support
description: Learn how Refract works seamlessly with TypeScript for safer and more productive development.
---

Refract is built with **TypeScript in mind from day one**.  That means you don’t need extra plugins, configuration hacks, or wrappers to get strong typing across your app. Whether you’re building small components or wiring up advanced [Optical Composition Patterns](./optical-composition-patterns.md), you’ll benefit from reliable type checking and autocompletion.

### The Case for TypeScript

TypeScript isn’t just about catching typos — it gives you a **safety net** when your app grows.  
With TypeScript:

- You avoid runtime errors caused by passing the wrong data.
- Your editor can **autocomplete** functions and state hooks, saving you from hunting docs.
- Refactoring becomes far less scary, since TypeScript points out broken contracts.

:::info
 If you’re new to TypeScript, check out the [official docs](https://www.typescriptlang.org/docs/) for gentle introduction. Refract assumes a basic familiarity but doesn’t require you to be a TypeScript expert.
:::

### Getting Started with TypeScript
#### Installation and Setup
First, make sure you have TypeScript installed:
```bash
npm install -D typescript @types/node
```
#### Create a `tsconfig.json` in your project root:
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```
:::info Strict Mode Recommendation
We recommend starting with strict: true - it might feel restrictive at first, but it prevents entire categories of bugs and makes your code more robust.
:::


### Typing Your Refractions

A **Refraction** is the basic reactive state unit in Refract. By default, Refract will infer the type from your initial state — but you can also specify it explicitly for clarity.

```ts
import { useRefraction } from '@refract-framework/core';

const [count, setCount] = useRefraction<number>(0);
```
Here, `count` will always be a `number`, and `setCount` won’t let you pass anything else. This plays really well with examples like [Building a Counter App](http://localhost:3000/docs/tutorials/build-a-counter-app), where you’re iterating quickly but still want guardrails.

### Typing Lenses
[Lenses](http://localhost:3000/docs/core-concepts/lenses) let you zoom in on parts of your state. When you type them properly, you get both **safety** and **clarity**:
```ts
import { createLens } from '@refract-framework/core';

type User = { id: string; name: string; online: boolean };

const userLens = createLens<User, boolean>(
  (user) => user.online,
  (user, online) => ({ ...user, online })
);
```
Now, whenever you use userLens, TypeScript knows you’re dealing with a boolean. This avoids bugs like toggling with the wrong type. See also [Optics](http://localhost:3000/docs/core-concepts/optics) for a deeper look at composing lenses and reusable patterns.

### Strongly Typed Components
Components in Refract are created with [createComponent](http://localhost:3000/docs/api-reference/create-component). You can pass TypeScript props just like in React or Vue:
```ts
type GreetingProps = {
  name: string;
};

const Greeting = createComponent<GreetingProps>(({ name }) => {
  return <h1>Hello, {name}!</h1>;
});
```
This means if you forget to pass `name`, or pass a number instead of a string, your compiler will complain right away.

### Advanced: Typing Optics
[Optics](http://localhost:3000/docs/core-concepts/optics) allow you to encapsulate state and logic. They become even more powerful when fully typed:
```ts
type Theme = 'light' | 'dark';

const themeOptic = createOptic<Theme>({
  get: () => 'light',
  set: (theme) => console.log('Theme set to', theme),
});
```
With TypeScript, you’ll only be able to set **'light'** or **'dark'** — no chance of introducing **'blue'** by mistake.

:::warning
 This strict typing is especially handy when working with [Global Theme Switcher](http://localhost:3000/docs/tutorials/global-theme-switcher)
 or other cross-cutting features.
:::
### Working With the API Reference
Every API you’ve seen so far is fully typed out of the box:
- [createApp](http://localhost:3000/docs/api-reference/create-app)

- [createComponent](http://localhost:3000/docs/api-reference/create-component)

- [useRefraction](http://localhost:3000/docs/api-reference/reactivity-api)

- [useOptic](http://localhost:3000/docs/api-reference/reactivity-api)

Hovering over them in your editor should reveal their signatures. This is your **inline documentation**, no extra lookup needed.

### Migrating from JavaScript
Already started your project in JavaScript? Don’t worry — you can incrementally adopt TypeScript in Refract:
1. Rename `.js` files to `.ts` or `.tsx`.

2. Add explicit types to your refractions and props.

3. Let inference do the rest.
You don’t need to rewrite everything — start small and grow as you go.

:::info
If you’re experimenting quickly, you can still use plain JavaScript. TypeScript is recommended but not mandatory.
:::



