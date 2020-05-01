import React, { useState } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faPalette, faGraduationCap, faPlusCircle, faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
//import { PDFViewer } from '@react-pdf/renderer';
//import ExternalProfile from "./PDF";
import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.css";

const shareURL = (text, url='') => `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${url}`;

const clean = (url)=> {
    if(!url) return null;
    url = url.trim();
    if(typeof(url) !== "string") return null;
    if(url.indexOf("alesanchezr") > -1) return null;
    if(url.indexOf("asd") > -1) return null;
    if(url.indexOf(".") === -1) return null;
    if(url.indexOf(" ") > -1) return null;
    return url.replace(/https?:\/\//, "");
}

const cleanLn = (url)=> {
    if(!url) return null;
    url = url.trim();
    if(url.indexOf("http") === -1) return null;
    if(url.indexOf("alesanchezr") > -1) return null;
    return url.replace(/https?:\/\//, "");
}

export default ({ data }) => {
    const students = data.allResumesYaml.edges;
    const [search, setSearch] = useState('');
    const [addYourself, setAddYourself] = useState(false);
    const [showModal, setShowModal] = useState({
        class: '',
        ariaModal: 'false',
        ariaHidden: 'true',
        style: {
            display: "none"
        }
    })
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
        }
    })

    /* function onClickPdf(node) {
        setShowModal({
            class: "show",
            ariaModal: "true",
            ariaHidden: "false",
            style: {
                display: "block"
            }
        })
        if (node != null) {
            setContentPDF(node)
        }
    } */
    return (
        <>
        <div className={"modal fade " + showModal.class} id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden={showModal.ariaHidden} aria-modal={showModal.ariaModal} style={showModal.style}>
            <div className="modal-dialog" role="document" style={{ marginLeft: "22rem" }}>
                <div className="modal-content" style={{ width: "830px" }}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Resume</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => setShowModal({
                            class: '',
                            ariaModal: 'false',
                            ariaHidden: 'true',
                            style: {
                                display: "none"
                            }
                        })}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {/* <PDFViewer width={800} height={500}>
                            <ExternalProfile node={contentPDF} />
                        </PDFViewer> */}
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={() => setShowModal({
                            class: '',
                            ariaModal: 'false',
                            ariaHidden: 'true',
                            style: {
                                display: "none"
                            }
                        })}>Close</button>
                    </div>
                </div>
            </div>
        </div>
        <div className="container">
            <div className="row mt-5">  
                <div className="col-12 col-sm-8">
                    <h1><FontAwesomeIcon icon={faGraduationCap} /> Learn in Public</h1>
                    <p className="m-0 mb-1">Learning to code is hard, why do it alone? Share your profile, acomplishments and frustrations with the rest of 4Geeks's community!</p>
                    <ul className="m-0 p-0">
                        <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://www.100daysofcode.com/">100DaysOfCode.com</a></li>
                        <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://www.swyx.io/writing/learn-in-public/">Why Learn in Public</a></li>
                        <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://twitter.com/search?q=%23100DaysOfCode">#100DaysOfCode</a></li>
                    </ul>
                    <small>This project was last built: <strong>{moment(data.sitePage.fields.today).fromNow()}</strong></small>
                </div> 
                <div className="col-12 col-sm-4 text-right">
                    <button className="btn btn-lg btn-light mb-2 w-100" onClick={() => setAddYourself(true)}><FontAwesomeIcon className="text-success" icon={faPlusCircle} /> Add yourself to this list</button>
                    <a className="btn btn-lg btn-primary w-100" href={shareURL("I am publicly committing to the #100DaysOfCode with @4GeeksAcademy!")}><FontAwesomeIcon icon={faShareAlt} /> Share your commitment</a>
                </div> 
            </div>
            
            { addYourself && <div className="bg-light p-4 mt-3">
                <h3 className="mb-3">How can you add yourself to this list?</h3>
                <div className="row">
                    <div className="col">
                        <h4><span className="number">1</span> Create a student YML</h4>
                        <p className="pl-4">The student information is stored in [YML format](https://www.youtube.com/watch?v=cdLNKUoMc6c) inside <a href="https://github.com/4GeeksAcademy/About-4Geeks-Academy/tree/master/site/resumes" rel="noopener noreferrer" target="_blank">this folder</a>, you have to copy the file content and adapt to your own information, use <a href="https://github.com/4GeeksAcademy/About-4Geeks-Academy/blob/master/site/resumes/example.yml" rel="noopener noreferrer" target="_blank">this YML</a> as an example.</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4><span className="number">2</span> Validate your YML</h4>
                        <p className="pl-4">Before submiting your YML, validate the content using this tool: <a href="http://www.yamllint.com/" rel="noopener noreferrer" target="_blank">Yaml Lint</a></p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4><span className="number">3</span> Create a Pull Request (PR)</h4>
                        <p className="pl-4">Fork <a href="https://github.com/4GeeksAcademy/About-4Geeks-Academy">this repository</a> and create your student file under the resumes folder </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <h4><span className="number">4</span> Wait for it!</h4>
                        <p className="pl-4">It takes a few minutes to complete, you can follow the status on your pull request conversation, you can also check if your commit is showing alreading on the main repository <a target="_blank" rel="noopener noreferrer" href="https://github.com/4GeeksAcademy/student-external-profile/commits/master">commits history</a> and your pull request should have a ✅ green check on the <a target="_blank" rel="noopener noreferrer" href="https://github.com/4GeeksAcademy/About-4Geeks-Academy/actions?query=workflow%3A%22Testing+for+Errors%22"> repository list of completed actions</a>.</p>
                    </div>
                </div>
                <button className="btn btn-primary w-100" onClick={() => setAddYourself(false)}>Close this Instructions</button>
            </div>}
            <p className="text-center mt-4"><input type="text" className="form-control" onChange={(e) => setSearch(e.target.value.replace(" ", "").toLowerCase())} placeholder="Type student name to search" /></p>
            <div className="students">
            {
                students
                    .filter(({ node }) => search === '' ? true : (node.basic_info.first_name + node.basic_info.last_name).toLowerCase().indexOf(search) > -1)
                    .map(({ node }, i) => {
                        const _website = clean(node.basic_info.website);
                        const _linkedin = cleanLn(node.basic_info.linkedin);
                        return(
                            <div key={i} className="row mb-2">
                                <div className="col-6">
                                    <p>{node.basic_info.first_name + ' ' + node.basic_info.last_name}</p>
                                    <small className="motto">{node.basic_info.motto}</small>
                                </div>
                                <div className="col-6 text-right">
                                    { _website && <a href={`https://${_website}`} rel="noopener noreferrer" target="_blank" className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faPalette} /> <span className="d-none d-sm-inline-block">Portfolio</span></a> }
                                    { node.basic_info.twitter && <a href={`https://github.com/${node.basic_info.github}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faTwitter} /></a> }
                                    { _linkedin && <a href={`https://${_linkedin}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faLinkedin} /></a> }
                                    <Link to={node.basic_info.github} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faFile} /> <span className="d-none d-sm-inline-block">HTML</span></Link> 
                                    { node.basic_info.github && <a href={`https://github.com/${node.basic_info.github}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faGithub} /></a> }
                                </div>
                            {/* <button type="button" className="btn btn-primary ml-1" data-toggle="modal" data-target="#exampleModal" onClick={() => onClickPdf(node)}>View in PDF</button> */}
                        </div>)
                    })
                }
            </div>
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
    allResumesYaml {
    edges {
      node {
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
`;