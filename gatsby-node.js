const path = require(`path`)
const slugify = require('slugify')
const fs = require('fs')
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  const blogPost = path.resolve(`./src/templates/blog-post.js`)
  return graphql(
    `
      query {
        allSanityPost(
          filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
        ) {
          edges {
            node {
              id
              publishedAt
              slug {
                current
              }
            }
          }
        }
      }
    `
  ).then(result => {
    if (result.errors) {
      throw result.errors
    }

    // Create blog posts pages.
    const posts = result.data.allSanityPost.edges

    posts.forEach((post, index) => {
      const previous = index === posts.length - 1 ? null : posts[index + 1].node
      const next = index === 0 ? null : posts[index - 1].node

      createPage({
        path: post.node.slug.current,
        component: blogPost,
        context: {
          id: post.node.id,
          slug: post.node.slug.current,
          previous,
          next,
        },
      })
    })
  })
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }

  // Create slug field for Strapi posts
  if (node.internal.type === `SanityPosts`) {
    const slugify_title = slugify(node.title, {
      replacement: '-', // replace spaces with replacement
      remove: /[,*+~.()'"!:@]/g, // regex to remove characters
      lower: true, // result in lower case
    })

    // Create slug field all lowercased and separated with dashes
    createNodeField({
      node,
      name: `slug`,
      value: slugify_title,
    })
  }
}

// Write site admin URL on post build
exports.onPostBuild = () => {
  fs.writeFile(
    './public/site.json',
    JSON.stringify({ siteAdminUrl: process.env.API_URL + '/admin' }),
    'utf8',
    function(err) {
      console.log(err)
    }
  )
}
