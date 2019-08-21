import React, { useState } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";

export default ({ data }) => {
  const students = data.allStudentsYaml.edges;
  const [ search, setSearch ] = useState('');
  return (
    <div className="container">
        <h2 className="text-center mt-5"><small>This project was last built: <strong>{moment(data.sitePage.fields.today).fromNow()}</strong></small></h2>
        <div className="row">
            <div className="col-4 text-center">
                <small><strong>You don't see yourself on this list?</strong></small>
            </div>
            <div className="col-8">
                <small>
                Check if your commit is showing alreading on the repository <a target="_blank" href="https://github.com/4GeeksAcademy/student-external-profile/commits/master">commits history</a> and your pull request should be listed as "approved" on the <a target="_blank" href="https://github.com/4GeeksAcademy/student-external-profile/pulls"> repository list of pull requests</a>
                </small>
            </div>
         </div>
        <p className="text-center mt-4"><input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.replace(" ","").toLowerCase())} placeHolder="Type student name to search" /></p>
        <ul>
            {
                students
                    .filter(({node}) => search === '' ? true : (node.basic_info.first_name + node.basic_info.last_name).toLowerCase().indexOf(search) > -1)
                    .map(({ node }, i) => (<li key={i}>{node.basic_info.first_name} {node.basic_info.last_name} <Link to={node.basic_info.github}> Online-CV </Link><Link to={`/profile/${node.basic_info.github}`}> Profile </Link></li>))
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
