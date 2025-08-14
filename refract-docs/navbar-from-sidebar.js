// navbar-from-sidebar.js
const sidebars = require('./sidebars.js');

/**
 * Recursively flattens a sidebar category into navbar items.
 */
function flattenCategory(category) {
  const label = category.label;
  const firstItem =
    category.items && category.items.length > 0
      ? category.items[0]
      : null;

  // If first item is a doc string, link directly to it
  let link = null;
  if (typeof firstItem === 'string') {
    link = `/docs/${firstItem}`;
  }

  // If first item is another category, link to its first doc
  if (typeof firstItem === 'object' && firstItem.type === 'category') {
    const nestedFirst = flattenCategory(firstItem);
    link = nestedFirst.to;
  }

  return {
    label,
    to: link || '/docs/intro', // fallback if empty
    position: 'left',
  };
}

/**
 * Converts the entire sidebar(s) into navbar items dynamically.
 */
function sidebarToNavbar() {
  const navbarItems = [];

  Object.values(sidebars).forEach((sidebar) => {
    sidebar.forEach((item) => {
      if (item.type === 'category') {
        navbarItems.push(flattenCategory(item));
      }
    });
  });

  return navbarItems;
}

module.exports = sidebarToNavbar();
