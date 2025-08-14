---
title: createComponent
slug: /api-reference/create-component
---

### `createComponent()` - Your UI Building Blocks

Think of `createComponent` as your factory for creating interactive, reactive pieces of UI. It's where you combine:
- Visual elements (JSX)
- Local state (Refractions)
- Side effects (Lenses)
- Business logic (Optics), into self-contained, reusable components.

```js
import { createComponent } from 'refract';

const Counter = createComponent(({ lens }) => {
  const count = lens.useRefraction(0);
  return <button onClick={() => count.set(count.value + 1)}>
    {count.value}
  </button>;
});
```
*↑ The simplest interactive component in Refract*

### Why It's Special

#### 1. Automatic Reactivity
No manual dependency arrays - components automatically track what they use:
```js
// When this refraction changes...
const user = lens.useRefraction({ name: 'Alex' });

// Only THIS component updates
return <h1>Hello {user.value.name}!</h1>;
```

#### 2. Optical Integration
Seamlessly plug in shared logic from [optics](http://localhost:3000/docs/core-concepts/optics):
```js
const UserCard = createComponent(({ lens }) => {
  const { user, loading } = lens.useOptic(useUserProfile);
  return loading ? <Spinner/> : <Profile data={user}/>;
});
```

#### 3. Scoped Effects
Effects automatically clean up when components unmount:
```js
lens.useEffect(() => {
  const timer = setInterval(doSomething, 1000);
  return () => clearInterval(timer); // Auto-cleanup
}, []);
```

### Component Anatomy

Every Refract component has three key parts:

| Part              | Purpose                                                                 | Example                          |
|-------------------|-------------------------------------------------------------------------|----------------------------------|
| **Lens Argument** | Your gateway to state and effects                                       | `({ lens }) => {}`               |
| **State**         | Local refractions or composed optics                                    | `lens.useRefraction()`           |
| **UI**            | JSX that responds automatically to state changes                        | `<div>{value}</div>`             |

:::tip
**Keep components small** - delegate complex logic to [optics](http://localhost:3000/docs/core-concepts/optics) for better reusability.
:::

### Creating Components

#### Basic Component
```js
const Toggle = createComponent(({ lens }) => {
  const isOn = lens.useRefraction(false);
  return (
    <button onClick={() => isOn.set(!isOn.value)}>
      {isOn.value ? 'ON' : 'OFF'}
    </button>
  );
});
```

#### With Effects
```js
const Clock = createComponent(({ lens }) => {
  const time = lens.useRefraction(new Date());
  
  lens.useEffect(() => {
    const timer = setInterval(
      () => time.set(new Date()), 
      1000
    );
    return () => clearInterval(timer);
  }, []);

  return <div>{time.value.toLocaleTimeString()}</div>;
});
```

#### Composed Component
```js
const UserDashboard = createComponent(({ lens }) => {
  // Reuse existing optics
  const user = lens.useOptic(useUserData);
  const posts = lens.useOptic(useUserPosts);
  
  return (
    <div>
      <Profile user={user}/>
      <PostList posts={posts}/>
    </div>
  );
});
```

### Common Pitfalls

Here's what to watch out for when building components:
**Avoid these mistakes:**

1. **Creating refractions outside lens**  
Refractions need the component's lens to properly connect to Refract's reactive system:
```js
   // ❌ Wrong - won't be reactive
   createComponent(() => {
     const bad = useRefraction(0); // Missing lens!
   });

   // ✅ Correct - use lens
   createComponent(({ lens }) => {
     const good = lens.useRefraction(0);
   });
   ```
:::warning
Always use `lens.useRefraction()` inside components - standalone `useRefraction()` calls won't be properly connected to your component's reactivity system.
:::

2. **Forgetting lens for effects**  
Regular `useEffect` won't auto-cleanup with component unmounts:
```js
   // ❌ Wrong - may cause memory leaks
   createComponent(({ lens }) => {
     useEffect(() => {}); // Not using lens
   });

   // ✅ Correct - proper cleanup
   createComponent(({ lens }) => {
     lens.useEffect(() => {});
   });
   ```
:::tip
Always use `lens.useEffect()` instead of React's `useEffect` to ensure proper cleanup when components unmount.
:::
3. **Performance Tip:**  
For expensive computations (like filtering large lists), use `lens.useMemo` to avoid recalculating on every render:
```js
const filtered = lens.useMemo(() => 
  bigList.filter(item => item.active), // Expensive operation
  [bigList] // Only recompute when bigList changes
);
```
:::warning
For operations on large datasets, always memoize with `lens.useMemo` to avoid expensive recalculations on every render.
:::

This works like React's `useMemo` but integrates with Refract's reactivity system.

### Real-World Patterns

#### Form Handling
Here's how to build a responsive form with validation:
```js
const SignupForm = createComponent(({ lens }) => {
  // 1. Store form state in a refraction
  const form = lens.useRefraction({
    email: '',
    password: ''
  });

  // 2. Derived validation state
  const isValid = lens.useMemo(() => (
    form.value.email.includes('@') && // Basic email check
    form.value.password.length > 8    // Minimum length
  ), [form]);

  return (
    <form>
      <input 
        value={form.value.email}
        onChange={(e) => form.update(f => ({ ...f, email: e.target.value }))}
      />
      <input
        type="password"
        value={form.value.password}
        onChange={(e) => form.update(f => ({ ...f, password: e.target.value }))}
      />
      <button disabled={!isValid}>Submit</button>
    </form>
  );
});
```
Key features:
- Single source of truth for form state
- Automatic re-renders as user types
- Memoized validation for performance

#### Global State Integration
Connect to app-wide state using optics:
```js
const ThemeToggle = createComponent(({ lens }) => {
  // 1. Access global theme optic
  const theme = lens.useOptic(useTheme);
  
  return (
    // 2. Toggle between themes
    <button onClick={() => theme.toggle()}>
      Current: {theme.value}
    </button>
  );
});
```