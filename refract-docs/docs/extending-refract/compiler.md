---
id: compiler
title: Understanding the Refract Compiler
sidebar_label: Compiler
description: Learn how the Refract compiler works and how to extend it for custom transformations, tooling, and advanced integrations.
---

Welcome to the most advanced topic in the Refract ecosystem!  If you've ever been curious about what happens between writing your elegant Refract code and seeing it run in the browser, you're in the right place. The compiler is where the magic happens, transforming your declarative code into highly optimized JavaScript.

### What Exactly is the Compiler?

Think of the Refract compiler as a super-smart translator. You write code in a way that's easy for humans to understand (using JSX, templates, or specific syntax), and the compiler translates it into code that's optimized for browsers to execute efficiently.

**Simple Analogy**: Writing Refract code without understanding the compiler is like driving a car without knowing how the engine works. You can still get places, but when you understand what's under the hood, you can drive better, maintain the car yourself, and even make custom modifications.

### Why Would You Extend the Compiler?

Extending the compiler is definitely an advanced topic, but it unlocks powerful capabilities:

- **Add custom syntax** for your specific needs
- **Performance optimizations** tailored to your application
- **Debugging enhancements** that help during development
- **Integration with other tools** in your build process

:::caution  **Handle With Care**
Compiler extensions are powerful but complex. We recommend having solid experience with JavaScript ASTs (Abstract Syntax Trees) and build tools before diving in. If you're new to these concepts, you might want to start with **[Creating Plugins](http://localhost:3000/docs/extending-refract/plugins)** instead.
:::

### How the Refract Compiler Works

Let's break down the compilation process into simple steps:

#### Step 1: Parsing
Your source code gets converted into an Abstract Syntax Tree (AST) - a structured representation of your code that computers can easily analyze and manipulate.

#### Step 2: Transformation
The compiler walks through the AST and applies various transformations:
- Converts JSX/templates to JavaScript function calls
- Optimizes reactive expressions
- Handles scoped styles and assets

#### Step 3: Code Generation
The transformed AST gets converted back into JavaScript code that browsers can execute, often with significant performance optimizations.

### Key Compiler Concepts

#### The AST (Abstract Syntax Tree)

An AST is a tree representation of your code's structure. Think of it like a detailed outline of your code where each element (variables, functions, expressions) becomes a node in the tree.

