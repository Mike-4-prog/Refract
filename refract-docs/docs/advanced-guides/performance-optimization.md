---
id: performance-optimization
title: Performance Optimization
sidebar_label: Performance Optimization
description: Learn practical techniques to make your Refract apps faster, smoother, and more efficient.
---

Building apps with Refract is already lightweight and reactive by design. But as your app grows, you may start noticing little slowdowns — maybe components re-render too often, effects pile up, or your state updates feel sluggish.

This guide walks you through simple yet powerful strategies to **optimize performance** in your Refract apps without overcomplicating your code.

### Why Optimization Matters

Refract's reactivity model is fast, but performance bottlenecks usually come from how we **structure optics**, **manage state**, and **compose components**. Think of optimization not as "squeezing every millisecond" but as **keeping the app smooth while staying readable**.

### Prerequisites

- Experience with [optical patterns](/docs/tutorials/mouse-tracker-with-optics)
- Understanding of [composition patterns](/docs/advanced-guides/optical-composition-patterns)
- Basic knowledge of [browser dev tools](https://developer.chrome.com/docs/devtools/)

### The Performance Mindset

Before we dive into code, remember: **the fastest computation is the one that never happens**. Optimization is about doing less work, not doing the same work faster.

:::tip The 80/20 Rule
80% of performance gains come from optimizing 20% of your code. Learn to identify that critical 20%!
:::

### Step 1: Measuring Performance

You can't optimize what you can't measure. Proper performance monitoring helps you identify bottlenecks before they become problems.

#### Performance Monitoring Utility

```jsx
// utils/performance.js
export const withPerf = (name, fn) => {
  return (...args) => {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    
    if (end - start > 16) { // Longer than 60fps frame
      console.warn(`⏱️ ${name} took ${(end - start).toFixed(2)}ms`);
    }
    
    return result;
  };
};

// Usage in optics
const expensiveOptic = useOptic(withPerf('expensive-calculation', () => {
  return heavyComputation(input.value);
}), [input]);
```

#### Browser DevTools Mastery

Modern browsers provide incredible tools for performance analysis:

- **Performance Tab**: Record and analyze runtime performance across JavaScript execution, rendering, and painting
- **Memory Tab**: Identify memory leaks and optimize memory usage with heap snapshots
- **Rendering Tab**: Visualize paint flashes, FPS metrics, and layout thrashing in real-time  
- **Coverage Tab**: Find unused JavaScript and CSS to reduce bundle size

:::tip
Use Chrome's "Performance" tab to record user interactions and identify long tasks blocking the main thread. Look for red flags like long yellow (JavaScript) or purple (rendering) bars.
:::

### Step 2: Optical Computation Optimization

#### Memoization Patterns

```jsx
const useOptimizedData = (input) => {
  const [cache, setCache] = useRefraction(new Map());
  
  const result = useOptic(() => {
    const cached = cache.value.get(input.value);
    if (cached) return cached;
    
    const computed = expensiveCalculation(input.value);
    setCache(new Map(cache.value).set(input.value, computed));
    return computed;
  }, [input, cache]);
  
  return result;
};
```

**Cache Invalidation Note**: Memoization is powerful, but incorrect cache invalidation can cause subtle bugs. Always test edge cases and consider time-based expiration, size limits, and manual invalidation triggers.

#### Lazy Evaluation

```jsx
const useLazyOptic = (source, shouldCompute) => {
  const result = useOptic(() => {
    if (!shouldCompute.value) return null;
    return transform(source.value);
  }, [source, shouldCompute]);
  
  return result;
};
```

**When to Use Lazy Evaluation**: Perfect for optional UI sections, heavy computations that aren't always needed, data transformations in specific states, and deferrable background calculations.

### Step 3: Update Optimization

#### Batching Updates

```jsx
const useBatchedUpdates = () => {
  const [batch, setBatch] = useRefraction([]);
  const batchTimeout = useRef(null);
  
  const addToBatch = (item) => {
    setBatch([...batch.value, item]);
    
    if (!batchTimeout.current) {
      batchTimeout.current = setTimeout(() => {
        processBatch(batch.value);
        setBatch([]);
        batchTimeout.current = null;
      }, 50); // Batch every 50ms
    }
  };
  
  return addToBatch;
};
```

**Batch Timing Considerations**: 
- **50ms**: Good balance for user interactions
- **16ms**: For animation-critical updates (60fps)  
- **100ms+**: For non-visible background processing
- **0ms**: Use `requestAnimationFrame` for visual updates

#### Debounced Optics

```jsx
const useDebouncedOptic = (source, delay) => {
  const [debounced, setDebounced] = useRefraction(source.value);
  let timeout;
  
  useFlash(() => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setDebounced(source.value);
    }, delay);
    
    return () => clearTimeout(timeout);
  }, [source, delay]);
  
  return debounced;
};
```

**Debouncing vs Throttling**: Debouncing waits for activity to stop before updating (good for search inputs), while throttling updates at regular intervals (good for scroll/resize events).

### Step 4: Memory Management

#### Avoiding Memory Leaks

```jsx
const useCleanup = () => {
  const subscriptions = useRef(new Set());
  
  useFlash(() => {
    const sub = dataSource.subscribe(handleData);
    subscriptions.current.add(sub);
    
    return () => {
      subscriptions.current.forEach(sub => sub.unsubscribe());
      subscriptions.current.clear();
    };
  }, []);
};
```

**Common Memory Leak Sources**: Event listeners not removed, timers not cleared, WebSocket connections left open, DOM references retained after removal, and large data caches never purged.

#### Large List Optimization

```jsx
const useVirtualizedList = (items, itemHeight, containerRef) => {
  const [scrollTop, setScrollTop] = useRefraction(0);
  
  const visibleItems = useOptic(() => {
    const containerHeight = containerRef.current?.clientHeight || 0;
    const startIndex = Math.floor(scrollTop.value / itemHeight);
    const endIndex = Math.ceil((scrollTop.value + containerHeight) / itemHeight);
    
    return items.value.slice(startIndex, endIndex).map((item, index) => ({
      ...item,
      top: (startIndex + index) * itemHeight,
      index: startIndex + index
    }));
  }, [items, scrollTop]);
  
  return { visibleItems, setScrollTop };
};
```

**Virtualization Benefits**: DOM efficiency (only render visible items), memory savings, smooth scrolling, and fast initial load with render time proportional to viewport size.

### Step 5: Rendering Optimization

#### Conditional Rendering Patterns

```jsx
const useSmartRenderer = (shouldRender) => {
  const [isVisible, setIsVisible] = useRefraction(false);
  
  useFlash(() => {
    if (shouldRender.value && !isVisible.value) {
      setIsVisible(true);
    } else if (!shouldRender.value && isVisible.value) {
      const timeout = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timeout);
    }
  }, [shouldRender, isVisible]);
  
  return isVisible;
};
```

**Render Optimization Strategies**: Lazy loading, visibility toggling, keepalive pools, and portal usage for heavy UI.

#### CSS vs JS Animations

```jsx
// ✅ Good: CSS transitions (GPU accelerated)
const smoothOptic = useOptic(() => ({
  transform: `translateX(${position.value.x}px)`,
  transition: position.value.moving ? 'transform 0.1s ease' : 'none'
}), [position]);

// ❌ Avoid: JS-driven animations (main thread blocking)
const jankyOptic = useOptic(() => {
  element.style.transform = `translateX(${position.value.x}px)`;
  return position.value;
}, [position]);
```

**Why CSS Animations Win**: GPU acceleration, built-in browser optimizations, smoother performance, and lower memory usage.

### Real-World Optimization Scenario

```jsx
const useOptimizedDashboard = () => {
  const rawData = useLiveDataStream();
  const [visibleMetrics, setVisibleMetrics] = useRefraction(['sales', 'users']);
  
  const debouncedData = useDebouncedOptic(rawData, 100);
  const computedMetrics = useMemoizedOptic(() => {
    return visibleMetrics.value.map(metric => ({
      name: metric,
      value: calculateMetric(debouncedData.value, metric),
      trend: calculateTrend(debouncedData.value, metric)
    }));
  }, [debouncedData, visibleMetrics]);
  
  const { visibleItems } = useVirtualizedList(computedMetrics, 50, chartContainerRef);
  return { metrics: visibleItems, setVisibleMetrics };
};
```

This approach demonstrates how combining multiple optimization techniques can transform a potentially janky dashboard into a smooth, responsive experience.

### Common Performance Pitfalls

#### Over-Optimization

```jsx
// ❌ Don't over-optimize simple cases
const [count, setCount] = useRefraction(0);
const optimizedCount = useMemoizedOptic(() => count.value, [count]);

// ✅ Simple refractions are already optimized
const [count, setCount] = useRefraction(0);
```

**Optimization Tradeoffs**: Every optimization adds complexity. Only optimize when you've measured an actual problem, the benefit justifies the cost, and users will notice the improvement.

#### Incorrect Dependency Arrays

```jsx
// ❌ Missing dependencies cause stale data
const brokenOptic = useOptic(() => a.value + b.value, [a]);

// ✅ Always include all used refractions
const workingOptic = useOptic(() => a.value + b.value, [a, b]);
```

**Dependency Management**: Use ESLint rules to catch missing dependencies, keep optics focused, and extract complex logic into separate optics.

#### Large Optical Trees

```jsx
// ❌ Deeply nested optics are hard to optimize
const megaOptic = useOptic(() => ({
  user: { profile: { preferences: { ui: {}, data: {} } } }
}), [/* many dependencies */]);

// ✅ Flatten for better performance
const userOptic = useOptic(() => user.value, [user]);
const prefsOptic = useOptic(() => user.value.preferences, [user]);
```

**Flat Structure Benefits**: Faster updates, better debugging, reusable logic, and improved tree shaking.

### Advanced Optimization Techniques

#### Web Workers for Heavy Computation

```jsx
const useWorkerOptic = (input) => {
  const [result, setResult] = useRefraction(null);
  const workerRef = useRef();
  
  useFlash(() => {
    workerRef.current = new Worker('./heavy-worker.js');
    workerRef.current.onmessage = (e) => setResult(e.data);
    return () => workerRef.current.terminate();
  }, []);
  
  useFlash(() => {
    workerRef.current?.postMessage(input.value);
  }, [input]);
  
  return result;
};
```

**Worker Benefits**: Main thread freedom, parallel processing, isolated environment, and dedicated optimization.

#### RequestAnimationFrame Integration

```jsx
const useAnimationOptic = (source) => {
  const [animated, setAnimated] = useRefraction(source.value);
  const frameRef = useRef();
  
  useFlash(() => {
    const animate = () => {
      setAnimated(prev => lerp(prev, source.value, 0.1));
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(frameRef.current);
  }, [source]);
  
  return animated;
};
```

**RAF Advantages**: Perfect timing with browser repaint cycle, auto throttling, smooth animations, and battery friendliness.

### Monitoring Production Performance

```jsx
// utils/monitoring.js
export const trackPerf = (metricName, duration) => {
  if (duration > 100) {
    analytics.track('slow_performance', { metricName, duration });
  }
};

const monitoredOptic = useOptic(() => {
  const start = performance.now();
  const result = expensiveWork();
  trackPerf('expensive_work', performance.now() - start);
  return result;
}, [dependencies]);
```

**Production Monitoring Considerations**: Implement sampling to avoid network spam, anonymize sensitive data, set meaningful thresholds, and correlate performance data with user actions.

### Tools of the Trade

Essential performance tools every Refract developer should master:

- **Chrome DevTools**: Comprehensive runtime profiling and debugging
- **Lighthouse**: Automated audits for performance and best practices
- **WebPageTest**: Real-world testing from multiple locations
- **BundlePhobia**: Bundle size analysis for npm packages
- **React DevTools**: Component rendering profiling

:::success Continuous Performance Culture
Performance optimization isn't a one-time task - it's an ongoing practice. Integrate performance monitoring into your workflow and make performance a first-class requirement.
:::
