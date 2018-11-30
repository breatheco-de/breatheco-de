const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const getTemplate = (templateSlug) => {
  return path.resolve(`./src/templates/${templateSlug}/index.js`);
};

exports.createPages = ({ actions, graphql }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    graphql(`
    {
      allStudentsYaml{
        edges{
          node{
            basic_info{
              github
            }
            template
          }
        }
      }
    }
    `).then(result => {
        
      result.data.allStudentsYaml.edges.forEach(({ node }) => {
        createPage({
          path: node.basic_info.github,
          component: getTemplate(node.template || 'online-cv'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            github: node.basic_info.github
          },
        });
      });
      resolve();
      });
    });
};
