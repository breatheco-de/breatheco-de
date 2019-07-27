import React from 'react'
import { graphql } from 'gatsby';

export default ({ data, pageContext })=> {
    const stud = data.studentsYaml;
        return (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 main-body p-0">
                        <div className="parallax" id="section-top">
                                    <nav className="vertical-menu rounded">
                                        <ul className="rounded-bottom">
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
                                                    <i className="fas fa-file-invoice fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-2">
                                                    <i className="fas fa-language fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-3">
                                                    <i className="fas fa-bicycle fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-4">
                                                    <i className="fas fa-chart-line fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-5">
                                                    <i className="far fa-file-code fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-6">
                                                    <i className="far fa-star fa-3x" />
                                                </a>
                                            </li>
                                            <li className="border-bottom">
                                                <a href="#section-7">
                                                    <i className="fas fa-graduation-cap fa-3x" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="#section-8">
                                                    <i className="fas fa-user-alt fa-3x" />
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

                        <div className="container">
                            <div className="row bubble-row">
                                <div className="col-12 col-md-6 text-center bubble-left">
                                    <div className="bubble text-center font-italic corner-bubble">
                                            <label className="font-weight-light">
                                                {stud.basic_info.motto}
                                            </label>
                                    </div>
                                        <label className="motto font-italic font-weight-light text-muted">
                                            {stud.basic_info.focus}
                                        </label>
                                </div>
                                <div className="col-12 col-md-6 text-center bubble-right">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                        Motto
                                        </label>
                                    </div>
                                    <label className="motto font-italic font-weight-light text-muted">
                                        Focus
                                    </label>
                                </div>
                            </div>
                            <section className="section-1" id="section-1">
                                <div className="row pt-4">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-file-invoice text-warning icon-section-1" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;S&nbsp;u&nbsp;m&nbsp;m&nbsp;a&nbsp;r&nbsp;y
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
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-language text-warning icon-section-2" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;L&nbsp;a&nbsp;n&nbsp;g&nbsp;u&nbsp;a&nbsp;g&nbsp;e&nbsp;s
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
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-bicycle text-warning icon-section-3" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;I&nbsp;n&nbsp;t&nbsp;e&nbsp;r&nbsp;e&nbsp;s&nbsp;t&nbsp;s
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
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-chart-line text-warning icon-section-4" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;E&nbsp;x&nbsp;p&nbsp;e&nbsp;r&nbsp;i&nbsp;e&nbsp;n&nbsp;c&nbsp;e&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                { Array.isArray(stud.experiences) ? stud.experiences.map((ex, i) =>
                                (<div key={i}>
                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-9 float-left">
                                            <h2 className="pt-2 font-weight-bold exp-text">
                                                {ex.role}
                                            </h2>
                                            <h2 className="text-muted exp-text">{ex.time}</h2>
                                            <h2 className="text-muted font-weight-light exp-text">
                                                {ex.company}
                                            </h2>
                                        </div>
                                    </div>
                                    <div className="col-12 col-sm-3 border-side">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="img-fluid w-100 exp-img"
                                            alt="..."
                                        />
                                    </div>
                                
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="p text-justify text-muted pt-4">
                                                {ex.details}
                                            </p>
                                        </div>
                                    </div>
                                </div>)):""}
                            </section>
                                      
                            <section className="section-5" id="section-5">
                                <div className="row pt-4">
                                    <div className="col-md-1 pr-0">
                                        <i className="far fa-file-code text-warning icon-section-5" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;P&nbsp;r&nbsp;o&nbsp;j&nbsp;e&nbsp;c&nbsp;t
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
                                                        src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
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
                                                    {as.intro}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>)):''}                                   
                            </section>
                            <section className="section-6" id="section-6">
                                <div className="row pt-4">
                                    <div className="col-md-1 pr-0">
                                        <i className="far fa-star text-warning icon-section-6" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;S&nbsp;k&nbsp;i&nbsp;l&nbsp;l&nbsp;s
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
                                                        style={{width: "98%"}}>
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
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-graduation-cap text-warning icon-section-7" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <span className="font-italic font-weight-light text-dark title">
                                            &nbsp;E&nbsp;d&nbsp;u&nbsp;c&nbsp;a&nbsp;t&nbsp;i&nbsp;o&nbsp;n
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
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-user-alt text-warning icon-section-8" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;C&nbsp;o&nbsp;n&nbsp;t&nbsp;a&nbsp;c&nbsp;t
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
    profileYaml(basic_info: { github: { eq: $github } }) {
        template
        skin
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