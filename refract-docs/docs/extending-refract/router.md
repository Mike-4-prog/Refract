---
id: router
title: Routing in Refract
description: Learn how to integrate client-side routing into your Refract applications, customize navigation flows, and extend with plugins.
sidebar_position: 3
---

Welcome to the router guide! If you're building a single-page application with multiple views, you'll need a way to manage navigation. While you could handle this with simple state, a dedicated router provides a more robust solution. Best of all, we can build one that feels completely natural in the Refract ecosystem.

### Why a Custom Router?

You might be wondering: "Why build my own router when there are existing solutions?" Great question! While you could wrap an existing router, building your own allows for:

- **Perfect integration** with Refract's reactivity system
- **Simplified API** tailored to your specific needs
- **No external dependencies** beyond Refract itself
- **Complete understanding** of how routing works in your app

 **Think of it this way**:A custom router is like building a custom piece of furniture instead of buying something pre-made. It fits your space perfectly and does exactly what you need.

### The Reactive Routing Concept

At its core, a router needs to do two things:
1. Track the current URL and parse it into useful information
2. Update the UI when the URL changes

In Refract, we can model both of these as reactive state. The current route becomes a **refraction** that components can observe and react to. If you need a reminder about how refractions work, check out the **[Core Concepts: Refractions](/core-concepts/refractions.md)** guide.

### Planning Our Router API

Before we start coding, let's think about what we want our router to do:

