import React from 'react'
import { graphql } from 'gatsby';
import profile from '../online-cv/styles/profile.css';
import profile2 from '../online-cv/styles/profile2.css';
export default ({ data, pageContext })=> {

    const stud = data.studentsYaml;
     console.log({stud});
     const it = stud.basic_info.avatar;

        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 main-body p-0">
                        <div className="parallax" style={{backgroundImage: `url(${it})`}} id="section-top">
                                    <nav className="vertical-menu rounded">
                                        <ul className="rounded-bottom" id="leftNav">
                                            <li className="border-bottom">
                                                <a
                                                    href="#section-top"
                                                    className="section-top">
                                                    <img
                                                        src={stud.basic_info.avatar}
                                                        className="img-menu"
                                                        alt="Avatar"
                                                    />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-1">
                                                    <i className="fas fa-file-invoice fa-3x" /><span>SUMMARY</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-2">
                                                    <i className="fas fa-language fa-3x" /><span>LANGUAGES</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-3">
                                                    <i className="fas fa-bicycle fa-3x" /><span>INTERESTS</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-4">
                                                    <i className="fas fa-chart-line fa-3x" /><span>EXPERIENCES</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-5">
                                                    <i className="far fa-file-code fa-3x" /><span>PROJECTS</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-6">
                                                    <i className="far fa-star fa-3x" /><span>SKILLS</span>
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-7">
                                                    <i className="fas fa-graduation-cap fa-3x" /><span>EDUCATION</span>
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#section-8">
                                                    <i className="fas fa-user-alt fa-3x" /><span>CONTACT</span>
                                                </a>
                                            </li>
                                        </ul>
                                    </nav>
                                    <img
                                        src="https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/4geeks-icon-black.png"
                                        className="geeks-img float-right"
                                        alt="4Geeks Academy Icon Black."
                                    />

                        </div>
                        <div className="row">
                            <div className="col-12 text-center gradient">
                                <label className="name font-weight-normal">{stud.basic_info.first_name} <strong>{stud.basic_info.last_name}</strong></label>
                                <br/>
                                <label className="name-2 font-weight-light border-bottom">Full-Stack Developer</label>
                            </div>
                        </div>

                        <div className="container ">
                            <div className="row bubble-row">
                                <div className="col-12 col-md-6 text-center bubble-left">
                                    <div className="bubble text-center font-italic corner-bubble">
                                            <label className="font-weight-light">
                                                {stud.basic_info.motto}
                                            </label>
                                    </div>
                                        <label className="motto font-italic font-weight-light text-muted">
                                            Motto
                                        </label>
                                </div>
                                <div className="col-12 col-md-6 text-center bubble-right">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                        {stud.basic_info.focus}
                                        </label>
                                    </div>
                                    <label className="motto font-italic font-weight-light text-muted">
                                        Focus
                                    </label>
                                </div>
                            </div>
                            <section className="section-1" id="section-1">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-file-invoice text-warning icon-section-1" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            S&nbsp;u&nbsp;m&nbsp;m&nbsp;a&nbsp;r&nbsp;y
                                        </label>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <p className="p text-justify text-muted">
                                            {stud.basic_info.summary}
                                        </p>
                                    </div>
                                </div>
                            <hr className="border-bottom" />
                            </section>
                            <section className="section-2" id="section-2">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-language text-warning icon-section-2" />

                                        <label className="font-italic font-weight-light text-dark title ">
                                            L&nbsp;a&nbsp;n&nbsp;g&nbsp;u&nbsp;a&nbsp;g&nbsp;e&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <ul className="col-12 col-md-4">
                                        { Array.isArray(stud.basic_info.languages) ? stud.basic_info.languages.map((lang, i) =>
                                        (<li key={i}> Language: {lang.idiom} <span className="lang-desc">Level: ({lang.level})</span></li>)
                                        ):''}
                                    </ul>
                                </div>
                            <hr className="border-bottom" />
                            </section>
                            <section className="section-3" id="section-3">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-bicycle text-warning icon-section-3" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            I&nbsp;n&nbsp;t&nbsp;e&nbsp;r&nbsp;e&nbsp;s&nbsp;t&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <ul className="col-12 col-md-4 text-muted">
                                        { Array.isArray(stud.basic_info.interests) ? stud.basic_info.interests.map((inte, i) =>
                                        (<li key={i}> {inte.item} </li>)
                                        ):''}
                                    </ul>
                                </div>
                            <hr className="border-bottom" />
                            </section>
                            <section className="section-4" id="section-4">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-chart-line text-warning icon-section-4" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            E&nbsp;x&nbsp;p&nbsp;e&nbsp;r&nbsp;i&nbsp;e&nbsp;n&nbsp;c&nbsp;e&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                { Array.isArray(stud.experiences) ? stud.experiences.map((ex, i) =>
                                (<div key={i}>
                                    <div className="pt-4 pb-4 exp-border">
                                        <div className="card">
                                            <div class="row ">
                                                <div className="col-6">
                                                    <h2 className="pt-2 font-weight-bold exp-text text-uppercase">
                                                            {ex.role}
                                                    </h2>
                                                    <h2 className="text-muted exp-text">{ex.time}</h2>
                                                    <h2 className="text-muted font-weight-light exp-text">
                                                            {ex.company}
                                                    </h2>
                                                </div>
                                                <div className="col-2 border-side card-image">
                                                     <img
                                                        src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                        className="img-fluid  exp-img"
                                                        alt="..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-8">
                                                    <p className="p text-justify text-muted pt-4">
                                                        {ex.details}
                                                    </p>
                                                </div>
                                            </div>
                                         </div>
                                    </div>
                                </div>)):""}
                            </section>

                            <section className="section-5" id="section-5">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="far fa-file-code text-warning icon-section-5" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            P&nbsp;r&nbsp;o&nbsp;j&nbsp;e&nbsp;c&nbsp;t&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                { Array.isArray(stud.projects.assignments) ? stud.projects.assignments.map((as, i) =>
                                (<div key={i}>
                                    <div className="row py-4">
                                        <div className="col-12 col-md-4">
                                            <div className="row">
                                                <div className="col-12 col-sm-8">
                                                    <img
                                                        src={as.project_logo}
                                                        className="proj-img"
                                                        alt="..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="card-body pl-2">
                                                <h5 className="card-title">
                                                    <strong>{as.title}</strong>
                                                </h5>
                                                <h5 className="card-text text-info">
                                                    {as.link}
                                                </h5>
                                                <p className="card-text text-muted">
                                                    {as.tagline}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)):''}
                            </section>
                            <section className="section-6" id="section-6">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="far fa-star text-warning icon-section-6" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            S&nbsp;k&nbsp;i&nbsp;l&nbsp;l&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                { Array.isArray(stud.skills.toolset) ? stud.skills.toolset.map((skill, i) =>
                                (<div key={i}>
                                    <div className="row  justify-content-around pt-4">
                                        <div className="col-12 col-md-6 px-4">
                                            <div className="p-2">
                                                <label className="p font-weight-bold">
                                                    {skill.name}
                                                </label>
                                                <div className="progress">
                                                    <div
                                                        className="progress-bar"
                                                        role="progressbar"
                                                        aria-valuenow="25"
                                                        aria-valuemin="0"
                                                        aria-valuemax="100"
                                                        style={{width: skill.level}}>
                                                        {skill.level}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)):''}
                            <hr className="border-bottom" />
                            </section>

                            <section className="section-7" id="section-7">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-graduation-cap text-warning icon-section-7" />

                                        <span className="font-italic font-weight-light text-dark title">
                                            E&nbsp;d&nbsp;u&nbsp;c&nbsp;a&nbsp;t&nbsp;i&nbsp;o&nbsp;n
                                        </span>
                                    </div>
                                </div>
                                { Array.isArray(stud.education) ? stud.education.map((edu, i) =>
                                (<div key={i}>
                                    <div className="row pt-4">
                                        <div className="col-12 col-md-6">
                                            <div className="row">
                                                <div className="col-12">
                                                    <h2 className=" font-weight-bold edu-text">
                                                        {edu.degree}
                                                    </h2>
                                                    <h3 className="text-muted edu-text">
                                                        {edu.university}
                                                    </h3>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-5">
                                                    <img
                                                        src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                        className="image-education"
                                                        alt="..."
                                                    />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-sm-2">
                                                    <i className="far fa-clock fa-2x text-primary" />
                                                </div>
                                                <div className="col-12 col-sm-10">
                                                    <label className="years font-weight-bold text-muted">
                                                    {edu.time}
                                                    </label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                    <p className="p pt-4 text-justify text-muted">
                                                        {edu.details}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>)):''}

                            <hr className="border-bottom" />
                            </section>

                            <section className="section-8" id="section-8">
                                <div className="row pt-4">
                                    <div className="col-md-12 pr-0">
                                        <i className="fas fa-user-alt text-warning icon-section-8" />

                                        <label className="font-italic font-weight-light text-dark title">
                                            C&nbsp;o&nbsp;n&nbsp;t&nbsp;a&nbsp;c&nbsp;t
                                        </label>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12">
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1 ">
                                                <i className="fas fa-envelope fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.email}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-phone fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.phone}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-globe fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.website}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-linkedin fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.linkedin}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-github fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.github}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-twitter fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.twitter}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-stack-overflow fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    {stud.basic_info.stack_overflow}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



export const query = graphql`
  query ($github: String) {
    studentsYaml(basic_info: { github: { eq: $github } }) {

        basic_info{
            github
            first_name
            last_name
            motto
            focus
            website
            summary
            phone
            twitter
            linkedin
            phone
            avatar
            email
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