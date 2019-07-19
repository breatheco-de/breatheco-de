const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const getTemplate = (templateSlug) => {
  return path.resolve(`./src/templates/${templateSlug}/index.js`);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `SitePage`) {
      console.log(node);
      createNodeField({
        node, name: `today`,
        value: new Date(),
      });
  }
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

      let students = [];
      result.data.allStudentsYaml.edges.forEach(({ node }) => {
        students.push({
          github: node.basic_info.github,
          full_name: node.basic_info.first_name + ' ' + node.basic_info.last_name
        });
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
