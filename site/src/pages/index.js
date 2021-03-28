import React, { useState, useEffect } from "react";
import Link from 'gatsby-link';
import { graphql } from 'gatsby';
import moment from "moment";
import Share from "../components/share.js";
import Layout from "../components/layout.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFile, faPalette, faGraduationCap, faPlusCircle, faShareAlt, faFilePdf } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import "../styles/home.css";
import "bootstrap/dist/css/bootstrap.css";
import { Button,Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


const clean = (url) => {
  if (!url) return null;
  url = url.trim();
  if (typeof (url) !== "string") return null;
  if (url.indexOf("alesanchezr") > -1) return null;
  if (url.indexOf("asd") > -1) return null;
  if (url.indexOf(".") === -1) return null;
  if (url.indexOf(" ") > -1) return null;
  return url.replace(/https?:\/\//, "");
}

const cleanLn = (url) => {
  if (!url) return null;
  url = url.trim();
  if (url.indexOf("http") === -1) return null;
  if (url.indexOf("alesanchezr") > -1) return null;
  return url.replace(/https?:\/\//, "");
}

export default ({ data }) => {
  const students = data.allResumesYaml.edges;
  const [search, setSearch] = useState('');
  const [addYourself, setAddYourself] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [template, setTemplate] = useState({
    lang: '',
    color: ''
  })
  const [link, setLink] = useState('');
  const [isLink, setIsLink] = useState(false)
  const [activeLang, setActiveLang] = useState({ en: false, es: false });
  const [activeColor, setActiveColor] = useState({ white: false, orange: false });
  const [modal, setModal] = useState(false);
  const [github, setGitHub] = useState('');
  const [mode, setMode] = useState('')

  function onClickLanguage(e) {
    let element = e.target.id
    if (element === 'en') {
      setActiveLang({ en: true, es: false })
      setTemplate({ ...template, lang: 'en' })
    } else if (element === 'es') {
      setActiveLang({ en: false, es: true })
      setTemplate({ ...template, lang: 'es' })
    }
  }

  function onClickTheme(e) {
    let element = e.target.id
    if (element === 'white') {
      setActiveColor({ white: true, orange: false })
      setTemplate({ ...template, color: 'white' })
    } else if (element === 'orange') {
      setActiveColor({ white: false, orange: true })
      setTemplate({ ...template, color: 'orange' })
    }
  }
  useEffect(() => {
    if (template.color !== '' && template.lang !== '') {
      setLink('?' + 'lang=' + template.lang + '&' + 'theme=' + template.color)
      setIsLink(true);
    }
  }, [link, template])

  return (
    <Layout>
      <Share message={"I am publicly committing to the #100DaysOfCode with @4GeeksAcademy!"} url={"https://sep.4geeksacademy.co/"} hide={!showShare} onClose={() => setShowShare(false)} />
      <Modal isOpen={modal} toggle={() => setModal(!modal)} >
        <ModalHeader toggle={() => setModal(!modal)}>Preferences for {github}</ModalHeader>
        <ModalBody>
          <div className="row">
            <div className="col-12">
            <p>This preferences will set your PDF/Profile in a more personalized way so you can share with others your awesome skills</p>
            <p>All you have to do is <span className="badge badge-dark p-2 mr-1">choose</span>a language and theme and go to the generated link.</p>
            </div>
          </div>
          <div className="row">
            <div className="col-6 text-center">
              <p>Language</p>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={activeLang.en ? "btn btn-light ml-2 bd-highlight active" : "btn btn-light ml-2 bd-highlight"} onClick={(e) => onClickLanguage(e)} id='en'>English</button>
                <button type="button" className={activeLang.es ? "btn btn-light ml-2 bd-highlight active" : "btn btn-light ml-2 bd-highlight"} onClick={(e) => onClickLanguage(e)} id='es'>Spanish</button>
              </div>
            </div>
            <div className="col-6 text-center">
              <p >Theme</p>
              <div className="btn-group" role="group" aria-label="Basic example">
                <button type="button" className={activeColor.white ? "btn btn-light ml-2 bd-highlight active" : "btn btn-light ml-2 bd-highlight"} onClick={(e) => onClickTheme(e)} id='white'>White</button>
                <button type="button" className={activeColor.orange ? "btn btn-light ml-2 bd-highlight active" : "btn btn-light ml-2 bd-highlight orange"} onClick={(e) => onClickTheme(e)} id='orange'>Orange</button>
              </div>
            </div>
          </div>
          <div className="row mt-3">
            <div className="col-12 text-center">
            {isLink && mode === 'pdf' ? <Link to={github + '/'+ mode + link} className="btn btn-primary bd-highlight w-100"><FontAwesomeIcon icon={faFilePdf} /> <span className="d-none d-sm-inline-block">Go to PDF</span></Link> : isLink && <Link to={github + '/'+ mode + link} className="btn btn-primary bd-highlight w-100"><FontAwesomeIcon icon={faFile} /> <span className="d-none d-sm-inline-block">Go to HTML</span></Link>}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button className="btn btn-light ml-2 bd-highlight" onClick={() => setModal(!modal)}>Cancel</Button>
        </ModalFooter>
      </Modal>
      <div className="container">
        <div className="row mt-5">
          <div className="col-12 col-sm-8">
            <h1><FontAwesomeIcon icon={faGraduationCap} /> Learn in Public</h1>
            <p className="m-0 mb-1">Learning to code is hard, why do it alone? Share your profile, acomplishments and frustrations with the rest of 4Geeks community!</p>
            <ul className="m-0 p-0">
              <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://www.100daysofcode.com/">100DaysOfCode.com</a></li>
              <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://www.swyx.io/writing/learn-in-public/">Why Learn in Public</a></li>
              <li className="badge badge-dark p-2 mr-1"><a rel="noopener noreferrer" target="_blank" href="https://twitter.com/search?q=%23100DaysOfCode">#100DaysOfCode</a></li>
            </ul>
            <small>This project was last built: <strong>{moment(data.sitePage.fields.today).fromNow()}</strong></small>
          </div>
          <div className="col-12 col-sm-4 text-right">
            <button className="btn btn-lg btn-light mb-2 w-100" onClick={() => setAddYourself(true)}><FontAwesomeIcon className="text-success" icon={faPlusCircle} /> Add yourself to this list</button>
            <button className="btn btn-lg btn-primary w-100" onClick={() => setShowShare(true)}><FontAwesomeIcon icon={faShareAlt} /> Share your commitment</button>
          </div>
        </div>

        {addYourself && <div className="bg-light p-4 mt-3 instructions">
          <h3 className="mb-3">How can you add yourself to this list?</h3>
          <div className="row">
            <div className="col">
              <h4><span className="number">1</span> Create a student YML</h4>
              <p className="pl-4">The student information is stored in <a rel="noopener noreferrer" target="_blank" href="https://www.youtube.com/watch?v=cdLNKUoMc6c">YML format</a> inside <a href="https://github.com/4GeeksAcademy/About-4Geeks-Academy/tree/master/site/resumes" rel="noopener noreferrer" target="_blank">this folder</a>, you have to copy the file content and adapt to your own information, use <a href="https://github.com/4GeeksAcademy/About-4Geeks-Academy/blob/master/site/resumes/example.yml" rel="noopener noreferrer" target="_blank">this YML</a> as an example.</p>
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
                .filter(({ node }) => search === '' ? true : typeof(node.basic_info) !== "object" ? false : ((node.basic_info.first_name || "") + (node.basic_info.last_name || "")).toLowerCase().indexOf(search) > -1)              
                .map(({ node }, i) => {
                const _website = clean(node.basic_info.website);
                const _linkedin = cleanLn(node.basic_info.linkedin);
                return (
                  <div key={i} className="row mb-2">
                    <div className="col-6">
                      <p>{node.basic_info.first_name + ' ' + node.basic_info.last_name}</p>
                      <small className="motto">{node.basic_info.motto}</small>
                    </div>
                    <div className="col-6 text-right">
                      {_website && <a href={`https://${_website}`} rel="noopener noreferrer" target="_blank" className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faPalette} /> <span className="d-none d-sm-inline-block">Portfolio</span></a>}
                      {node.basic_info.twitter && <a href={`https://github.com/${node.basic_info.github}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faTwitter} /></a>}
                      {_linkedin && <a href={`https://${_linkedin}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faLinkedin} /></a>}
                      <Button className="btn btn-light ml-2 bd-highlight" onClick={() => {setGitHub(node.basic_info.github);setModal(!modal); setMode('profile')}}>
                        <FontAwesomeIcon icon={faFile} /> <span className="d-none d-sm-inline-block">HTML</span>
                      </Button>
                      <Button className="btn btn-light ml-2 bd-highlight" onClick={() => {setGitHub(node.basic_info.github);setModal(!modal); setMode('pdf')}}>
                        <FontAwesomeIcon icon={faFilePdf} /> <span className="d-none d-sm-inline-block">PDF</span>
                      </Button>
                      {node.basic_info.github && <a href={`https://github.com/${node.basic_info.github}`} className="btn btn-light ml-2 bd-highlight"><FontAwesomeIcon icon={faGithub} /></a>}
                    </div>
                  </div>)
              })
          }
        </div>
      </div>
    </Layout>
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
