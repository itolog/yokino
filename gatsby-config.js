const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const path = require('path');
const mqPacker = require('css-mqpacker');

module.exports = {
  siteMetadata: {
    title: 'Yokino',
  },
  plugins: [
    {
      resolve: 'gatsby-plugin-sentry',
      options: {
        dsn: 'https://523004b25cd44856a768081ce97a1b60@o400745.ingest.sentry.io/5259425',
        environment: process.env.NODE_ENV,
        enabled: (() => ['production', 'stage'].indexOf(process.env.NODE_ENV) !== -1)(),
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: 'UA-162139822-1',
        defer: true,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `img`,
        path: path.join(__dirname, 'src', 'assets', 'img'),
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: 'yokino',
        short_name: 'yokino',
        start_url: '/',
        background_color: '#1A143B',
        theme_color: '#1A143B',
        display: 'standalone',
        icon: './src/assets/img/icon.png', // This path is relative to the root of the site.
      },
    },
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [
          autoprefixer(),
          cssnano({
            preset: [
              'default',
              {
                autoprefixer: true,
                discardUnused: true,
                mergeIdents: true,
                zindex: true,
              },
            ],
          }),
          mqPacker({
            sort: true,
          }),
        ],
      },
    },
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /assets/, // See below to configure properly
        },
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
          },
          `gatsby-remark-lazy-load`,
        ],
      },
    },
    {
      resolve: `gatsby-plugin-react-redux`,
      options: {
        pathToCreateStoreModule: './src/state/createStore',
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-tslint`,
    `gatsby-transformer-sharp`,
    `gatsby-theme-apollo`,
    `gatsby-plugin-material-ui`,
  ],
};
