/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
const _ = require("lodash");
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
                    url
                  }
                }
              }
              allVersionJson {
                totalCount
                edges {
                  node {
                    title
                    releaseDate
                    url
                  }
                }
              }
            }
          `
      ).then(result => {
        if (result.errors) {
          reject(result.errors)
        }
        const nodes = result.data.allDataJson.edges.map(n => n.node);
        const versions = result.data.allVersionJson.edges.map(n => n.node);
        const status = _.uniq(nodes.map(node => node.status));
        const category = _.uniq(nodes.map(node => node.category));

        const mergedNodes = nodes.map(node => {
          const mainVersion = versions.find(ver => node.version.includes(ver.title));
          return {
            ...node,
            parentVersion: mainVersion ? mainVersion.title : null,
            releaseDate: mainVersion ? mainVersion.releaseDate : null,
            releaseUrl: mainVersion ? mainVersion.url : null
          }
        })

        const groupedByVersion = _.groupBy(mergedNodes, node => node.parentVersion);
        const versionAvaliable = Object.keys(groupedByVersion);

        // Create pages for each markdown file.
        versionAvaliable.forEach(ver => {
          const p = `/${ver ? ver : "undefined"}`;
          createPage({
            path: p,
            component: versionTemplate,
            context: {
              data: groupedByVersion[ver],
              releaseDate: groupedByVersion[ver][0].releaseDate,
              releaseUrl: groupedByVersion[ver][0].releaseUrl,
              status,
              category
            },
          })
        })
      })
    )
  })
}
