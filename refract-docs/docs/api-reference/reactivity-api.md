---
title: Reactivity API
slug: /api-reference/reactivity-api
---

Refract's reactivity system is what makes your UI come alive. It automatically keeps your components in sync with your state, without the need for manual updates or complex dependency tracking. Think of it like magic glasses - when the data changes, your UI automatically adjusts to show the new reality.

### Meet the Players

#### `useRefraction()` - Your Reactive State Container

The bread and butter of Refract's reactivity. It creates a piece of state that automatically updates any components using it when changed.

```js
import { useRefraction } from 'refract';

function Counter() {
  const count = useRefraction(0);
  
  return (
    <button onClick={() => count.set(count.value + 1)}>
      Clicks: {count.value}
    </button>
  );
}
```

:::tip
Refractions work great for local component state. For shared state across components, consider using [optics](http://localhost:3000/docs/core-concepts/optics).
:::

Key features:
- Automatic dependency tracking
- Simple API (`value` and `set`)
- Works seamlessly with JSX

#### `useOptic()` - Reusable Reactive Logic

Optics let you package up reactive logic into reusable pieces. They're like supercharged hooks that automatically track their dependencies.

```js
import { useOptic } from 'refract';

function useWindowSize() {
  const size = useRefraction({ width: 0, height: 0 });
  
  useOptic(() => {
    const handler = () => size.set({
      width: window.innerWidth,
      height: window.innerHeight
    });
    
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return size;
}
```

:::warning
Always return a cleanup function from your optics to prevent memory leaks. Refract will automatically call it when needed.
:::

### How They Work Together

Refractions and optics form a powerful duo:
- **Refractions** store the state
- **Optics** manage how that state changes and reacts

Here's how they might work together in a real app:

```js
function UserProfile() {
  // Get reactive user data
  const user = useOptic(useUserData);
  
  // Local UI state
  const isEditing = useRefraction(false);

  return (
    <div>
      {isEditing.value ? (
        <EditForm user={user} />
      ) : (
        <ProfileDisplay user={user} />
      )}
      <button onClick={() => isEditing.set(!isEditing.value)}>
        {isEditing.value ? 'Cancel' : 'Edit'}
      </button>
    </div>
  );
}
```

### Common Patterns

#### 1. Derived State

Create computed values that automatically update:

```js
const fullName = useMemo(() => 
  `${user.value.firstName} ${user.value.lastName}`,
  [user]
);
```

#### 2. Async Operations

Handle asynchronous data with built-in cleanup:

```js
useOptic(async () => {
  const data = await fetch('/api/data');
  if (!isCancelled) {
    state.set(data);
  }
}, []);
```

:::important
Always handle cancellation in async optics to prevent "set state after unmount" errors.
:::

#### 3. State Transformation

Create lenses to focus on specific data:

```js
const emailLens = createLens(user, u => u.email);
```

### Performance Considerations

While Refract's reactivity is highly optimized, here are some tips to keep things fast:

1. **Memoize expensive computations**
   ```js
   const filteredList = useMemo(
     () => bigList.filter(expensiveFilter),
     [bigList]
   );
   ```

2. **Batch updates** when possible
   ```js
   batch(() => {
     user.set(newUser);
     profile.set(newProfile);
   });
   ```

3. **Use traversals** for bulk collection updates

### Troubleshooting

**My component isn't updating!**
- Verify you're using `useRefraction` or `useOptic`
- Check that you're using `.set()` to update values
- Ensure you haven't nested refractions unnecessarily

**Memory leaks occurring**
- All optics should return cleanup functions
- Cancel async operations on unmount
- Review our [side effects guide](http://localhost:3000/docs/advanced-guides/side-effects-management)

With these reactivity tools at your disposal, you're equipped to build dynamic, responsive interfaces that automatically stay in sync with your application state. The key is to start simple with `useRefraction` for local state, then graduate to `useOptic` as you need to share reactive logic across components. Remember - the more you leverage Refract's automatic dependency tracking, the less manual state management you'll need to handle.

For more advanced patterns and optimizations, explore how these reactivity primitives work with [optical composition patterns](http://localhost:3000/docs/advanced-guides/optical-composition-patterns) and [performance optimization techniques](/advanced-guides/performance-optimization)(link needed).