import React from "react"
import "../templates/online-cv/styles/index.css"
import "bootstrap/dist/css/bootstrap.css";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";


export default class Index extends React.Component{
    render(){
        return(
            <div className="container-fluid">
            <div className="row">
            <div className="col-12 col p-0">
                    <div className="row parallax" id="section-top">
                        <div className="col-2">
                            <nav className="vertical-menu">
                                <ul className="rounded">
                                    <li className="border-bottom">
                                        <a
                                            href="#section-top"
                                            className="section-top">
                                            <img
                                                src="https://frostsnow.com/uploads/biography/2016/12/19/xjason-statham.jpg.pagespeed.ic.mFhCmaxibX.jpg"
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
                                        <a href="#section-8">
                                            <i className="fas fa-graduation-cap fa-3x" />
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#section-9">
                                            <i className="fas fa-user-alt fa-3x" />
                                        </a>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="col-10">
                            <img
                                src="https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/4geeks-icon-black.png"
                                className="geeks-img float-right"
                                alt="..."
                            />
                        </div>
                    </div>
                    {/*names*/}
                    <div className="row gradient">
                        <div className="col-12 text-center m-0">
                                <label className="name font-weight-normal">JASON <strong>STATHAM</strong></label>
                                    <br/>
                                <label className="name-2 font-weight-light border-bottom">Full-Stack Developer</label>
                        {/*<hr className="line-horizontally"/>*/}
                        </div>
                    </div>
                    {/**/}
                    <div className="row">
                    <div className="col-12">
                    <div className="container">
                        <div className="row text-center">
                                <div className="col-12 col-md-6">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                            I like saving the world
                                        </label>
                                    </div>
                                    <label className="motto-text font-italic font-weight-light text-muted">
                                        Motto
                                    </label>
                                </div>
                                <div className="col-12 col-md-6">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                            Killing Bad Boys
                                        </label>
                                    </div>
                                    <label className="motto-text font-italic font-weight-light text-muted">
                                        Focus
                                    </label>
                                </div>
                        </div>
                        <section className="section-1" id="section-1">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-file-invoice text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;S&nbsp;u&nbsp;m&nbsp;m&nbsp;a&nbsp;r&nbsp;y
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12">
                                        <p className="p text-justify text-muted">
                                            Mision-driven full stack developer with a
                                            passion for thoughtful UI design,
                                            collaboration, and teaching.
                                        </p>
                                        <p className="p text-justify text-muted">
                                            I have always sought out opportunities and
                                            challenges that are meaningful to me.
                                            Although my professional path has taken many
                                            twists and turns-from touring and recording
                                            artist, to employee of the years at a
                                            non-profit, to dean is scholar at UPenn, to
                                            small business owner and entrepeneur - I
                                            have never stopped engaging my passion to
                                            help others and solve problems.
                                        </p>
                                        <p className="p text-justify text-muted">
                                            As a web developer, I enjoy using my
                                            obsessive attention to detail, my
                                            unequivocal love for making things, and my
                                            mission-driven work ethic to literally
                                            change the world. That is why I am excited
                                            to make a big impact at a high growth
                                            company
                                        </p>
                                    </div>
                                </div>
                        </section>
                        <hr className="border-bottom" />
                        <section className="section-2" id="section-2">
                                <div className="row mb-3 py-4">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-language text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;L&nbsp;a&nbsp;n&nbsp;g&nbsp;u&nbsp;a&nbsp;g&nbsp;e&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <h4 className="p">
                                            Idiom:
                                            <span className="text-muted p pl-2">
                                                English
                                            </span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p pl-2">Native</span>
                                        </h4>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <h4 className="p">
                                            Idiom:
                                            <span className="text-muted p pl-2">French</span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p pl-2">
                                                Professional
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <h4 className="p">
                                            Idiom:
                                            <span className="text-muted p pl-2">
                                                Spanish
                                            </span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p pl-2">
                                                Professional
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                        </section>
                        <hr className="border-bottom" />
                    </div>
                    </div>
                    </div>
            </div>
            </div>
            </div>
        );
    }
}
