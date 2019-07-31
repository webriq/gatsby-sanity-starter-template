// Load environment variables
require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
})

const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  siteMetadata: {
    title: `WebriQ Gatsby + Sanity Starter Template`,
    author: `WebriQ`,
    description: `WebriQ Gatsby Starter Template with its blog posts coming Sanity app instance.`,
    siteUrl: `https://webriq-gatsby-strapi-starter-template.webriq.me/`,
    social: {
      twitter: `kylemathews`,
    },
  },
  plugins: [
    {
      resolve: 'gatsby-source-sanity',
      options: {
        projectId: process.env.SANITY_PROJECT_ID || 'puw6oew8',
        dataset: process.env.SANITY_DATASET || 'production',
        token: process.env.SANITY_READ_TOKEN,
        watchMode: !isProd,
        overlayDrafts: !isProd,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        // trackingId: `ADD YOUR TRACKING ID HERE`,
        // head: true,
        // anonymize: true,
        // respectDNT: true,
        // cookieDomain: `example.com`
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `open sans\:400,600,700,800`,
          `montserrat\:400,500,600,700`, // you can also specify font weights and styles
        ],
      },
    },
    `gatsby-plugin-sitemap`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: ({ query: { site, allSanityPost } }) => {
              return allSanityPost.edges.map(edge => {
                return Object.assign({}, edge.node, {
                  description: edge.node._rawExcerpt,
                  date: edge.node._createdAt,
                  url: site.siteMetadata.siteUrl + edge.node.slug.current,
                  guid: site.siteMetadata.siteUrl + edge.node.slug.current,
                  custom_elements: [
                    { 'content:encoded': edge.node._rawExcerpt },
                  ],
                })
              })
            },
            query: `
              {
                allSanityPost(
                  filter: { status: { eq: "published" } }
                  sort: { fields: [author____createdAt], order: DESC }
                ) {
                  edges {
                    node {
                      id
                      title
                      _rawExcerpt
                      _createdAt
                      slug {
                        current
                      }
                    }
                  }
                }
              }
            `,
            output: '/rss.xml',
            title: "Your Site's RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `WebriQ Blog`,
        short_name: `WebriQ`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#f7f7f7`,
        display: `minimal-ui`,
        icon: `static/gatsby-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
  ],
}
