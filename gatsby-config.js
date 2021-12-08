module.exports = {
  siteMetadata: {
    title: 'Les déraillés de la Suisse Normande',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    "gatsby-plugin-sitemap",
    {
      resolve: 'gatsby-source-wordpress',
      options: {
        // The base url to your WP site.
        url: process.env.WPGRAPHQL_URL || 'http://cdsn.loc/graphql',
        schema: {
          timeout: 120000,
        },
        auth: {},
        // Set to true to debug endpoints on 'gatsby build'
        verbose: true,
      },
    },
    {
      resolve: "gatsby-plugin-google-analytics",
      options: {
        trackingId: "TEST",
      },
    },
    'gatsby-plugin-image',
    {
      resolve:'gatsby-plugin-sharp',
      options: {
        defaults: {
          formats: [`auto`, `webp`],
          placeholder: `dominantColor`,
          quality: 50,
          breakpoints: [750, 1080, 1366, 1920],
          backgroundColor: `transparent`,
          tracedSVGOptions: {},
          blurredOptions: {},
          jpgOptions: {},
          pngOptions: {},
          webpOptions: {},
          avifOptions: {},
        },
      },
    },
    'gatsby-transformer-sharp',
    {
      // Removes unused css rules
      resolve:'gatsby-plugin-purgecss',
      options: {
        // Activates purging in gatsby develop
        develop: true,
        // Purge only the main css file
        purgeOnly: ['/all.sass'],
      },
    }, // must be after other CSS plugins
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
