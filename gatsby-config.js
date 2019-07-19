module.exports = {
  siteMetadata: {
    title: "4Geeks Academy Student ShowCase",
    titleTemplate: "%s - 4Geeks Academy Student ShowCase",
    description:
      "Directory of 4Geeks Academy's students",
    url: "https://students.4geeksacademy.co", // No trailing slash allowed!
    image: "/images/snape.jpg", // Path to your image you placed in the 'static' folder
    twitterUsername: "@4geeksacademy",
  },
  plugins: [
    `gatsby-plugin-sharp`,
    'gatsby-plugin-react-helmet',
    `gatsby-transformer-yaml`,
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
        path: `${__dirname}/src/students/`,
      },
    }
  ],
};