```javascript
// Simple code
const message = 'Hello, ' + name

// Might become an AST that looks conceptually like:
{
  type: 'VariableDeclaration',
  declarations: [{
    type: 'VariableDeclarator',
    id: { type: 'Identifier', name: 'message' },
    init: {
      type: 'BinaryExpression',
      operator: '+',
      left: { type: 'Literal', value: 'Hello, ' },
      right: { type: 'Identifier', name: 'name' }
    }
  }]
}
```
#### Visitor Pattern
The compiler uses a "visitor" pattern to traverse and modify the AST. Visitors are objects with methods that get called when specific types of nodes are encountered.
```js
const visitor = {
  Identifier(path) {
    // This gets called for every identifier in the code
    console.log(`Found identifier: ${path.node.name}`)
  },
  
  BinaryExpression(path) {
    // This gets called for every binary expression like a + b
    if (path.node.operator === '+') {
      // We could transform this expression
    }
  }
}
```
### Creating Your First Compiler Extension
Let's create a simple compiler macro that adds a custom @debug directive to log values during development.
#### Step 1: Set Up Your Environment
First, you'll need to understand your build setup. Refract typically uses Vite, Rollup, or webpack, each with their own plugin systems for compiler extensions.
#### Step 2: Create a Visitor for Your Custom Syntax
```js
function debugMacro() {
  return {
    name: 'debug-macro',
    visitor: {
      // Look for method calls with the name '$debug'
      CallExpression(path) {
        if (path.node.callee.name === '$debug') {
          // Get the argument being debugged
          const debuggedValue = path.node.arguments[0]
          
          // Replace with a console.log statement
          path.replaceWith({
            type: 'CallExpression',
            callee: { type: 'Identifier', name: 'console.log' },
            arguments: [
              { type: 'Literal', value: 'DEBUG:' },
              debuggedValue
            ]
          })
        }
      }
    }
  }
}
```
#### Step 3: Integrate with Your Build Process
How you integrate this depends on your build tool:
```js
// Vite example
import { defineConfig } from 'vite'
import refract from '@refractjs/vite-plugin'

export default defineConfig({
  plugins: [
    refract({
      compilerOptions: {
        macros: [debugMacro()]
      }
    })
  ]
})
```
Now you can use your custom debug macro in code:
```js
// This in your source code
$debug(someValue)

// Gets transformed to this in the output
console.log('DEBUG:', someValue)
```
### Real-World Example: Optimizing Reactive Expressions
Let's look at a more practical example - optimizing reactive expressions to prevent unnecessary re-renders.
```js
function reactiveOptimizer() {
  return {
    name: 'reactive-optimizer',
    visitor: {
      CallExpression(path) {
        // Look for useRefraction calls
        if (path.node.callee.name === 'useRefraction') {
          // Analyze the initial value for optimization opportunities
          const initialValue = path.node.arguments[0]
          
          // If it's a simple object literal, we can apply optimizations
          if (initialValue.type === 'ObjectExpression') {
            // Add performance optimizations here
          }
        }
      }
    }
  }
}
```
### Advanced Compiler Techniques
#### Custom JSX Transformations
You can create custom JSX elements that transform into optimized code:
```js
function customJSXTransformer() {
  return {
    name: 'custom-jsx',
    visitor: {
      JSXElement(path) {
        if (path.node.openingElement.name.name === 'CustomOptimizedComponent') {
          // Transform this JSX into a more efficient function call
          transformCustomComponent(path)
        }
      }
    }
  }
}
```
#### Static Analysis and Optimization
The compiler can analyze your code at build time to make runtime optimizations:
```js
function staticAnalyzer() {
  return {
    name: 'static-analyzer',
    visitor: {
      VariableDeclarator(path) {
        // Detect values that never change and mark them as constants
        if (canBeConstant(path)) {
          optimizeAsConstant(path)
        }
      }
    }
  }
}
```
### Testing Compiler Extensions
Testing compiler changes is crucial. Here's a simple testing approach:
```js
import { transform } from '@refractjs/compiler'

test('debug macro transforms correctly', () => {
  const code = `const value = 5; $debug(value);`
  const result = transform(code, {
    plugins: [debugMacro()]
  })
  
  expect(result.code).toContain('console.log')
  expect(result.code).toContain('DEBUG:')
})
```
### Performance Considerations
When writing compiler extensions, keep performance in mind:

- `Minimize AST traversals`: Visit only the nodes you need to

- `Cache results`: Avoid re-computing the same information

- `Early exits`: Return early when possible to save processing time
:::info
Use the `path.skip()` method when you don't need to traverse a node's children, which can significantly improve performance.
:::
### Debugging Compiler Extensions
Debugging compiler code can be tricky. Here are some tips:

- Use `console.log(path.node)` to see the current AST node

- Use the `path.toString()` method to see the code for a node

- Step through the transformation process with debugger statements

- Use AST Explorer (astexplorer.net) to understand the AST structure
### When to Extend the Compiler vs. Create a Plugin
Sometimes it's unclear whether to extend the compiler or create a runtime plugin. Here's a simple guideline:

- Use **compiler extensions** when you need to change the code structure itself

- Use **plugins** when you're adding runtime functionality
:::info
If your feature requires syntax changes or build-time optimizations, choose compiler extensions. If it's about adding methods, components, or runtime behavior, choose plugins.
:::

Remember, compiler extensions are powerful tools. With great power comes great responsibility - use them to make your code better, not just more complex!

Happy compiling! 

