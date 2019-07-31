import React from "react";
import { graphql } from 'gatsby';

export default ({ data, pageContext }) => {
  const student = data.studentsYaml;
  const { basic_info, education, experiences, projects, skills } = student;
    require(`./styles/skins/${student.skin || 'blue'}.scss`);
  return (
      <div>
        <div className="wrapper">
           <div className="sidebar-wrapper">
              <div className="profile-container">
                 <img className="avatar" src={basic_info.avatar} alt="profile" />
                 <h1 className="name">{ basic_info.first_name + ' ' + basic_info.last_name }</h1>
                 <h3 className="tagline">{ basic_info.motto }</h3>
              </div>
              <div className="contact-container container-block">
                 <ul className="list-unstyled contact-list">
                    { typeof basic_info.email !== 'undefined' ?
                        <li className="email"><i className="fas fa-envelope"></i> <a href={"mailto:"+basic_info.email}>{basic_info.email}</a></li>:''
                    }
                    { typeof basic_info.phone !== 'undefined' ?
                        <li className="phone"><i className="fas fa-phone"></i> <a href={`tel:`+basic_info.phone}>{basic_info.phone}</a></li>:''
                    }
                    { typeof basic_info.website !== 'undefined' ?
                        <li className="website"><i className="fas fa-globe-americas"></i> <a href={basic_info.website} target="_blank" rel="noopener noreferrer">{basic_info.website}</a></li>:''
                    }
                    { typeof basic_info.linkedin !== 'undefined' ?
                        <li className="linkedin"><i className="fab fa-linkedin"></i> <a href={`https://linkedin.com/in/${basic_info.linkedin}`} target="_blank" rel="noopener noreferrer">{ basic_info.linkedin }</a></li> : ''
                    }
                    { typeof basic_info.twitter !== 'undefined' ?
                        <li className="twitter"><i className="fab fa-twitter"></i> <a href={`https://twitter.com/${basic_info.twitter}`} target="_blank" rel="noopener noreferrer">@{ basic_info.twitter }</a></li>:''
                    }
                    <li className="github"><i className="fab fa-github"></i> <a href={"http://github.com/"+basic_info.github} target="_blank" rel="noopener noreferrer">github.com/{basic_info.github}</a></li>
                 </ul>
              </div>
              <div className="education-container container-block">
                 <h2 className="container-block-title"> Education</h2>
                 { Array.isArray(education) ? education.map((ed, i) =>
                     (<div key={i} className="item">
                        <h4 className="degree">{ed.degree}</h4>
                        <h5 className="meta">{ed.university}</h5>
                        <div className="time">{ed.time}</div>
                     </div>)
                 ):''}
              </div>
              <div className="languages-container container-block">
                 <h2 className="container-block-title"> Languages</h2>
                 <ul className="list-unstyled interests-list">
                 { Array.isArray(basic_info.languages) ? basic_info.languages.map((lang, i) =>
                     (<li key={i}> {lang.idiom} <span className="lang-desc">({lang.level})</span></li>)
                 ):''}
                 </ul>
              </div>
              <div className="interests-container container-block">
                 <h2 className="container-block-title"> Interests</h2>
                 <ul className="list-unstyled interests-list">
                     { Array.isArray(basic_info.interests) ? basic_info.interests.map((inte, i) =>
                         (<li key={i}> {inte.item} </li>)
                     ):''}
                 </ul>
              </div>
           </div>
           <div className="main-wrapper">
              <section className="section summary-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-user fa-stack-1x fa-inverse"></i> </span> Career Profile</h2>
                 <div className="summary">
                    { basic_info.summary }
                 </div>
              </section>
              <section className="section experiences-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-briefcase fa-stack-1x fa-inverse"></i> </span> Experiences</h2>
                 { Array.isArray(experiences) ? experiences.map((ex, i) =>
                     (<div key={i} className="item">
                        <div className="meta">
                           <div className="upper-row">
                              <h3 className="job-title">{ex.role}</h3>
                              <div className="time">{ex.time}</div>
                           </div>
                           <div className="company">{ex.company}</div>
                        </div>
                        { ex.details && <div className="details">{ex.details}</div> }
                    </div>)
                 ):''}
              </section>
              <section className="section projects-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-archive fa-stack-1x fa-inverse"></i> </span> Projects</h2>
                 <div className="intro">
                    <p>{projects.intro}</p>
                 </div>
                 {' '}{ Array.isArray(projects.assignments) ? projects.assignments.map((as, i) =>
                     (<div key={i} className="item">
                        <span className="project-title">{as.title}</span>
                        - <span className="project-tagline">{as.tagline}</span>
                        { typeof as.link !== 'undefined' ? <a target="_blank" rel="noopener noreferrer" href={as.link} className="project-link">view live</a>:''}
                    </div>)
                 ):''}
              </section>
              <section className="skills-section section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-wrench fa-stack-1x fa-inverse"></i> </span> Skills &amp; Proficiency</h2>
                 <div className="skillset">
                    { Array.isArray(skills.toolset) ? skills.toolset.map((skill, i) =>
                        (<div key={i} className="item">
                            <h3 className="level-title">{skill.name}</h3>
                            <div className="level-bar">
                                <div className="level-bar-inner" data-level="98%" style={{width: skill.level}}></div>
                            </div>
                        </div>)
                     ):''}
                 </div>
              </section>
           </div>
        </div>
      </div>
  );
};

export const query = graphql`
  query ($github: String) {
    studentsYaml(basic_info: { github: { eq: $github } }) {
        template
        skin
        basic_info{
            github
            first_name
            last_name
            motto
            website
            summary
            phone
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