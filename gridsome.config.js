// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const nodeExternals = require('webpack-node-externals')

module.exports = {
  siteName: 'Adventures AF',
  transformers: {
    remark: {
      externalLinksTarget: '_blank',
      externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
      plugins: ['@gridsome/remark-prismjs']
    }
  },
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'posts/**/*.md',
        typeName: 'Posts',
        remark: {
          plugins: [
            // ...local plugins
          ]
        }
      }
    },
    {
      use: 'gridsome-plugin-netlify-cms',
      options: {
        publicPath: '/admin',
        modulePath: 'src/admin/index.js'
      }
    }
  ],
  chainWebpack(config, { isServer }) {
    if (isServer) {
      config.externals(nodeExternals({
        whitelist: [/\.css$/, /\?vue&type=style/]
      }))
    }
  }
}
