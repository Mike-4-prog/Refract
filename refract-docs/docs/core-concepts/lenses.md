---
id: lenses
title: Lenses
slug: /core-concepts/lenses
---

In **Refract**, a **lens** is a tool for focusing on a *specific part* of a larger state, letting you read and update that slice without touching unrelated data.

If a **refraction** is like giving someone a telescope to view the whole sky, a **lens** is the dial you turn to zoom in on one particular constellation.

### The Need For Lenses

Imagine your app state is a big object:

```js
const appState = {
  user: { name: "Alex", email: "alex@example.com" },
  settings: { theme: "dark", language: "en" },
  notifications: []
};
```
Without lenses, changing `settings.theme` would require:
- Extracting the full state

- Updating the value

- Writing it back without accidentally touching other parts

Lenses solve this by allowing you to:

- Observe only the data you care about

- Update just that slice, leaving the rest untouched

- Keep your components smaller and more focused
### Creating a Lens
You can create a lens from any existing refraction:
```jsx
import { createRefraction, createLens } from 'refract';

const appState = createRefraction({
  user: { name: "Alex", email: "alex@example.com" },
  settings: { theme: "dark", language: "en" }
});

// Focus only on theme
const themeLens = createLens(appState, state => state.settings.theme);
```
`themeLens` now behaves like its own refraction — but it’s bound to `appState.settings.theme`.
### Reading and Updating Through a Lens
Using `useRefraction` with a lens is just like using a refraction:
```jsx
import { useRefraction } from 'refract';

function ThemeSwitcher() {
  const theme = useRefraction(themeLens);

  return (
    <div>
      <p>Current theme: {theme}</p>
      <button onClick={() => themeLens.set("light")}>Switch to Light</button>
      <button onClick={() => themeLens.set("dark")}>Switch to Dark</button>
    </div>
  );
}
```
:::tip
 Updating via a lens automatically updates the parent refraction — and any other lenses linked to it.
:::
### Nested Lenses
You can create lenses from other lenses to drill deeper:
```jsx
const userLens = createLens(appState, state => state.user);
const nameLens = createLens(userLens, user => user.name);
```
`nameLens` only cares about `appState.user.name`, keeping re-renders minimal.
### Derived Lenses
A derived lens applies a transformation when reading/writing:
```jsx
import { deriveLens } from 'refract';

const uppercaseThemeLens = deriveLens(themeLens, theme => theme.toUpperCase());
```
Here, `uppercaseThemeLens` always returns the theme in uppercase when read.
:::warning
For very small, simple state objects (especially if they’re not shared), lenses might be overkill. Using a plain refraction can be simpler.
:::

