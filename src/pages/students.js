import React,{ useState } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";

export default ({ data }) => {
  const students = data.allStudentsYaml.edges;
  const [ search, setSearch ] = useState('');
  return (
    <div class="container">
        <h2 className="text-center mt-5"><small>This project was last published: <strong>{moment(data.sitePage.fields.today).fromNow()}</strong></small></h2>
        <div className="row">
            <div className="col-4 text-center">
                <strong>You don't see yourself on this list?</strong>
            </div>
            <div className="col-8">
                <small>
                Check if your commit is showing alreading on the main repository <a target="_blank" href="https://github.com/4GeeksAcademy/student-external-profile/commits/master">commits history</a> and your pull request should be listed as "closed" on the <a target="_blank" href="https://github.com/4GeeksAcademy/student-external-profile/pulls?utf8=%E2%9C%93&q=is%3Apr+is%3Aclosed+is%3Aopen"> repository list of pull requests</a>, here is a list of <a target="_blank" href="https://travis-ci.org/4GeeksAcademy/student-external-profile/pull_requests">travis automated testing queue</a>.
                </small>
            </div>
        </div>
        <p className="text-center mt-4"><input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.replace(" ","").toLowerCase())} placeHolder="Type student name to search" /></p>

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
  query Students{
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