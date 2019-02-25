import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import VersionTable from "../components/version-table";

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`unity`, `unity3d`, `bug`, `issue tracker`]} />
    <h1>Is My Unity Version Stable?</h1>
    <p>Graphical Representation of Unity Issue Tracker</p>
    <VersionTable/>
  </Layout>
)

export default IndexPage
