---
id: optics
title: Optics
slug: /core-concepts/optics
---
### Optics: State Transformation Toolkit

In Refract, **optics** are reusable “views” into your application state.  
They’re like *state transformers* — a way to **focus, transform, and reuse** data without duplicating logic.

If a **refraction** is the *entire lens of a camera* and a **lens** is a zoom ring that focuses on one subject, **optics** are the full toolkit: zoom lenses, filters, prisms, and adapters that let you see the state in exactly the way you need.

### Why Optics Exist

UI state isn’t always flat — it’s often **nested, conditional, or needs transformation** before it’s useful to a component.

Without optics:

- You’d have to repeat mapping, filtering, or lookup logic across components.
- Every component that needs a transformed version of state would manage it independently.
- Updating derived state would mean re-implementing logic in multiple places.

With optics:

- You **define the transformation once**.
- Any component can subscribe to it.
- Updates flow both ways when the optic supports writing (e.g., lenses).

### The Building Blocks

In Refract, optics come in different forms depending on how they interact with state:

| Optic Type       | Purpose                                     | Read? | Write? |
|------------------|---------------------------------------------|-------|--------|
| **Lens**         | Focus on a specific subset of state         | ✅    | ✅     |
| **Prism**        | Focus on a part of state that may not exist | ✅    | ✅     |
| **Fold**         | Read multiple parts of state at once        | ✅    | ❌     |
| **Traversal**    | Apply the same transformation to many items | ✅    | ✅     |

 **Analogy:**  
- *Lens*: Zoom into one thing.  
- *Prism*: Zoom into something that might be missing.  
- *Fold*: Gather multiple pieces together.  
- *Traversal*: Apply a change everywhere.

### Creating an Optic

```js
import { createRefraction, createLens, createPrism } from 'refract';

const appState = createRefraction({
  user: { name: "Alex", email: "alex@example.com" },
  notifications: []
});

// Lens for user name
const nameLens = createLens(appState, state => state.user.name);

// Prism for first notification (if it exists)
const firstNotificationPrism = createPrism(
  appState,
  state => state.notifications[0] ?? null,
  (state, newFirst) => {
    if (newFirst) state.notifications[0] = newFirst;
  }
);
```
### Using Optics in Components
#### 1. Basic Lens
Once you’ve defined an optic — whether it’s a lens, prism, or another type — you can treat it just like a refraction inside your components:
```js
const userLens = createLens(appState, s => s.user);
// Can read AND write to user object
```
#### 2. Safe Prism
```js
const errorPrism = createPrism(
  appState, 
  s => s.apiResponse?.error ?? null,
  (s, newError) => { /* safe write */ }
);
```
#### 3. Composed Optics
```js
// Combine lenses to create new views
const emailDomain = createLens(
  userLens, 
  user => user.email.split('@')[1]
);
```
### Real-World Patterns
Pattern 1: Form Validation:
```js
const formLens = createLens(appState, s => s.form);
const emailValid = createLens(formLens, form => 
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
);

// Usage:
function EmailField() {
  const isValid = useRefraction(emailValid);
  return <input className={isValid ? 'valid' : 'invalid'} />;
}
```
Pattern 2: API Response Normalization:
```js
const usersTraversal = createTraversal(
  apiState,
  s => s.users,
  (users, updateFn) => users.map(updateFn)
);
```

This means:

- Reading from it gives you only the focused or transformed slice of state the optic was designed to      expose.

- Writing to it (if the optic supports writing) updates the source state, automatically triggering any other components or optics that depend on it.

The power of optics here is decoupling state structure from component logic.
Your component doesn’t need to know where in the giant application state the data lives or how to extract it — it just subscribes to the optic.
### Composing Optics
Optics are **composable** — you can create a new optic from another:
```jsx
const domainLens = createLens(appState, s => s.user.email.split('@')[1]);
```
This lets you **build** **small**, **focused optics** and chain them together to express complex state transformations.
:::warning
Avoid optics when:

- State is already flat and simple.

- Transformation logic is truly unique to a single component.
:::


