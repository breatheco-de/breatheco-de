import React, { useState } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";
import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import ExternalProfile from "./PDF";


export default ({ data }) => {
    const students = data.allStudentsYaml.edges;
    const [search, setSearch] = useState('');
    const [contentPDF, setContentPDF] = useState({
            basic_info: {
              github: "Github",
              first_name: "First Name",
              last_name: "Last Name",
              motto: "I like play with codes",
              linkedin: "LinkedIn",
              email: "youremail@gmail.com",
              summary: "Amateur man in programming, with a desire to learn to use it in everyday life",
              languages: [
                {
                  idiom: "Spanish",
                  level: "Native"
                },
                {
                  idiom: "English",
                  level: "Medium"
                },
                {
                  idiom: "Portuguese",
                  level: "Basic"
                }
              ]
            },
            education: [
              {
                degree: "FullStack Web Developer",
                details: "-Real “Senior” Mentoring All of our staff has 10+ years coding and holds senior possitions in Miami's tech industry. -Top-notch Technology Stack The world of Coding grows and changes EVERY DAY. Learn the newest and most demanded languages and frameworks in the current market. Your potential employers will LOVE IT. -Really Part-time It is not about teaching on after-hours, it requires much more! This program is meant for employed professionals. We have designed the perfect method for both flexible and blended learning in an “after-hours” setting.",
                time: "2019 - 2019",
                university: "4Geeks Academy"
              }
            ],
            experiences: [
              {
                company: "Startup Hubs, San Francisco",
                details: "Describe your role here lorem ipsum dolor sit amet, consectetuer\nadipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.\nCum sociis natoque penatibus et magnis dis parturient montes,\nnascetur ridiculus mus. Donec quam felis, ultricies nec,\npellentesque eu, pretium quis, sem. Nulla consequat massa quis\nenim. Donec pede justo. Sed ut perspiciatis unde omnis iste natus\nerror sit voluptatem accusantium doloremque laudantium, totam rem\naperiam, eaque ipsa quae ab illo inventore veritatis et quasi\narchitecto beatae vitae dicta sunt explicabo.\n  - Bullet point\n  - Bullet point\n",
                role: "Lead Developer",
                time: "2015 - Present"
              }
            ],
            projects: {
              assignments: [
                {
                  link: "Your Link",
                  tagline: "A responsive website template designed to help startups promote, market and sell their products.",
                  title: "Velocity"
                },
                {
                  link: "Your Link",
                  tagline: "A responsive website template designed to help web developers/designers market their services.",
                  title: "DevStudio"
                }
              ]
            },
            skills: {
              toolset: [
                {
                  level: "Medium",
                  name: "Python & Django"
                },
                {
                  level: "Advanced",
                  name: "Javascript & jQuery"
                },
                {
                  level: "Intermediate",
                  name: "Angular"
                },
                {
                  level: "Basic",
                  name: "HTML5 & CSS"
                },
                {
                  level: "Basic",
                  name: "Ruby on Rails"
                }
              ]
            },
            work_experience: null
          })   
    return (
        <>
        <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document" style={{marginLeft:"22rem"}}>
                <div className="modal-content" style={{width:"830px"}}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">PDF Viewer</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <PDFViewer width={800} height={500}>
                            <ExternalProfile node={contentPDF}/>
                        </PDFViewer>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
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
            <p className="text-center mt-4"><input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.replace(" ", "").toLowerCase())} placeHolder="Type student name to search" /></p>
            <ul>
                {
                    students
                        .filter(({ node }) => search === '' ? true : (node.basic_info.first_name + node.basic_info.last_name).toLowerCase().indexOf(search) > -1)
                        .map(({ node }, i) => (<li key={i} className="d-flex bd-highlight mb-3"><Link to={node.basic_info.github}>{node.basic_info.first_name + ' ' + node.basic_info.last_name}</Link> <button type="button" className="btn btn-primary ml-auto p-2 bd-highlight" data-toggle="modal" data-target="#exampleModal" onClick={() => setContentPDF(node)}>View in PDF</button></li>))
                }
            </ul>
        </div>
        </>
    );
};

export const query = graphql`
  query Index{
    sitePage{
        fields{
            today
        }
    }
    allStudentsYaml {
    edges {
      node {
        basic_info {
          github
          first_name
          last_name
          motto
          linkedin
          email
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
`;
