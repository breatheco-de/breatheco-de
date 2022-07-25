const _ = require('lodash');
const { createFilePath } = require(`gatsby-source-filesystem`);
const path = require("path");

const getTemplate = (templateSlug) => {
  return path.resolve(`./src/templates/${templateSlug}/index.js`);
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `SitePage`) {
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
      allResumesYaml{
        edges{
          node{
            basic_info {
              github
              first_name
              last_name
              motto
              linkedin
              twitter
              email
              linkedin
              website
              summary
              languages {
                idiom
                level
              }
            }
            education {
              degree
              details
              time
              university
            }
            experiences {
              company
              details
              role
              time
            }
            projects {
              assignments {
                link
                tagline
                title
              }
            }
            skills {
              toolset {
                level
                name
              }
            }
            work_experience {
              company
              details
              role
              time
            }
          }
        }
      }
    }
    `).then(result => {

      let students = [];
      result.data.allResumesYaml.edges.forEach(({ node }) => {
        students.push({
          github: node.basic_info.github,
          full_name: node.basic_info.first_name + ' ' + node.basic_info.last_name
        });
        createPage({
          path: `${node.basic_info.github}/profile`,
          component: getTemplate(node.template || 'online-cv'),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            github: node.basic_info.github
          },
        });
        // Pdf template parameters
        createPage({
          path: `${node.basic_info.github}/pdf`,
          component: getTemplate('pdf'),
          context: {node},
        });
      });
     
      resolve();
    });
  });
};
