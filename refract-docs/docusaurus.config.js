// @ts-check
import { themes as prismThemes } from 'prism-react-renderer';
const navbarFromSidebar = require('./navbar-from-sidebar.js');

// Detect Netlify branch (staging or main)
const BRANCH = process.env.BRANCH || 'local'; // Netlify sets BRANCH automatically

// Determine site URL based on branch
const resolvedUrl =
  BRANCH === 'main'
    ? 'https://refract.netlify.app'       // Production site URL
    : BRANCH === 'staging'
      ? 'https://refract-stg.netlify.app' // Staging site URL
      : 'http://localhost';               // Local dev

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Refract',
  tagline: 'Refract: The optics-based framework for reactive user interfaces.',
  favicon: 'img/favicon.png',

  // URL & base configuration
  url: resolvedUrl,
  baseUrl: '/',

  organizationName: 'Mike-4-prog',
  projectName: 'Refract',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  future: { v4: true },

  i18n: { defaultLocale: 'en', locales: ['en'] },

  scripts: [{ src: '/js/refract-mock.js', async: false }],

  // Expose environment to React components
  customFields: {
    environment: BRANCH === 'main' ? 'production' : BRANCH === 'staging' ? 'staging' : 'local',
  },

  presets: [
    [
      'classic',
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl: 'https://github.com/Mike-4-prog/Refract/edit/main/',
        },
        blog: {
          showReadingTime: true,
          feedOptions: { type: ['rss', 'atom'], xslt: true },
          editUrl: 'https://github.com/Mike-4-prog/Refract/edit/main/blog/',
        },
        theme: { customCss: require.resolve('./src/css/custom.css') },
      }),
    ],
  ],

  themeConfig: {
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Refract',
      logo: { alt: 'Refract Logo', src: 'img/refract-logo.png' },
      items: [
        ...navbarFromSidebar.map((item) => ({ ...item, position: 'right' })),
        { to: '/blog', label: 'Blog', position: 'right' },
        { href: 'https://github.com/Mike-4-prog/Refract', label: 'GitHub', position: 'right' },
        // Removed environment badge item to prevent crash
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            { label: 'Getting Started', to: '/docs/getting-started/introduction' },
            { label: 'Counter Tutorial', to: '/docs/tutorials/build-a-counter-app' },
            { label: 'API Reference', to: '/docs/api-reference/create-app' },
          ],
        },
        {
          title: 'Community',
          items: [
            { label: 'Stack Overflow', href: 'https://stackoverflow.com/questions/tagged/refract' },
            { label: 'Discord', href: 'https://discord.gg/example' },
          ],
        },
        {
          title: 'More',
          items: [
            { label: 'Blog', to: '/blog' },
            { label: 'GitHub', href: 'https://github.com/Mike-4-prog/Refract' },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Refract Project. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ['javascript', 'typescript', 'jsx'],
    },
  },
};

export default config;
