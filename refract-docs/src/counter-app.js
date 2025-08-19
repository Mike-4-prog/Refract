import { createApp, createComponent, useRefraction } from './lib/refract';

const Counter = createComponent(() => {
  const [count, setCount] = useRefraction(0);
  
  const increment = () => setCount(count.value + 1);
  const decrement = () => setCount(count.value - 1);
  const reset = () => setCount(0);

  return {
    state: { count },
    actions: { increment, decrement, reset },
    view: () => `
      <div style="
        font-family: sans-serif;
        text-align: center;
        margin: 2rem;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      ">
        <h2>Refract Counter Demo</h2>
        <p style="font-size: 1.5rem;">
          Count: <strong>${count.value}</strong>
        </p>
        <div style="display: flex; gap: 8px; justify-content: center;">
          <button data-action="decrement" style="padding: 8px 16px;">
            Decrement -
          </button>
          <button data-action="reset" style="padding: 8px 16px;">
            Reset
          </button>
          <button data-action="increment" style="padding: 8px 16px;">
            Increment +
          </button>
        </div>
        <p><small>Powered by mock Refract framework</small></p>
      </div>
    `
  };
});

// Initialize app
const app = createApp();
app.registerComponent('counter', Counter);
app.mount('#app');