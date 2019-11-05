import React from "react"
import PropTypes from "prop-types"
import { StaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={data => (
        <div
          style={{
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            textAlign: "center",
            backgroundColor: "#f5f6f7"
          }}
          >
          {/* <Header siteTitle={data.site.siteMetadata.title} /> */}
          <main style={{
            flex: "1 0 auto"
          }}>
            {children}
          </main>
          <footer style={{
            flexShrink: 0
          }}>
            © {new Date().getFullYear()}, Built with ❤
            {` `}
            <a href="https://github.com/RingoKam">Ringo Kam</a>
          </footer>
        </div>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