```javascript
// How we want to use it
const router = createRouter({
  routes: [
    { path: '/', component: HomePage },
    { path: '/about', component: AboutPage },
    { path: '/users/:id', component: UserProfile }
  ]
})

// In our main app
app.use(router)

// In components - reactive to route changes!
const currentRoute = useRoute()
```
### Building the Router Step by Step
Let's build our router piece by piece. We'll create this as a plugin, so if you haven't read about [Creating Plugins](http://localhost:3000/docs/extending-refract/plugins) yet, you might want to glance at that first.
#### Step 1: The Basic Plugin Structure
We'll start with the plugin structure we learned about in the plugins guide:
```js
function createRouter(routes) {
  const router = {
    // Our router methods and properties will go here
  }
  
  return {
    install(app) {
      // Make router available to the whole app
      app.provide('router', router)
      app.config.globalProperties.$router = router
    }
  }
}
```
#### Step 2: Tracking the Current Route
The heart of our router is reactive state that tracks the current URL:
```js
function createRouter(routes) {
  // Create reactive state for current route
  const currentRoute = refract({
    path: window.location.pathname,
    params: {},
    query: {}
  })
  
  // Function to parse the current URL
  function parseRoute(path) {
    // Match against our defined routes
    for (const route of routes) {
      const matches = path.match(pathToRegex(route.path))
      if (matches) {
        return {
          path,
          params: matches.groups || {},
          component: route.component
        }
      }
    }
    
    // Return a not found route if no match
    return {
      path,
      params: {},
      component: NotFoundComponent
    }
  }
  
  // Update currentRoute when URL changes
  function updateRoute() {
    currentRoute.value = parseRoute(window.location.pathname)
  }
  
  // Listen to browser navigation events
  window.addEventListener('popstate', updateRoute)
  
  const router = {
    currentRoute,
    // More methods to come...
  }
  
  // Initialize with current URL
  updateRoute()
  
  return {
    install(app) {
      app.provide('router', router)
      app.config.globalProperties.$router = router
      
      // Also provide the current route directly
      app.provide('currentRoute', currentRoute)
    }
  }
}
```
:::important
The `pathToRegex` function is a simplified version of what you'd implement in a real router. In production, you'd want more robust path matching.
:::
#### Step 3: Adding Navigation Methods
Now let's add methods to programmatically navigate:
```js
const router = {
  currentRoute,
  
  push(path) {
    window.history.pushState({}, '', path)
    this.updateRoute()
  },
  
  replace(path) {
    window.history.replaceState({}, '', path)
    this.updateRoute()
  },
  
  go(n) {
    window.history.go(n)
  },
  
  back() {
    window.history.back()
  },
  
  forward() {
    window.history.forward()
  },
  
  updateRoute // Make available internally
}
```
#### Step 4: Creating a Route Component
Let's create a component that renders the current route:
```js
// router-view.js
export default {
  setup() {
    const currentRoute = inject('currentRoute')
    
    return () => {
      const Component = currentRoute.value.component || DefaultComponent
      return h(Component)
    }
  }
}
```
If you're not familiar with the `h` function or component rendering, check out the [Component Creation](http://localhost:3000/docs/api-reference/create-component) guide.
#### Step 5: Creating a Composition Function
Let's make a convenient composition function for components:
```js
// useRoute.js
export function useRoute() {
  const route = inject('currentRoute')
  const router = inject('router')
  
  return {
    route,
    router,
    push: router.push,
    replace: router.replace
  }
}
```
Now in any component, we can do:
```js
import { useRoute } from './useRoute'

export default {
  setup() {
    const { route, push } = useRoute()
    
    // route is reactive - component will update when it changes!
    const userId = computed(() => route.value.params.id)
    
    const navigateToAbout = () => push('/about')
    
    return { userId, navigateToAbout }
  }
}
```
### Advanced Router Features
Once you have the basic router working, you might want to add:
#### Route Guards
Protect routes with authentication checks:
```js
function createRouter(routes) {
  // ... existing code ...
  
  const guards = []
  
  function addGuard(guard) {
    guards.push(guard)
  }
  
  async function navigate(path) {
    const to = parseRoute(path)
    
    // Run all guards
    for (const guard of guards) {
      const result = await guard(to, currentRoute.value)
      if (result === false || typeof result === 'string') {
        // Guard blocked navigation or redirected
        return result === false ? false : navigate(result)
      }
    }
    
    // All guards passed - proceed with navigation
    window.history.pushState({}, '', path)
    updateRoute()
    return true
  }
  
  // Update router methods to use navigate
  const router = {
    // ... other methods ...
    push: navigate,
    addGuard
  }
}
```
#### Scroll Behavior
Manage scroll position during navigation:
```js
function createRouter(routes) {
  // ... existing code ...
  
  let scrollPositions = new Map()
  
  window.addEventListener('popstate', () => {
    updateRoute()
    restoreScrollPosition()
  })
  
  function saveScrollPosition() {
    scrollPositions.set(currentRoute.value.path, {
      x: window.scrollX,
      y: window.scrollY
    })
  }
  
  function restoreScrollPosition() {
    const position = scrollPositions.get(currentRoute.value.path)
    if (position) {
      window.scrollTo(position.x, position.y)
    } else {
      window.scrollTo(0, 0)
    }
  }
  
  // Add event listener to save position before navigation
  window.addEventListener('beforeunload', saveScrollPosition)
}
```
### Testing Your Router
Like any important piece of infrastructure, you should test your router:
```js
// router.test.js
import { createApp } from 'refract'
import { createRouter } from './router'

test('navigates between routes', async () => {
  const Home = { template: '<div>Home</div>' }
  const About = { template: '<div>About</div>' }
  
  const router = createRouter([
    { path: '/', component: Home },
    { path: '/about', component: About }
  ])
  
  const app = createApp()
  app.use(router)
  
  // Test initial route
  expect(router.currentRoute.value.path).toBe('/')
  
  // Test navigation
  router.push('/about')
  expect(router.currentRoute.value.path).toBe('/about')
  expect(router.currentRoute.value.component).toBe(About)
})
```
### Integration with Your App
Here's how to use your finished router:
```js
// main.js
import { createApp } from 'refract'
import { createRouter } from './router'
import App from './App.vue'
import Home from './components/Home.vue'
import About from './components/About.vue'

const router = createRouter([
  { path: '/', component: Home },
  { path: '/about', component: About }
])

const app = createApp(App)
app.use(router)
app.mount('#app')
```
```js
// App.vue
import RouterView from './router-view.vue'

export default {
  setup() {
    return () => h('div', [
      h('nav', [/* navigation links */]),
      h(RouterView)
    ])
  }
}
```
### Performance Considerations
As your app grows, consider these optimizations:

- `Lazy loading`: Load components only when needed for a route

- `Route preloading`: Prefetch components for likely next routes

- `Scroll restoration`: Efficiently manage scroll positions

- `Route matching optimization`: Use efficient algorithms for matching routes

Congratulations! You've built a fully functional router for Refract. Remember, the best part of building your own router is that you can customize it exactly for your application's needs. Keep up the routing!