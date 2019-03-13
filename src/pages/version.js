import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = (page) => {
  // const version = page.location.state.version;
  // if(!version) {
  // }
  const version = page.location.search.split("=")[1];

  return (
    <Layout>
      <SEO title={version} />
      <h1>Unity Version: {version}</h1>
      <Link to="/">Go back to the homepage</Link>
    </Layout>
  )
}

const AllJsonQuery = (createPage, graphql, version) => graphql(`
    query {
      allDataJson(filter: {version: {eq: "2017.3.1p1"}}) {
        edges {
          node {
            id
            category
            status
            count
            date
            version
            url
          }
        }
      }
    }
`, { version });


export default SecondPage
