import React from "react";
import { graphql } from 'gatsby';

export default ({ data }) => {
  const student = data.studentsYaml;
    require(`./styles/skins/${student.skin || 'blue'}.scss`);
  return (
      <div>
        <div className="wrapper">
           <div className="sidebar-wrapper">
              <div className="profile-container">
                 <img className="avatar" src="/online-cv/assets/images/profile.png" alt="profile" />
                 <h1 className="name">Alan Doe</h1>
                 <h3 className="tagline">Full Stack Developer</h3>
              </div>
              <div className="contact-container container-block">
                 <ul className="list-unstyled contact-list">
                    <li className="email"><i className="fas fa-envelope"></i> <a href="mailto:hello@webjeda.com">hello@webjeda.com</a></li>
                    <li className="phone"><i className="fas fa-phone"></i> <a href="tel:012 345 6789">012 345 6789</a></li>
                    <li className="website"><i className="fas fa-globe-americas"></i> <a href="http://blog.webjeda.com" target="_blank" rel="noopener noreferrer">blog.webjeda.com</a></li>
                    <li className="linkedin"><i className="fab fa-linkedin"></i> <a href="https://linkedin.com/in/alandoe" target="_blank" rel="noopener noreferrer">alandoe</a></li>
                    <li className="github"><i className="fab fa-github"></i> <a href="http://github.com/sharu725" target="_blank" rel="noopener noreferrer">{student.basic_info.github}</a></li>
                    <li className="twitter"><i className="fab fa-twitter"></i> <a href="https://twitter.com/@webjeda" target="_blank" rel="noopener noreferrer">@webjeda</a></li>
                 </ul>
              </div>
              <div className="education-container container-block">
                 <h2 className="container-block-title"> Education</h2>
                 <div className="item">
                    <h4 className="degree">MSc in Computer Science</h4>
                    <h5 className="meta">University of London</h5>
                    <div className="time">2011 - 2012</div>
                 </div>
                 <div className="item">
                    <h4 className="degree">BSc in Applied Mathematics</h4>
                    <h5 className="meta">Bristol University</h5>
                    <div className="time">2007 - 2011</div>
                 </div>
              </div>
              <div className="languages-container container-block">
                 <h2 className="container-block-title"> Languages</h2>
                 <ul className="list-unstyled interests-list">
                    <li> English <span className="lang-desc">(Native)</span></li>
                    <li> French <span className="lang-desc">(Professional)</span></li>
                    <li> Spanish <span className="lang-desc">(Professional)</span></li>
                 </ul>
              </div>
              <div className="interests-container container-block">
                 <h2 className="container-block-title"> Interests</h2>
                 <ul className="list-unstyled interests-list">
                    <li>Climbing</li>
                    <li>Snowboarding</li>
                    <li>Cooking</li>
                 </ul>
              </div>
              <div className="remove-container container-block">
                 <h2 className="container-block-title"> About Theme</h2>
                 <ul className="list-unstyled interests-list">
                    <a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/watch?v=Jnmj1dXDbNk">
                       <li>How to use?</li>
                    </a>
                 </ul>
              </div>
           </div>
           <div className="main-wrapper">
              <section className="section summary-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-user fa-stack-1x fa-inverse"></i> </span> Career Profile</h2>
                 <div className="summary">
                    <p>Summarise your career here lorem ipsum dolor sit amet, consectetuer adipiscing elit. You can . Aenean commodo ligula eget dolor aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu.</p>
                    <p>Second paragraph if required.</p>
                 </div>
              </section>
              <section className="section experiences-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-briefcase fa-stack-1x fa-inverse"></i> </span> Experiences</h2>
                 <div className="item">
                    <div className="meta">
                       <div className="upper-row">
                          <h3 className="job-title">Lead Developer</h3>
                          <div className="time">2015 - Present</div>
                       </div>
                       <div className="company">Startup Hubs, San Francisco</div>
                    </div>
                    <div className="details">
                       <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo. Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
                       <ul>
                          <li>Bullet point</li>
                          <li>Bullet point</li>
                       </ul>
                    </div>
                 </div>
                 <div className="item">
                    <div className="meta">
                       <div className="upper-row">
                          <h3 className="job-title">Senior Software Engineer</h3>
                          <div className="time">2014 - 2015</div>
                       </div>
                       <div className="company">Google, London</div>
                    </div>
                    <div className="details">
                       <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                       <ul>
                          <li>Bullet point</li>
                          <li>Bullet point</li>
                       </ul>
                    </div>
                 </div>
                 <div className="item">
                    <div className="meta">
                       <div className="upper-row">
                          <h3 className="job-title">UI Developer</h3>
                          <div className="time">2012 - 2014</div>
                       </div>
                       <div className="company">Amazon, London</div>
                    </div>
                    <div className="details">
                       <p>Describe your role here lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem.</p>
                       <ul>
                          <li>Bullet point</li>
                          <li>Bullet point</li>
                       </ul>
                    </div>
                 </div>
              </section>
              <section className="section projects-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-archive fa-stack-1x fa-inverse"></i> </span> Projects</h2>
                 <div className="intro">
                    <p>You can list your side projects or open source libraries in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>
                 </div>
                 <div className="item"> <span className="project-title"> <a href="#hook">Velocity</a> </span> - <span className="project-tagline">A responsive website template designed to help startups promote, market and sell their products.</span></div>
                 <div className="item"> <span className="project-title"> <a href="#asd">DevStudio</a> </span> - <span className="project-tagline">A responsive website template designed to help web developers/designers market their services.</span></div>
                 <div className="item"> <span className="project-title"> <a href="#asd">Tempo</a> </span> - <span className="project-tagline">A responsive website template designed to help startups promote their products or services and to attract users &amp; investors</span></div>
                 <div className="item"> <span className="project-title"> <a href="#asd">Atom</a> </span> - <span className="project-tagline">A comprehensive website template solution for startups/developers to market their mobile apps.</span></div>
                 <div className="item"> <span className="project-title"> <a href="#asd">Delta</a> </span> - <span className="project-tagline">A responsive Bootstrap one page theme designed to help app developers promote their mobile apps</span></div>
              </section>
              <section className="section publications-section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-file-alt fa-stack-1x fa-inverse"></i> </span> Publications</h2>
                 <div className="intro">
                    <p>You can list your publications in this section. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum et ligula in nunc bibendum fringilla a eu lectus.</p>
                 </div>
                 <div className="item">
                    <div className="publication-title">The Art of Computer Programming</div>
                    <div className="publication-authors">Donald E. Knuth</div>
                    <div className="publication-conference">Addison-Wesley, 1968</div>
                 </div>
                 <div className="item">
                    <div className="publication-title">Genetic Programming III: Darwinian Invention &amp; Problem Solving</div>
                    <div className="publication-authors">Koza, J.R., Andre, D., Bennett, F.H., Keane, M.A.</div>
                    <div className="publication-conference">Morgan Kaufmann Publishers Inc., San Francisco, CA, USA, 1st edn. (1999)</div>
                 </div>
                 <div className="item">
                    <div className="publication-title">A syntax directed compiler for Algol 60</div>
                    <div className="publication-authors">Edgar T. Irons</div>
                    <div className="publication-conference">Comm. ACM 4 (1961), 51–55</div>
                 </div>
              </section>
              <section className="skills-section section">
                 <h2 className="section-title"> <span className="fa-stack fa-xs"> <i className="fas fa-circle fa-stack-2x"></i> <i className="fas fa-wrench fa-stack-1x fa-inverse"></i> </span> Skills &amp; Proficiency</h2>
                 <div className="skillset">
                    <div className="item">
                       <h3 className="level-title">Python &amp; Django</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="98%" style={{width: "98%"}}></div>
                       </div>
                    </div>
                    <div className="item">
                       <h3 className="level-title">Javascript &amp; jQuery</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="98%" style={{width: "98%"}}></div>
                       </div>
                    </div>
                    <div className="item">
                       <h3 className="level-title">Angular</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="98%" style={{width: "98%"}}></div>
                       </div>
                    </div>
                    <div className="item">
                       <h3 className="level-title">HTML5 &amp; CSS</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="95%" style={{width: "95%"}}></div>
                       </div>
                    </div>
                    <div className="item">
                       <h3 className="level-title">Ruby on Rails</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="85%" style={{width: "85%"}}></div>
                       </div>
                    </div>
                    <div className="item">
                       <h3 className="level-title">Sketch &amp; Photoshop</h3>
                       <div className="level-bar">
                          <div className="level-bar-inner" data-level="60%" style={{width: "60%"}}></div>
                       </div>
                    </div>
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
        }
    }
  }
`;