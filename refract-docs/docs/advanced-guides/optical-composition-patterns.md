---
id: optical-composition-patterns
title: Optical Composition Patterns
slug: /advanced-guides/optical-composition-patterns
---
### The Art of Optical Composition
So far, you’ve learned the basics of [Optics](../core-concepts/optics.md)—our way of packaging reusable logic and reactive behaviors.  But once your app grows beyond a few components, you’ll quickly find out that **composing optics together** is where the real magic happens.

If you've been using optics as solo instruments - like our [mouse tracker](/docs/tutorials/mouse-tracker-with-optics) or [theme switcher](/docs/tutorials/global-theme-switcher) - get ready to conduct an entire orchestra. Optical composition is where individual optics combine to create something greater than the sum of their parts.


Think of this as *Lego for app logic*: small blocks (optics) that can be combined into bigger, more powerful structures. 
### Why Not Just Reuse? Why Compose?
When you start building features like authentication, theme switching, or live counters, you’ll notice patterns repeating themselves.  Rather than duplicating code, optics let you **reuse, extend, and compose** logic in clean ways:

- **Reusability**: One optic can be shared across multiple components.  
- **Isolation**: Each optic handles its own slice of state/effects.  
- **Scalability**: Large features become easier to manage by stitching smaller optics. 

 If you’re not familiar with optics yet, check out the [Optics introduction](../core-concepts/optics.md) first.

### A Simple Example: Counter + Theme Toggle

Let’s start small. Imagine you already have:

- A **Counter Optic** for incrementing numbers.  
- A **Theme Optic** for switching between light/dark mode.  

On their own, they look like this:

```js
// counterOptic.js
import { createOptic, useRefraction } from '@refract-framework/core';

export const counterOptic = createOptic(() => {
  const [count, setCount] = useRefraction(0);

  return {
    count,
    increment: () => setCount(c => c + 1),
    reset: () => setCount(0),
  };
});
```
```js
// themeOptic.js
import { createOptic, useRefraction } from '@refract-framework/core';

export const themeOptic = createOptic(() => {
  const [theme, setTheme] = useRefraction('light');

  return {
    theme,
    toggle: () => setTheme(t => (t === 'light' ? 'dark' : 'light')),
  };
});
```
### Composing Them Together
Here’s where composition shines:
Instead of wiring both optics separately inside every component, we can compose them into one higher-order optic:
```js
// appOptic.js
import { createOptic, composeOptics } from '@refract-framework/core';
import { counterOptic } from './counterOptic';
import { themeOptic } from './themeOptic';

export const appOptic = composeOptics({
  counter: counterOptic,
  theme: themeOptic,
});
```
Now, inside a component, you can access both in one shot:
```js
import { createComponent } from '@refract-framework/core';
import { appOptic } from './appOptic';

const Dashboard = createComponent(() => {
  const { counter, theme } = appOptic.use();

  return (
    <div>
      <h2>Count: {counter.count}</h2>
      <button onClick={counter.increment}>+1</button>
      <button onClick={counter.reset}>Reset</button>

      <h3>Theme: {theme.theme}</h3>
      <button onClick={theme.toggle}>Toggle Theme</button>
    </div>
  );
});
```
Boom! You just stitched together two optics into one clean dashboard.
 ### Composition Patterns

Let’s explore some of the most common optical composition patterns you’ll use in real-world Refract apps.  
Each one starts simple but can be combined for incredibly sophisticated results.

#### Pattern 1: The Mapper - Transforming Optical Output

The simplest composition pattern transforms optical values as they flow through your system.

```jsx
const useEnhancedMouse = () => {
  const { position } = useMousePosition();
  
  // Transform raw coordinates into useful data
  const normalizedPosition = useOptic(() => ({
    x: Math.floor(position.value.x / window.innerWidth * 100),
    y: Math.floor(position.value.y / window.innerHeight * 100),
    isInViewport: position.value.x > 0 && position.value.y > 0
  }), [position]);

  return { position: normalizedPosition };
};
```

:::tip When to Use Mapping
- Converting raw values to percentages
- Adding derived properties
- Normalizing data across different units
- Creating boolean flags from complex conditions
:::

#### Pattern 2: The Combiner - Merging Multiple Optics

Combine multiple optics to create coordinated state that updates when any source changes.

```jsx
const useScrollTracker = () => {
  const { position: mousePos } = useMousePosition();
  const { position: scrollPos } = useScrollPosition();
  
  const combined = useOptic(() => ({
    mouse: mousePos.value,
    scroll: scrollPos.value,
    totalX: mousePos.value.x + scrollPos.value.x,
    totalY: mousePos.value.y + scrollPos.value.y,
    isScrolling: scrollPos.value.y > 0
  }), [mousePos, scrollPos]);

  return combined;
};
```
#### Pattern 3: The Filter - Conditional Optical Flow

Create optics that only update when specific conditions are met, reducing unnecessary re-renders.

```jsx
const useThrottledMouse = (delay = 100) => {
  const { position } = useMousePosition();
  const [lastUpdate, setLastUpdate] = useRefraction(Date.now());
  
  const throttled = useOptic(() => {
    const now = Date.now();
    if (now - lastUpdate.value > delay) {
      setLastUpdate(now);
      return position.value;
    }
    return null;
  }, [position, lastUpdate]);

  return { position: throttled };
};
```

:::warning Performance Considerations
Filtering patterns are crucial for high-frequency events like mouse movement or animation frames. Learn more in our [Performance Optimization guide](/docs/advanced-guides/performance-optimization).
:::

#### Pattern 4: The Coordinator - Multi-Optic Synchronization

Coordinate multiple optics that need to update together in specific sequences.

