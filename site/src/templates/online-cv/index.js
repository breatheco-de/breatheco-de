import React from "react";
import { graphql } from 'gatsby';
import { useQueryParam, StringParam } from "use-query-params";
import * as translations from "./translation";

const empty = (value) => !value || typeof value === "undefined" || value === "";
const isArray = (value) => Array.isArray(value);
export default ({ data, pageContext}) => {
  const student = data.resumesYaml;
  const { basic_info, education, experiences, projects, skills } = student;
  const [skin, setSkin] = useQueryParam("theme", StringParam);
  const [lang, setLang] = useQueryParam("lang", StringParam);
  require(`./styles/skins/${skin || 'blue'}.scss`);
  return (
      <div>
        <div className="wrapper">
        <div className="main-wrapper">
              <section className="section summary-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-user fa-stack-1x fa-inverse"></i> </span>{ translations[lang || "en"]["Career Profile"]}</h2>
                 <div className="summary">
                    { !empty(basic_info.summary) ? basic_info.summary : "No profile summary provided" }
                 </div>
              </section>
              <section className="section experiences-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-briefcase fa-stack-1x fa-inverse"></i> </span> { translations[lang || "en"]["Experiences"]}</h2>
                 { experiences && Array.isArray(experiences) ? experiences.map((ex, i) =>
                     (<div key={i} className="item">
                        <div className="meta">
                           <div className="upper-row">
                              <h3 className="job-title">{ex.role}</h3>
                              <div className="time">{ex.time}</div>
                           </div>
                           <div className="company">{ex.company}</div>
                        </div>
                        { ex.details && <div className="details">{ex.details}</div> }
                    </div>))
                 : translations[lang || "en"]['No experiences specified']
                }
              </section>
              <section className="section projects-section">
            <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-archive fa-stack-1x fa-inverse"></i> </span> {translations[lang || "en"]["Projects"]}</h2>
                 <div className="intro">
                    <p>{projects ? projects.intro : translations[lang || "en"]["No projects speficied"]}</p>
                 </div>
                 {' '}{ projects && Array.isArray(projects.assignments) ? projects.assignments.map((as, i) =>
                     (<div key={i} className="item">
                        <span className="project-title">{as.title}</span>
                        - <span className="project-tagline">{as.tagline}</span>
                        { typeof as.link !== 'undefined' ? <a target="_blank" rel="noopener noreferrer" href={as.link} className="project-link">{translations[lang || "en"]["view live"]}</a>:''}
                    </div>)
                 ):''}
              </section>
              <section className="skills-section section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-wrench fa-stack-1x fa-inverse"></i> </span> {translations[lang || "en"]["Skills"]} &amp; {translations[lang || "en"]["Proficiency"]}</h2>
                 <div className="skillset">
                    { skills && isArray(skills.toolset) ? skills.toolset.map((skill, i) =>
                        (<div key={i} className="item">
                            <h3 className="level-title">{skill.name}</h3>
                            <div className="level-bar">
                                <div className="level-bar-inner" data-level="98%" style={{width: skill.level}}></div>
                            </div>
                        </div>)
                     ):translations[lang || "en"]['No skills specified']}
                 </div>
              </section>
           </div>
           <div className="sidebar-wrapper">
              <div className="profile-container">
                { !empty(basic_info.avatar) && <img className="avatar" src={basic_info.avatar} alt="profile" /> }
                <h1 className="name p-0">{ !empty(basic_info.first_name) ? basic_info.first_name + ' ' + basic_info.last_name : translations[lang || "en"]["No name"] }</h1>
                <h3 className="tagline">{ !empty(basic_info.motto) ? basic_info.motto : translations[lang || "en"]["No motto"] }</h3>
              </div>
              <div className="contact-container container-block">
                 <ul className="list-unstyled contact-list">
                    { !empty(basic_info.email) && <li className="email ml-0"><i className="fas fa-envelope"></i> <a href={"mailto:"+basic_info.email}>{basic_info.email}</a></li> }
                    { !empty(basic_info.phone) && <li className="phone ml-0"><i className="fas fa-phone"></i> <a href={`tel:`+basic_info.phone}>{basic_info.phone}</a></li> }
                    { !empty(basic_info.website) && <li className="website ml-0"><i className="fas fa-globe-americas"></i> <a href={basic_info.website} target="_blank" rel="noopener noreferrer">{basic_info.website}</a></li> }
                    { !empty(basic_info.linkedin) && <li className="linkedin ml-0"><i className="fab fa-linkedin"></i> <a href={`https://linkedin.com/in/${basic_info.linkedin}`} target="_blank" rel="noopener noreferrer">{ basic_info.linkedin }</a></li>}
                    { !empty(basic_info.twitter) && <li className="twitter ml-0"><i className="fab fa-twitter"></i> <a href={`https://twitter.com/${basic_info.twitter}`} target="_blank" rel="noopener noreferrer">@{ basic_info.twitter }</a></li> }
                    <li className="github ml-0"><i className="fab fa-github"></i> 
                        { !empty(basic_info.github) ?
                            <a href={"http://github.com/"+basic_info.github} target="_blank" rel="noopener noreferrer">github.com/{basic_info.github}</a>
                            :
                        <span>{translations[lang || "en"]["Missing github"]}</span>
                        }
                    </li>
                 </ul>
              </div>
              <div className="education-container container-block">
                 <h2 className="container-block-title"> {translations[lang || "en"]["Education"]}</h2>
                 { isArray(education) ? education.map((ed, i) =>
                     (<div key={i} className="item">
                        <h4 className="degree">{ed.degree}</h4>
                        <h5 className="meta">{ed.university}</h5>
                        <div className="time">{ed.time}</div>
                     </div>)
                 ):translations[lang || "en"]['No education provided']}
              </div>
              <div className="languages-container container-block">
                 <h2 className="container-block-title"> {translations[lang || "en"]["Languages"]}</h2>
                 <ul className="list-unstyled interests-list">
                 { isArray(basic_info.languages) ? basic_info.languages.map((lang, i) =>
                     (<li className="ml-0" key={i}> {lang.idiom} <span className="lang-desc">({lang.level})</span></li>)
                 ): translations[lang || "en"]['No languages provided']}
                 </ul>
              </div>
              <div className="interests-container container-block">
                 <h2 className="container-block-title"> {translations[lang || "en"]["Interests"]}</h2>
                 <ul className="list-unstyled interests-list">
                     { isArray(basic_info.interests) ? basic_info.interests.map((inte, i) =>
                         (<li className="ml-0" key={i}> {inte.item} </li>)
                     ): translations[lang || "en"]['No interests provided']}
                 </ul>
              </div>
           </div>
        </div>
      </div>
  );
};

export const query = graphql`
  query ($github: String) {
    resumesYaml(basic_info: { github: { eq: $github } }) {
        template
        skin
        basic_info{
            github
            first_name
            last_name
            motto
            website
            summary
            twitter
            linkedin
            avatar
            languages{
                idiom
                level
            }
            interests{
                item
            }
        }
        education{
            degree
            university
            time
            details
        }
        experiences{
            role
            company
            time
            details
        }
        projects{
            intro
            assignments{
                title
                tagline
                link
            }
        }
        skills{
            toolset{
                name
                level
            }
        }
    }
  }
`;