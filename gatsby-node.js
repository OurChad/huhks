/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it
// exports.onCreateWebpackConfig = ({
//     actions,
//   }) => {
//     actions.setWebpackConfig({
//       module: {
//         rules: [
//           {
//             test: /\.md$/,
//             loaders: ['html-loader', 'markdown-loader'],
//           },
//           {
//             test: /\.html$/,
//             loader: 'html-loader',
//             options: {
//               minimize: false,
//             },
//           },
//         ],
//       },
//     })
//   };

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `MarkdownRemark`) {
    const slug = createFilePath({ node, getNode, basePath: `pages` });
    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage, createRedirect } = actions;
  const result = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                slug
              }
            }
          }
        }
      }
    `);

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/MDPage.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    });
  });

  createRedirect({
    fromPath: `/`,
    toPath: `/what-are-hooks/`,
    redirectInBrowser: true,
    isPermanent: true,
  });
};