```jsx
const useAnimationSequence = () => {
  const [currentStep, setCurrentStep] = useRefraction(0);
  const [isPlaying, setIsPlaying] = useRefraction(false);
  
  const sequence = useOptic(() => ({
    step: currentStep.value,
    playing: isPlaying.value,
    progress: (currentStep.value / totalSteps) * 100,
    canPlay: currentStep.value < totalSteps,
    canReset: currentStep.value > 0
  }), [currentStep, isPlaying]);

  // Methods that coordinate multiple optics
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  return { ...sequence, play, pause, reset };
};
```
#### Pattern 5: The Deriver - Complex State Calculations

Create optics that perform complex calculations derived from multiple sources.

```jsx
const useGamePhysics = () => {
  const { position: playerPos } = usePlayerPosition();
  const { velocity } = usePlayerVelocity();
  const { gravity } = useWorldSettings();
  
  const physics = useOptic(() => {
    const newX = playerPos.value.x + velocity.value.x;
    const newY = playerPos.value.y + velocity.value.y + gravity.value;
    
    return {
      position: { x: newX, y: newY },
      speed: Math.sqrt(velocity.value.x ** 2 + velocity.value.y ** 2),
      isFalling: velocity.value.y > 0,
      isJumping: velocity.value.y < 0
    };
  }, [playerPos, velocity, gravity]);

  return physics;
};
```
### Real-World Example: Smart Parallax System

Let's build a complete parallax system using optical composition:

```jsx
const useParallaxLayers = (layers = []) => {
  const { position: mousePos } = useMousePosition();
  const { position: scrollPos } = useScrollPosition();
  
  const parallax = useOptic(() => {
    const baseX = mousePos.value.x / window.innerWidth;
    const baseY = (mousePos.value.y + scrollPos.value.y) / window.innerHeight;
    
    return layers.map((layer, index) => ({
      ...layer,
      transform: `translate3d(
        ${baseX * layer.depth * 50}px,
        ${baseY * layer.depth * 50}px,
        0
      )`,
      opacity: 1 - (scrollPos.value.y / 1000) * layer.depth,
      zIndex: layers.length - index
    }));
  }, [mousePos, scrollPos]);

  return { layers: parallax };
};
```

:::success Composition in Action
This single optic combines mouse position, scroll position, and layer configuration to create a smooth parallax effect that updates automatically from all inputs!
:::

### Advanced Pattern: Optical Middleware

Create reusable transformation patterns that can be applied to any optic.

```jsx
const withDebounce = (optic, delay) => {
  const [debouncedValue, setDebouncedValue] = useRefraction(optic.value);
  let timeout;
  
  useFlash(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDebouncedValue(optic.value);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [optic]);

  return debouncedValue;
};

// Usage
const { position } = useMousePosition();
const debouncedPosition = withDebounce(position, 200);
```
### Performance Optimization Patterns

#### Memoization for Expensive Calculations
```jsx
const useExpensiveCalculation = (inputOptic) => {
  const memoized = useOptic(() => {
    // Only recalculate when input actually changes
    return expensiveCalculation(inputOptic.value);
  }, [inputOptic]);
  
  return memoized;
};
```

#### Lazy Evaluation for Optional Optics
```jsx
const useOptionalData = (enabled) => {
  const sourceData = useDataSource();
  
  const optional = useOptic(() => {
    if (!enabled.value) return null;
    return transformData(sourceData.value);
  }, [enabled, sourceData]);
  
  return optional;
};
```

### Testing Composed Optics

```jsx
import { renderHook, act } from '@refract-framework/testing';

test('parallax layers update from mouse and scroll', () => {
  const { result } = renderHook(() => useParallaxLayers([{ depth: 0.5 }]));
  
  // Simulate mouse movement
  act(() => {
    mockMousePosition(100, 200);
  });
  
  // Simulate scrolling
  act(() => {
    mockScrollPosition(0, 300);
  });
  
  expect(result.current.layers.value[0].transform).toContain('50px');
});
```

### Common Composition Pitfalls

#### ❌ Over-Composition
```jsx
// Don't create optics for everything!
const [isOpen, setIsOpen] = useRefraction(false);
const [isVisible, setIsVisible] = useRefraction(false);
const [isActive, setIsActive] = useRefraction(false);

// ✅ Better: Combine related state
const uiState = useOptic(() => ({
  open: isOpen.value,
  visible: isVisible.value,
  active: isActive.value
}), [isOpen, isVisible, isActive]);
```

#### ❌ Circular Dependencies
```jsx
// This will cause infinite loops!
const opticA = useOptic(() => opticB.value * 2, [opticB]);
const opticB = useOptic(() => opticA.value / 2, [opticA]);
```

#### ❌ Over-Nesting
```jsx
// Hard to debug and maintain
const superOptic = useOptic(() => ({
  a: opticA.value,
  b: opticB.value,
  c: opticC.value,
  nested: {
    d: opticD.value,
    e: opticE.value,
    deeper: {
      f: opticF.value
    }
  }
}), [/* 6+ dependencies */]);
```

### Next Steps
Ready to master optical composition? Dive deeper with:

1. **[Performance Optimization](/docs/advanced-guides/performance-optimization)** - Optimize complex compositions
2. **[TypeScript Support](/docs/advanced-guides/typescript-support)** - Add type safety to compositions
3. **[Plugin Development](/docs/extending-refract/plugins)** - Create reusable composition patterns
4. **[Advanced Effects](/docs/advanced-guides/side-effects-management)** - Combine composition with side effects

### Join the Composition Revolution!

Share your amazing composition patterns with the community:

- [Share on GitHub Discussions](https://github.com/your-org/refract/discussions)
- [Submit composition patterns](/docs/contributing-guide)

Remember: Great composition isn't about complexity - it's about creating clear, maintainable relationships between your optics. Now go compose something beautiful! 🎼





