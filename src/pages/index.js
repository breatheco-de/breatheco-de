import React from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';

export default ({ data }) => {
  const students = data.allStudentsYaml.edges;
  console.log(students);
  return (
    <div>
        <ul>
            {
                students.map(({ node }, i) => (<li key={i}><Link to={node.basic_info.github}>{node.basic_info.first_name + ' ' + node.basic_info.last_name}</Link></li>))
            }
        </ul>
    </div>
  );
};

export const query = graphql`
  query Index{
    allStudentsYaml{
        edges{
            node{
                basic_info{
                    github
                    first_name
                    last_name
                }
            }
        }
    }
  }
`;
