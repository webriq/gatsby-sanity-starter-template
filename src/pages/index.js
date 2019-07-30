import React from 'react'
import { Link, graphql } from 'gatsby'
import Layout from '../components/Layout'
import SEO from '../components/seo'
import MySwiper from '../components/Swiper'
import SampleForm from '../components/Form'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import 'react-lazy-load-image-component/src/effects/blur.css'

class IndexPage extends React.Component {
  render() {
    const siteTitle = this.props.data.site.siteMetadata.title
    const siteDescription = this.props.data.site.siteMetadata.description

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO title={siteTitle} description={siteDescription} />
        <div>
          <p>This is the homepage</p>
          <Link to="/blog">Go to Blog</Link>
          <br />
          <br />
          <hr style={{ marginTop: `60px` }} />
          <h1>Sample Swiper</h1>
          <br />
          <MySwiper slidesperview={3}>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/145698/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/2203755/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/362271/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/3657445/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/385548/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/325867/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/1118905/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/2270935/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/1252081/400x400"
                alt=""
              />
            </div>
            <div>
              <LazyLoadImage
                effect="blur"
                className="img-fluid"
                src="https://source.unsplash.com/collection/2411320/400x400"
                alt=""
              />
            </div>
          </MySwiper>
          <br />
          <br />
          <h1>Sample Form</h1>
          <br />
          <SampleForm
            form_name="Newsletter Form"
            form_id="5bcd42f86b63453b251972bc"
            form_classname="form-newsletter"
          >
            <div className="form-row">
              <div className="col-12 mb-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="email"
                    name="Email Address"
                    id="email_address"
                  />
                  <label htmlFor="email_address">
                    Enter Your Email Address
                  </label>
                </div>
                <small className="text-dark form-text mt-2">
                  We will never share your email with anyone else.
                </small>
              </div>
              <div className="col-12 mb-3">
                <div className="form-group">
                  <input
                    className="form-control"
                    type="text"
                    name="Name"
                    id="full_name"
                  />
                  <label htmlFor="full_name">Enter Your Name</label>
                </div>
              </div>
              <div className="col-12">
                <div className="webriq-recaptcha" />
              </div>

              <div className="col-12">
                <div className="form-group">
                  <button className="btn btn-primary hvr-shadow" type="submit">
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </SampleForm>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

export const indexPageQuery = graphql`
  query indexPageQuery {
    site {
      siteMetadata {
        title
        author
        description
      }
    }
  }
`
