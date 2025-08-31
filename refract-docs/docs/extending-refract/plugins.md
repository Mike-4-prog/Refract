---
id: plugins
title: Plugins
slug: /extending-refract/plugins
description: Learn how to extend Refract's functionality by creating custom plugins that add reusable capabilities to your applications.
---

So, you want to create your own plugins for Refract? Excellent! Plugins are like superpowers for your Refract applications. They let you package up reusable functionality that can be easily shared across projects or with the community.

### What Exactly is a Plugin?

Think of a plugin as a software extension that adds specific capabilities to your Refract app. It's like installing a new app on your phone that gives it new features. A Refract plugin can:

- Add new methods to your app instance
- Provide global refractions (reactive state) that any component can use
- Register custom directives or components
- Set up global side effects or event listeners
- Wrap your components with providers or additional functionality

#### **Real World Example** 
Imagine creating a `persistence` plugin that automatically saves your app's state to local Storage and restores it when the app loads. Or an `analytics` plugin that tracks user interactions across your entire application. These are perfect use cases for plugins!

### Why Create a Plugin?

Before we dive into the how, let's talk about the why. Creating a plugin makes sense when:

1. **You have functionality used across multiple projects** - Instead of copying code, package it as a plugin
2. **You want to share solutions with the community** - Great plugins often become popular packages
3. **You need to integrate third-party libraries** - Wrap external libraries in a Refract-friendly interface
4. **You want to keep your main app code clean** - Plugins help separate concerns and keep your code organized

### The Anatomy of a Plugin

At its core, a plugin is just a function that receives your app instance and can perform operations on it. Here's what a basic plugin structure looks like:

```javascript
const myPlugin = (app, options) => {
  // 1. Add global properties or methods
  app.config.globalProperties.$myMethod = () => {
    // Your method logic
  }
  
  // 2. Provide global refractions
  const globalState = app.refract({ count: 0 })
  app.provide('globalState', globalState)
  
  // 3. Register custom components or directives
  app.component('MyComponent', {
    // Component definition
  })
  
  // 4. Set up other app enhancements
}
```
:::info
If you're not familiar with some of these concepts yet, you might want to review the [Core Concepts](http://localhost:3000/docs/core-concepts/refractions) first, particularly the sections on refractions and the reactivity system.
:::
### Creating Your First Plugin
Let's walk through creating a simple plugin step by step. We'll make a plugin that adds a simple notification system to our app.
#### Step 1: Define the Plugin Function
Start by creating a function that accepts the app instance and any options:
```js
function notificationsPlugin(app, options = {}) {
  const defaultConfig = {
    position: 'top-right',
    timeout: 3000,
    // ... other defaults
  }
  
  const config = { ...defaultConfig, ...options }
  
  // Plugin implementation goes here
}
```
#### Step 2: Add Functionality to Your App
Now let's add our notification system:
```js
function notificationsPlugin(app, options = {}) {
  // ... config setup from above
  
  // Create a reactive state for notifications
  const notifications = app.refract([])
  
  // Add method to show notifications
  app.config.globalProperties.$notify = (message, type = 'info') => {
    const id = Date.now()
    const notification = { id, message, type }
    
    notifications.value = [...notifications.value, notification]
    
    // Auto-remove after timeout
    setTimeout(() => {
      notifications.value = notifications.value.filter(n => n.id !== id)
    }, config.timeout)
  }
  
  // Provide notifications array so components can react to them
  app.provide('notifications', notifications)
}
```
#### Step 3: Use the Plugin in Your App
Now you can use your plugin in any Refract app:
```js
import { createApp } from 'refract'
import { notificationsPlugin } from './plugins/notifications'

const app = createApp()

// Use the plugin with optional configuration
app.use(notificationsPlugin, {
  position: 'bottom-left',
  timeout: 5000
})

app.mount('#app')
```
#### Step 4: Use the Plugin in Components
Any component can now use your notification system:
```js
// In a component
export default {
  setup() {
    // Access the notifications array if needed
    const notifications = inject('notifications')
    
    const showSuccess = () => {
      // Use the global method we added
      this.$notify('Operation successful!', 'success')
    }
    
    return { showSuccess, notifications }
  }
}
```
:::caution
While adding methods to `globalProperties` is convenient, be cautious about naming conflicts. Consider using a unique prefix for your plugin's methods (like `$notify` instead of just `notify`).
:::
### Advanced Plugin Patterns
Once you're comfortable with basic plugins, you can explore more advanced patterns:

#### Composable Plugin Logic
For complex plugins, you might want to break your logic into composable functions:
```js
function createNotificationSystem(app, config) {
  // Implementation details
  return {
    notify: (message, type) => { /* ... */ },
    clearAll: () => { /* ... */ },
    // ... other methods
  }
}

function notificationsPlugin(app, options) {
  const notificationSystem = createNotificationSystem(app, options)
  
  // Expose what you want to the app instance
  app.config.globalProperties.$notify = notificationSystem.notify
  app.provide('notificationSystem', notificationSystem)
}
```
#### Plugin Lifecycle Hooks
You can also hook into the app's lifecycle events:
```js
function analyticsPlugin(app, options) {
  // Track initial page view
  app.onMount(() => {
    trackPageView(window.location.pathname)
  })
  
  // Clean up when app is unmounted
  app.onUnmount(() => {
    // Cleanup logic
  })
}
```
For more on lifecycle events, check out the [Lifecycle API](http://localhost:3000/docs/api-reference/lifecycle-api) documentation.

### Best Practices for Plugin Development
- `Clear Documentation`: Document your plugin's API, options, and usage examples

- `TypeScript Support`: If using TypeScript, provide proper type definitions

- `Error Handling`: Include appropriate error handling and helpful error messages

- `Performance`: Ensure your plugin doesn't negatively impact app performance

- `Testing`: Write tests for your plugin functionality

### Publishing Your Plugin
When your plugin is ready for others to use:

- `Choose a descriptive name` (e.g., `refract-notifications`)

- `Add proper package.json metadata`

- `Include comprehensive documentation`

- `Publish to npm` with appropriate tags

```bash
npm publish --access public
```
Remember, the best way to learn is by doing. Start with a simple plugin for your next project and gradually add more complex functionality as you become comfortable with the patterns.

Happy plugin building! 




