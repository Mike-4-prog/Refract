// @ts-check

const sidebars = {
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: true,
      collapsed: false,
      items: [
        'getting-started/introduction',
        'getting-started/quick-start',
      ],
    },
    {
      type: 'category',
      label: 'Core Concepts',
      collapsible: true,
      collapsed: false,
      items: [
        'core-concepts/refractions',
        'core-concepts/lenses',
        'core-concepts/optics',
        'core-concepts/components',
      ],
    },
   {
      type: 'category',
      label: 'Tutorials',
      collapsible: true,
      collapsed: true,
      items: [
        'tutorials/build-a-counter-app',
        'tutorials/mouse-tracker-with-optics',
      ],
    },
     {
      type: 'category',
      label: 'API Reference',
      collapsible: true,
      collapsed: true,
      items: [
        'api-reference/create-app',
        'api-reference/create-component',
        'api-reference/reactivity-api',
        'api-reference/lifecycle-api',
      ],
    },
    {
      type: 'category',
      label: 'Advanced Guides',
      collapsible: true,
      collapsed: true,
      items: [
        'advanced-guides/side-effects-management',
        'advanced-guides/optical-composition-patterns',
      ],
    },
    {
      type: 'category',
      label: 'Extending Refract',
      collapsible: true,
      collapsed: true,
      items: [
        'extending-refract/overview',
        'extending-refract/plugins',
      ],
    },
    'contributing-guide',
    'faq',
    'glossary',
  ],
};

export default sidebars;

