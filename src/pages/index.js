import React, { useState } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";

export default ({ data }) => {
  const students = data.allStudentsYaml.edges;
  const [ search, setSearch ] = useState('');
  return (
    <div className="container">
        <p className="text-center mt-4 mb-0"><img src="https://app.buddy.works/breathecode/student-external-profile/pipelines/pipeline/162573/badge.svg?token=7fd65f24ee0daa2c60600820880d585a0bf52da8e65b5ef1f886615b58237012" /></p>
        <p className="text-center mt-0"><small>Last build: {moment(data.sitePage.fields.today).fromNow()}</small></p>
        <p className="text-center mt-0"><input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.replace(" ","").toLowerCase())} placeHolder="Type name to search" /></p>
        <ul>
            {
                students
                    .filter(({node}) => search === '' ? true : (node.basic_info.first_name + node.basic_info.last_name).toLowerCase().indexOf(search) > -1)
                    .map(({ node }, i) => (<li key={i}><Link to={node.basic_info.github}>{node.basic_info.first_name + ' ' + node.basic_info.last_name}</Link></li>))
            }
        </ul>
    </div>
  );
};

export const query = graphql`
  query Index{
    sitePage{
        fields{
            today
        }
    }
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
