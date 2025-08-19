window.Refract = {
  createApp: () => ({
    components: {},
    registerComponent(name, component) {
      this.components[name] = component;
    },
    mount(selector) {
      const mountPoint = document.querySelector(selector);
      Object.values(this.components).forEach(comp => {
        mountPoint.innerHTML = comp.view();
        mountPoint.querySelector('button')
          .addEventListener('increment', comp.actions.increment);
      });
    }
  }),
  
  createComponent: (factory) => factory(),
  
  useRefraction: (initial) => {
    const ref = { value: initial };
    return [ref, (val) => { ref.value = val }];
  }
};