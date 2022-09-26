// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

const nodeExternals = require('webpack-node-externals')

module.exports = function (api) {

  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^vuetify/, /^@mdi/]
        })
      ])
    }
  })
  
  api.loadSource(({ addCollection }) => {
    // Use the Data Store API here: https://gridsome.org/docs/data-store-api/
  })

  api.createPages(async ({ createPage, graphql }) => {
    const { data } = await graphql(`{
      allPosts{
        edges {
          node {
            id
            title
          }
        }
      }
    }`)

    data.allPosts.edges.forEach(({ node }) => {
      createPage({
        path: `/posts/${node.id}/`,
        component: 'src/templates/PostTemplate.vue',
        context: {
          postId: node.id
        }
      })
    })
  })
}
