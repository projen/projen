// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

import {themes as prismThemes} from 'prism-react-renderer';
import {readFileSync} from "fs";

function getBaseUrl() {
  // todo: this code will be removed at a later time
  if (process.env.GITHUB_REPOSITORY === 'Defiance-Digital/projen')return "/projen";

  return "/";
}

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    format: 'detect'
    // format: 'md'
  },
  title: 'projen',
  tagline: 'Define and maintain complex project configuration through code.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://projen.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: getBaseUrl(),

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'projen', // Usually your GitHub org/user name.
  projectName: 'projen', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/projen/projen/tree/main/docusaurus/',
          path: 'docs',
          async sidebarItemsGenerator({defaultSidebarItemsGenerator, ...args}) {
            const sidebarItems = await defaultSidebarItemsGenerator(args);
            return sidebarItems.filter(x => x.label !== 'api');
          }
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        }
      }),
    ],
  ],

  themeConfig:
  /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      image: 'img/projen.svg',
      navbar: {
        title: 'Projen',
        logo: {
          alt: 'Projen Logo',
          src: 'img/projen.svg',
        },
        items: [
          {
            type: 'docSidebar',
            sidebarId: 'docsSidebar',
            position: 'left',
            label: 'Docs',
          },
          {
            type: 'docSidebar',
            sidebarId: 'apiSidebar',
            label: 'API Reference',
            position: 'left',
          },
          {
            href: 'https://github.com/projen/projen',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Docs',
            items: [
              {
                label: 'Introduction',
                to: '/docs/Introduction/index',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/projen',
              },
              {
                label: 'Slack',
                href: 'https://cdk-dev.slack.com',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'GitHub',
                href: 'https://github.com/projen/projen',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()}. Built with Docusaurus by Defiance Digital with ❤️.`,
      },
      prism: {
        darkTheme: prismThemes.dracula,
      },
    }),
  plugins: [
    async function myPlugin(context, options) {
      return {
        name: "docusaurus-tailwindcss",
        configurePostCss(postcssOptions) {
          // Appends TailwindCSS and AutoPrefixer.
          postcssOptions.plugins.push(require("tailwindcss"));
          postcssOptions.plugins.push(require("autoprefixer"));
          return postcssOptions;
        },
      };
    }
  ],
};

module.exports = config;
