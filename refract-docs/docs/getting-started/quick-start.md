---
id: quick-start
title: Quick Start
slug: /getting-started/quick-start
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Set Up Your Project

You can start a new Refract app using your favorite package manager.

### Prerequisites

- [Node.js ≥ 16](https://nodejs.org/)
- A modern browser
- A code editor (we recommend [VS Code](https://code.visualstudio.com/))

### Install with your preferred package manager

<Tabs>
  <TabItem value="npm" label="npm" default>

```bash
npm create refract-app my-app
cd my-app
npm install
npm run dev
```
</TabItem> <TabItem value="yarn" label="Yarn">
```bash
yarn create refract-app my-app
cd my-app
yarn
yarn dev
```
</TabItem> <TabItem value="pnpm" label="pnpm">
```bash
pnpm create refract-app my-app
cd my-app
pnpm install
pnpm dev
```
</TabItem> </Tabs>
:::tip
If you see an error during setup, double-check that [Node.js](https://nodejs.org/) is installed and up-to-date by running `node -v.`
:::

### Project Structure
Before diving into code, it is helpful to understand how a typical Refract project is organized.

Refract follows a modular structure where you separate your UI components, reactive logic (optics), configuration, and application entry points for better maintainability.

Here is a minimal file structure you should see:
```txt
my-app/
├── components/
│   └── Counter.js         # Your UI component
├── optics/
│   └── useTheme.js        # Your reusable logic (optics)
├── refract.config.js      # Project-specific configurations
├── main.js                # Entry point of your app
└── index.html             # HTML host for your app
```
:::tip
This separation of concerns helps Refract enforce clarity and composability.
:::

### Your First Component
Let’s create a simple Counter component using Refract.

Components in Refract are built using `createComponent()`. They rely on lenses to manage state, and refractions to track reactive values. This is similar to `useState` in React, but scoped and modular.
Create a simple `Counter.js` component:
```js
// components/Counter.js
import { createComponent } from 'refract';

export const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);

  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicked {count.value} times
    </button>
  );
});
```
:::info
Components in Refract are pure functions powered by lenses and refractions.
:::

### Bootstrapping the App
Once your component is ready, you need to **mount** it using Refract’s `createApp()` function. This is typically done in the main.js file.
```js
// main.js
import { createApp } from 'refract';
import { Counter } from './components/Counter';

createApp(Counter).mount('#root');
```
Then, link your app in the HTML file:
```html
<!-- index.html -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Refract App</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="./main.js"></script>
  </body>
</html>
```
This sets up your entire application, mounting the root component `(Counter)` inside the `#root` div.
### Adding Reactive State
Now let us expand our Counter to track **multiple pieces of state** using lenses and refractions.

We will add a label that updates along with the count:
```js
const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  const label = lens.useRefraction('Clicks');

  return (
    <div>
      <h2>{label.value}: {count.value}</h2>
      <button onClick={() => count.set(count.value + 1)}>Add</button>
    </div>
  );
});
```
:::tip
 This demonstrates the power of Refract’s reactivity model — UI updates are declarative and automatic when state changes.
:::

Want to share your ideas or contribute? [Star us on GitHub](https://github.com/Mike-4-prog/Refract) and explore the codebase!

 You’re all set! Build something cool and refractive!





