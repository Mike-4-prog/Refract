---
title: createApp
slug: /api-reference/create-app
---

### `createApp()` - Launching Your Refract Application

`createApp` is the main entry point for starting a **Refract** application. It sets up your app’s **global reactive state**, configures plugins and tools, and prepares the state graph for use with [lenses](../core-concepts/lenses.md), [prisms](../core-concepts/optics.md#safe-prism), and components.

In addition, you can think of `createApp()` as your mission control center - it initializes everything needed to run a Refract application. Just like you'd prepare a workspace before starting a project, `createApp` sets up:

1. The reactive environment for your components.
2. The shared state container.
3. The plugin ecosystem.

### The Heart of Your Application

Every Refract app starts with a single `createApp` call. It works like this:

1. **You give it your root component** - This becomes your app's starting point
2. **It returns an app instance** - With methods to control your application
3. **You mount it to the DOM** - Telling Refract where to render everything

```js
import { createApp } from 'refract';
import App from './App';

// Initialize your application
const myApp = createApp(App);

// Start it in the browser
myApp.mount('#root');
```

### Why It Matters
Before building components or adding reactivity, every Refract app needs three core foundations:

1. A **root state container** where all data lives
2. A system to **scope and react** to changes (powered by [Optics](../core-concepts/optics))
3. Lifecycle management for updates and effects

The `createApp` function handles all this with a single call, giving you:

#### 1. Automatic Reactivity System
Refract wires up reactivity out of the box. This means you don’t have to manually track dependencies or manage when components update — the framework does it for you.

When you initialize your app, Refract automatically configures:

- **Reactive Graph**: Tracks all state changes and their dependencies
- **Optical Context**: Enables components to share state through [lenses and refractions](../core-concepts/refractions)
- **Smart Updates**: Batches and optimizes UI updates efficiently

```js
import { createApp } from 'refract';
import App from './App';

const app = createApp(App);
app.mount('#root');
```

#### 2. Custom Configuration Options
You can customize how your app starts — preloading data, changing defaults, or adding new capabilities via plugins.

Need to preload data or extend functionality? `createApp` accepts optional settings:

```js
createApp(RootComponent, {
  // Pre-populate your state
  initialState: { 
    user: null, 
    theme: 'light' 
  },
  
  // Add plugins like routing or analytics
  plugins: [router(), analytics()]
});
```

#### 3. Initial State Use Cases:
Setting `initialState` helps your app start with meaningful data instead of a blank slate.
- Loading cached user sessions
- Applying saved UI preferences
- Hydrating server-rendered content ([SSR Guide](../advanced-guides/server-side-rendering))

#### 4. Plugin Ecosystem:
Plugins extend your app’s capabilities without rewriting core logic. They integrate seamlessly during app creation.
- Routing solutions
- State persistence
- Developer tools
- [Explore plugins](../extending-refract/plugins)

### Mounting Your Application

The `mount` method activates your app in the browser with several options:

```js
// Standard DOM mounting
app.mount('#app-container');

// Server-Side Rendering hydration
app.mount('#root', { hydrate: true });

// Manual DOM element attachment
const container = document.getElementById('app');
app.mount(container);
```

:::important
Call `mount` exactly once per application instance. Multiple mounts will cause errors.
:::

### Scoping State with Lenses

While `createApp` establishes your global state, lenses let you create focused views into specific portions. This precision control means:

- Only components using a lens will update when its specific data changes
- You can maintain clean separation of concerns
- Performance improves by avoiding unnecessary re-renders

```js
import { createLens } from 'refract';

// Create a lens focused on the user object
const userLens = createLens(app.state, s => s.user);
```

### Real-World Implementation Patterns

#### Pattern 1: Global Form State
Perfect for multi-step forms where different components need access to form data:

```js
const formLens = createLens(app.state, s => s.form);

// Usage in component:
function AddressForm() {
  const address = formLens.focus(s => s.address);
  return <input value={address.value.street} ... />;
}
```

#### Pattern 2: API Response Normalization
When working with API data that needs transformation:

```js
const usersTraversal = createTraversal(
  app.state,
  s => s.api.users,
  (users, updateFn) => users.map(updateFn)
);

// Apply to all users
usersTraversal.update(users => normalizeUsers(users));
```

### Best Practices & Important Notes

:::tip State Management Strategy
- Use `createApp` state for **global** shared data
- Use Refractions (`useRefraction`) for **local** component state
- Use Lenses for **scoped** shared state
:::

:::danger Critical Warning
Never mutate state directly:
```js
// ❌ Wrong - breaks reactivity
app.state.user.name = 'New Name';

// ✅ Correct - use lenses
userLens.update(user => ({ ...user, name: 'New Name' }));
```
:::

#### Complete Implementation Example

Putting it all together:

```jsx
import { createApp, createLens } from 'refract';

// 1. Initialize app with state
const app = createApp({ 
  count: 0,
  user: { name: 'Guest' }
});

// 2. Create focused lenses
const countLens = createLens(app.state, s => s.count);
const userLens = createLens(app.state, s => s.user);

// 3. Use in components
function Counter() {
  const [count] = countLens.use();
  return (
    <div>
      <button onClick={() => countLens.set(count + 1)}>
        Count: {count}
      </button>
      <UserProfile />
    </div>
  );
}

function UserProfile() {
  const [user] = userLens.use();
  return <span>Hello, {user.name}</span>;
}

// 4. Mount the app
app.mount('#root');
```

Key takeaways from this example:
1. Global state initialization
2. Precise state scoping with lenses
3. Clean component separation
4. Proper mounting procedure
### Next Steps

Now that you understand application initialization:
- 🏗️ [Build your first app](http://localhost:3000/docs/tutorials/build-a-counter-app)
- ⚙️ Explore [advanced configuration](/api-reference/create-app#advanced-options)(link needed)
- 🚀 Learn [performance optimization](/advanced-guides/performance-optimization)(link needed)

Remember, `createApp` is just the beginning - your Refract journey starts here!
