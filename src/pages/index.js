import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Img from "gatsby-image"

export const useEvents = () => {
  const data = useStaticQuery(
    graphql`
      query EventQuery {
          allMarkdownRemark(
            limit: 2000
            sort: { fields: [frontmatter___date], order: DESC }
          ) {
            edges {
              node {
                excerpt(
                  pruneLength: 100,
                  truncate:true
                )
                timeToRead
                frontmatter {
                  title
                  tags
                  featuredImage{
                    childImageSharp{
                      fluid(maxWidth: 800, quality: 80){
                        ...GatsbyImageSharpFluid_withWebp
                      }
                      thumbnail: fluid(maxWidth: 500, maxHeight: 300, quality:80){
                        ...GatsbyImageSharpFluid_withWebp
                      } 
                    }
                  }
                  date(formatString: "MMM Do YYYY")
                }
              }
            }
          }
        }
      `
  )
  return data.allMarkdownRemark;
}

export const useLatestPosts = () => {
  const postEdges = useEvents().edges.slice(0, 4);
  return { edges: postEdges }
}

const SecondPage = () => (
  <Layout>
    <SEO title="Page two" />
    <h1>Hi from the second page</h1>
    <p>Welcome to page 2</p>
    <div style={{
      display: `flex`,
      flexWrap: `wrap`,
      marginRight: -15,
      marginLeft: -15
    }}>
      {
        useLatestPosts().edges.map(({ node }, key) => {
          let featuredImage = node.frontmatter.featuredImage;
          return (
            <div 
              key={key} 
              style={{
                flex: "0 0 100%",
                maxWidth: "100%",
                padding: 15
                }}>
              <a href={node.frontmatter.slug}>
                <Img
                  fluid={featuredImage.childImageSharp.thumbnail}
                  placeholderStyle={{ filter: "blur(20px)" }}
                  alt={node.frontmatter.title}
                  title={node.frontmatter.title}
                />
              </a>
            </div>
          )
        })

      }
    </div>
    <Link to="/">Go back to the homepage</Link>
  </Layout>
)

export default SecondPage
