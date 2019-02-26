/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const _  = require("lodash");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions
  
    return new Promise((resolve, reject) => {
      const versionTemplate = path.resolve(`src/templates/version.js`)
      // Query for markdown nodes to use in creating pages.
      resolve(
        graphql(
          `
            query {
              allDataJson {
                totalCount
                edges {
                    node {
                        id
                        status
                        category
                        count
                        version
                        title
                    }
                }
              }
            }
          `
        ).then(result => {
          if (result.errors) {
            reject(result.errors)
          }
          console.log(result);
          const nodes = result.data.allDataJson.edges.map(n => n.node);
          const groupedByVersion = _.groupBy(nodes, node => node.version);
          const versionAvaliable = Object.keys(groupedByVersion);

          // Create pages for each markdown file.
          versionAvaliable.forEach(ver => {
            const p = `/${ver ? ver : "undefined"}`;
            createPage({
              path: p,
              component: versionTemplate,
              context: {
                data: groupedByVersion[ver],
              },
            })
          })
        })
      )
    })
  }