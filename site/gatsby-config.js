module.exports = {
  siteMetadata: {
    title: "4Geeks Academy Student Showcase",
    titleTemplate: "%s - 4Geeks Academy Student Showcase",
    description:
      "Directory of 4Geeks Academy's students",
    url: "https://sep.4geeksacademy.co", // No trailing slash allowed!
    image: "/sep.png", // Path to your image you placed in the 'static' folder
    twitterUsername: "@4geeksacademy",
  },
  plugins: [
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-yaml`,
    "gatsby-plugin-use-query-params",
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        precision: 8,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/resumes/`,
      },
    },
    {
      resolve: 'gatsby-plugin-web-font-loader',
      options: {
        google: {
          families: ['Quicksand']
        }
      }
    },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: '4Geeks Academy Student Showcase',
        short_name: '4Geeks Academy - Student Showcase Worldwide',
        start_url: '/',
        background_color: '#ffffff',
        theme_color: '#744C9E',
        display: 'standalone',
        icon: './static/icon.png',
      },
    }
  ],
};