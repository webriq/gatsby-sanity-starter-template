import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import BasePortableText from '@sanity/block-content-to-react'
import { rhythm } from '../utils/typography'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const siteTitle = data.site.siteMetadata.title
    const posts = data.allSanityPost.edges

    console.log(this.props)

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO
          title="All posts"
          keywords={[`blog`, `gatsby`, `javascript`, `react`]}
        />
        {posts.map(({ node }) => {
          const title = node.title
          const serializers = {
            types: {
              authorReference: ({ node }) => (
                <span>
                  {node.author.firstname} {node.author.lastname}
                </span>
              ),
            },
          }
          return (
            <div key={node.slug.current}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug.current}>
                  {title}
                </Link>
              </h3>
              <small>{node._createdAt}</small>

              <BasePortableText
                blocks={node._rawExcerpt}
                serializers={serializers}
              />
            </div>
          )
        })}
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allSanityPost(
      filter: { status: { eq: "published" } }
      sort: { fields: [author____createdAt], order: DESC }
    ) {
      edges {
        node {
          id
          title
          _rawExcerpt
          slug {
            current
          }
          _createdAt
          _updatedAt
          author {
            id
            firstname
            lastname
            image {
              asset {
                id
                url
                fluid {
                  src
                }
              }
            }
          }
        }
      }
    }
  }
`
