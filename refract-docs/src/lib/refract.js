// Simple React-like mock implementation
const Refract = {
  createApp: () => ({
    components: {},
    registerComponent(name, component) {
      this.components[name] = component;
    },
    mount(selector) {
      const root = document.querySelector(selector);
      Object.values(this.components).forEach(component => {
        root.appendChild(component.render());
      });
    }
  }),

  createComponent: (factory) => {
    let state;
    const component = {
      render() {
        const result = factory();
        state = result.state;
        const div = document.createElement('div');
        div.innerHTML = result.view();
        div.querySelectorAll('button').forEach(button => {
          button.onclick = () => {
            result.actions[button.dataset.action]();
            div.innerHTML = result.view();
          };
        });
        return div;
      }
    };
    return component;
  },

  useRefraction: (initialValue) => {
    const ref = {
      value: initialValue,
      set(newValue) {
        this.value = newValue;
      }
    };
    return [ref, (val) => ref.set(val)];
  }
};

export const { createApp, createComponent, useRefraction } = Refract;