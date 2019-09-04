import React from "react";
import "../templates/online-cv/styles/profile.css"
import "bootstrap/dist/css/bootstrap.css";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";


export default class Home extends React.Component{
    componentDidMount() {
        let mainNavLinks = document.querySelectorAll("nav ul li a");
        let mainSections = document.querySelectorAll("main section");

        window.onscroll = event => {
            let fromTop = window.scrollY;

            mainNavLinks.forEach(link => {
                let section = document.querySelector(link.hash);

                if (
                    section.offsetTop <= fromTop &&
                    section.offsetTop + section.offsetHeight > fromTop
                ) {
                    link.classList.add("current");
                } else {
                    link.classList.remove("current");
                }
            });
        };
    }
    render(){
        return(
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
                                <label className="name font-weight-normal">JASON <strong>STATHAM</strong></label>
                                <br/>
                                <label className="name-2 font-weight-light border-bottom">Full-Stack Developer</label>
                            </div>
                        </div>

                        <div className="container">
                            <div className="row bubble-row">
                                <div className="col-12 col-md-6 text-center bubble-left">
                                    <div className="bubble text-center font-italic corner-bubble">
                                            <label className="font-weight-light">
                                                I like saving the world
                                            </label>
                                    </div>
                                        <label className="motto font-italic font-weight-light text-muted">
                                            Motto
                                        </label>
                                </div>
                                <div className="col-12 col-md-6 text-center bubble-right">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                            Killing Bad Boys
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
                                    <div className="col-12 col-md-4 text-muted">
                                        <h4 className="p">Climbing</h4>
                                    </div>
                                    <div className="col-12 col-md-4 text-muted">
                                        <h4 className="p">Snowboarding</h4>
                                    </div>
                                    <div className="col-12 col-md-4 hobbies text-muted">
                                        <h4 className="p">Cooking</h4>
                                    </div>
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
                                <div className="row pt-4">
                                    <div className="col-12 col-sm-9 float-left">
                                        <h2 className="pt-2 font-weight-bold exp-text">
                                            LEAD DEVELOPER
                                        </h2>
                                        <h2 className="text-muted exp-text">2015-Present</h2>
                                        <h2 className="text-muted font-weight-light exp-text">
                                            Startup Hubs, San Francisco
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 border-side">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="img-fluid w-100 exp-img"
                                            alt="..."
                                        />
                                    </div>
                                </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="p text-justify text-muted pt-4">
                                                Describe your role here lorem ipsum
                                                dolor sit amet, consetetuer adipiscing
                                                elit. Aenean commodo ligula eget dolor.
                                                Aenean massa. Cum soccis natoque
                                                penatibus el magnis dis paturrient
                                                montes, nascetur ridiculus mus. Donec
                                                quam felis, ultricies nec, pellentesque
                                                eu, pretium quis sem. Nulla consequat
                                                massa quis enim. Donec pede justo. Sed
                                                ut perspiciatis unde omnis iste natus
                                                error sit voluptamen accusantium
                                                doloremque laudantium, totam rem
                                                aperiam, eaque ipsa quae ab illo
                                                inventore veritatis et quasi architecto
                                                beatae vitae dicta sunt explicabo.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                <div className="p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                                <div className="p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row">
                                    <div className="col-12 col-sm-9 float-left">
                                        <h2 className="pt-2 font-weight-bold exp-text">
                                            SENIOR SOFTWARE ENGINEER
                                        </h2>
                                        <h2 className="text-muted exp-text">2014-2015</h2>
                                        <h2 className="text-muted font-weight-light exp-text">
                                            Google, London
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 border-side ">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="img-fluid w-100 exp-img"
                                            alt="..."
                                        />
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="p text-justify text-muted pt-4">
                                                Describe your role here lorem ipsum
                                                dolor sit amet, consetetuer adipiscing
                                                elit. Aenean commodo ligula eget dolor.
                                                Aenean massa. Cum soccis natoque
                                                penatibus el magnis dis paturrient
                                                montes, nascetur ridiculus mus. Donec
                                                quam felis, ultricies nec, pellentesque
                                                eu, pretium quis sem.
                                            </p>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="row">
                                            <div className="col-12">
                                                <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                    <div className="p bd-highlight text-muted">
                                                        -Bullet point
                                                    </div>
                                                    <div className="p bd-highlight text-muted">
                                                        -Bullet point
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row">
                                    <div className="col-12 col-sm-9 float-left">
                                        <h2 className="pt-2 font-weight-bold exp-text">
                                            UI DEVELOPER
                                        </h2>
                                        <h2 className="text-muted exp-text">2012-2014</h2>
                                        <h2 className="text-muted font-weight-light exp-text">
                                            Amazon, London
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 border-side">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="img-fluid w-100 exp-img"
                                            alt="..."
                                        />
                                    </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <p className="p text-justify text-muted pt-4">
                                                Describe your role here lorem ipsum
                                                dolor sit amet, consetetuer adipiscing
                                                elit. Aenean commodo ligula eget dolor.
                                                Aenean massa. Cum soccis natoque
                                                penatibus el magnis dis paturrient
                                                montes, nascetur ridiculus mus. Donec
                                                quam felis, ultricies nec, pellentesque
                                                eu, pretium quis sem.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                <div className=" p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                                <div className=" p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                            <hr className="border-bottom" />
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
                                                <strong>VELOCITY</strong>
                                            </h5>
                                            <h5 className="card-text text-info">
                                                #Velocity
                                            </h5>
                                            <p className="card-text text-muted">
                                                A responsive website template
                                                designed to help startup promote,
                                                market and sell their products.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 border-side">
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
                                                <strong>DEVSTUDIO</strong>
                                            </h5>
                                            <h5 className="card-text text-info">
                                                #Devstudio
                                            </h5>
                                            <p className="card-text">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 border-side">
                                        <div className="row">
                                            <div className="col-12 col-sm-8">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className=" proj-img"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body pl-2">
                                            <h5 className="card-title">
                                                <strong>TEMP0</strong>
                                            </h5>
                                            <h5 className="card-text text-info">
                                                #Tempo
                                            </h5>
                                            <p className="card-text">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row pt-4">
                                    <div className="col-12 col-md-4">
                                        <div className="row">
                                            <div className="col-12 col-sm-8">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className=" proj-img"
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="card-body pl-2">
                                            <h5 className="card-title">
                                                <strong>ATOM</strong>
                                            </h5>
                                            <h5 className="card-text text-info">
                                                #Atom
                                            </h5>
                                            <p className="card-text">

                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.

                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 border-side">
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
                                                <strong>DELTA</strong>
                                            </h5>
                                            <h5 className="card-text text-info">
                                                #Delta
                                            </h5>
                                            <p className="card-text">

                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.

                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 border-side" />
                                </div>
                            <hr className="border-bottom" />
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
                                <div className="row  justify-content-around pt-4">
                                    <div className="col-12 col-md-6 px-4">
                                        <div className="p-2">
                                            <label className="p font-weight-bold">
                                                Python &amp; Django
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "98%"}}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="p font-weight-bold">
                                                Angular
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "98%"}}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="p font-weight-bold">
                                                Rubyon Rails
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "85%"}}>
                                                    85%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 border-side px-4">
                                        <div className="p-2">
                                            <label className="p">
                                                <strong>Javascript &amp;jQuery</strong>
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "98%"}}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="p">
                                                <strong>HTML5 &amp; CSS</strong>
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "95%"}}>
                                                    95%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="p font-weight-bold">
                                                Sketch &amp; Potophop
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={{width: "60%"}}>
                                                    60%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                <div className="row pt-4">
                                    <div className="col-12 col-md-6">
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className=" font-weight-bold edu-text">
                                                    MSC IN COMPUTER SCIENCE
                                                </h2>
                                                <h3 className="text-muted edu-text">
                                                    University of London
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
                                                    2007-2011
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="p pt-4 text-justify text-muted">
                                                    Describe your role here lorem ipsum dolor
                                                    sit amet, consetetuer adipiscing elit.
                                                    Aenean commodo ligula eget dolor. Aenean
                                                    massa. Cum soccis natoque penatibus el
                                                    magnis dis paturrient montes, nascetur
                                                    ridiculus mus. Donec quam felis, ultricies
                                                    nec, pellentesque eu, pretium quis sem.
                                                </p>
                                                <span className="text-muted p">
                                                    -Bullet point
                                                </span>
                                                <br />
                                                <span className="text-muted p">
                                                    -Bullet point
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 BSC-col border-side">
                                        <div className="row">
                                            <div className="col-12">
                                                <h2 className="font-weight-bold edu-text">
                                                    BSC IN APPLIED MATHEMATICS
                                                </h2>
                                                <h3 className="text-muted edu-text">
                                                    Bristol Universit
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
                                                    2007-2011
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-12">
                                                <p className="p pt-4 text-justify text-muted">
                                                    Describe your role here lorem ipsum dolor
                                                    sit amet, consetetuer adipiscing elit.
                                                    Aenean commodo ligula eget dolor. Aenean
                                                    massa. Cum soccis natoque penatibus el
                                                    magnis dis paturrient montes, nascetur
                                                    ridiculus mus. Donec quam felis, ultricies
                                                    nec, pellentesque eu, pretium quis sem.
                                                </p>
                                                <span className="text-muted p">
                                                    -Bullet point
                                                </span>
                                                <br />
                                                <span className="text-muted p">
                                                    -Bullet point
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
                                                    jason@jasonstatham.com
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-phone fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    Phone: 234 2342 342
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-globe fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    jasonstatham.com
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-linkedin fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    linkein.com/in/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-github fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    github.com/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-twitter fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    twitter.com/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-stack-overflow fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-cont">
                                                    123456 / alandoe
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
}
