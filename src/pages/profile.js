import React from 'react';
import "../templates/online-cv/styles/profile.css"
import "bootstrap/dist/css/bootstrap.css";
import ReactTooltip from "react-tooltip";
import { findDOMNode } from "react-dom";


export default class Profile extends React.Component {


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

	render() {
		const eduStyle = {
			width: "100%"
		};
		const pythonStyle = {
			width: "98%"
		};
		const angularStyle = {
			width: "98%"
		};

		const rubyStyle = {
			width: "85%"
		};

		const jsStyle = {
			width: "98%"
		};

		const htmlStyle = {
			width: "95%"
		};

		const skechStyle = {
			width: "60%"
		};
		return (
			<div className="container-fluid p-0">
				<div className="row">
					<div className="col-12 p-0">
                            {/*parallax vertical menu*/}
						<div className="parallax" id="section-top">
							<div className="row">
								<div className="col-2">
									<nav className="list-group text-center vertical-menu">
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
						</div>
                        {/*name*/}
                        <div className="row">
                            <div className="col-12">
                                <div className="d-flex flex-column text-center gradient">
                                    <div className="bd-highlight pt-4">
                                        <h1 className="text">
                                            JASON <strong>STATHAM</strong>
                                        </h1>
                                    </div>
                                    <div className="bd-highlight font-weight-light">
                                        <h3 className="font-weight-light">
                                            Full-Stack Developer
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </div>
				            <hr className="line-horizontally" />
                            {/*container*/}
                        <div className="container">
                            <div className="row text-center pt-4">
                                <div className="col-12 col-md-6">
                                    <div className="bubble text-center font-italic corner-bubble">
                                        <label className="font-weight-light">
                                            I like saving the world
                                        </label>
                                    </div>
                                    <label className="motto font-italic font-weight-light text-muted">
                                        Motto
                                    </label>
                                </div>
                                <div className="col-12 col-md-6">
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
                            <br />
                            <section id="section-1">
                                <div className="row mb-3 pt-4">
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
                            <section id="section-2">
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
                                            <span className="text-muted p">
                                                English
                                            </span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p">Native</span>
                                        </h4>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <h4 className="p">
                                            Idiom:
                                            <span className="text-muted p">French</span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p">
                                                Professional
                                            </span>
                                        </h4>
                                    </div>
                                    <div className="col-12 col-md-4">
                                        <h4 className="p">
                                            Idiom:
                                            <span className="text-muted p">
                                                Spanish
                                            </span>
                                        </h4>
                                        <h4 className="p">
                                            Level:
                                            <span className="text-muted p">
                                                Professional
                                            </span>
                                        </h4>
                                    </div>
                                </div>
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-3">
                                <div className="row mb-3 py-4">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-bicycle text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;I&nbsp;n&nbsp;t&nbsp;e&nbsp;r&nbsp;e&nbsp;s&nbsp;t&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row text-center">
                                    <div className="col-12 col-md-4 p text-muted">
                                        <h4>Climbing</h4>
                                    </div>
                                    <div className="col-12 col-md-4 p text-muted">
                                        <h4>Snowboarding</h4>
                                    </div>
                                    <div className="col-12 col-md-4 p text-muted">
                                        <h4>Cooking</h4>
                                    </div>
                                </div>
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-4">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-chart-line text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;E&nbsp;x&nbsp;p&nbsp;e&nbsp;r&nbsp;i&nbsp;e&nbsp;n&nbsp;c&nbsp;e&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-12 col-sm-9 float-left pt-4">
                                        <h2 className="pt-2 font-weight-bold">
                                            LEAD DEVELOPER
                                        </h2>
                                        <h2 className="text-muted">2015-Present</h2>
                                        <h2 className="text-muted font-weight-light">
                                            Startup Hubs, San Francisco
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 left-border">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="mx-auto geeks-logo"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col">
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
                                        <div className="col">
                                            <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                <div className="p-0 p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                                <div className="p-0 p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row">
                                    <div className="col-12 col-sm-9 float-left pt-4">
                                        <h2 className="pt-2 font-weight-bold">
                                            SENIOR SOFTWARE ENGINEER
                                        </h2>
                                        <h2 className="text-muted">2014-2015</h2>
                                        <h2 className="text-muted font-weight-light">
                                            Google, London
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 left-border">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="mx-auto float-right geeks-logo"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col">
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
                                            <div className="col">
                                                <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                    <div className="p-0 p bd-highlight text-muted">
                                                        -Bullet point
                                                    </div>
                                                    <div className="p-0 p bd-highlight text-muted">
                                                        -Bullet point
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row">
                                    <div className="col-12 col-sm-9 float-left pt-4">
                                        <h2 className="pt-2 font-weight-bold">
                                            UI DEVELOPER
                                        </h2>
                                        <h2 className="text-muted">2012-2014</h2>
                                        <h2 className="text-muted font-weight-light">
                                            Amazon, London
                                        </h2>
                                    </div>
                                    <div className="col-12 col-sm-3 left-border">
                                        <img
                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                            className="mx-auto float-right geeks-logo"
                                            alt="..."
                                        />
                                    </div>
                                    <div className="row">
                                        <div className="col">
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
                                        <div className="col">
                                            <div className="d-flex flex-column bd-highlight mb-3 pt-4">
                                                <div className="p-0 p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                                <div className="p-0 p bd-highlight text-muted">
                                                    -Bullet point
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-5">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="far fa-file-code text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;P&nbsp;r&nbsp;o&nbsp;j&nbsp;e&nbsp;c&nbsp;t
                                        </label>
                                    </div>
                                </div>

                                <div className="row pt-4">
                                    <div className="col-12 col-md-4">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="card-img-top"
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
                                            <p className="card-text text-card">
                                                <small className="text-muted text-card">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 left-border">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="card-img-top"
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
                                            <p className="card-text text-card">
                                                <small className="text-muted">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 left-border">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="card-img-top"
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
                                            <p className="card-text text-card">
                                                <small className="text-muted">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <hr className="border-bottom bg-info pt-1" />
                                <div className="row">
                                    <div className="col-12 col-md-4">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="card-img-top"
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
                                            <p className="card-text text-card">
                                                <small className="text-muted">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 left-border">
                                        <div className="row">
                                            <div className="col-12 col-sm-6">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="card-img-top"
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
                                            <p className="card-text text-card">
                                                <small className="text-muted">
                                                    A responsive website template
                                                    designed to help startup promote,
                                                    market and sell their products.
                                                </small>
                                            </p>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-4 left-border" />
                                </div>
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-6">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="far fa-star text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;S&nbsp;k&nbsp;i&nbsp;l&nbsp;l&nbsp;s
                                        </label>
                                    </div>
                                </div>
                                <div className="row  justify-content-around py-4">
                                    <div className="col-12 col-md-6 px-4">
                                        <div className="p-2">
                                            <label className="python font-weight-bold">
                                                Python &amp; Django
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={pythonStyle}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="python font-weight-bold">
                                                Angular
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={angularStyle}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="python font-weight-bold">
                                                Rubyon Rails
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={rubyStyle}>
                                                    85%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 left-border px-4">
                                        <div className="p-2">
                                            <label className="python">
                                                <strong>Javascript &amp;jQuery</strong>
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={jsStyle}>
                                                    98%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="python font-weight-bold">
                                                <strong>HTML5 &amp; CSS</strong>
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={htmlStyle}>
                                                    95%
                                                </div>
                                            </div>
                                        </div>
                                        <div className="p-2">
                                            <label className="python font-weight-bold">
                                                Sketch &amp; Potophop
                                            </label>
                                            <div className="progress">
                                                <div
                                                    className="progress-bar"
                                                    role="progressbar"
                                                    aria-valuenow="25"
                                                    aria-valuemin="0"
                                                    aria-valuemax="100"
                                                    style={skechStyle}>
                                                    60%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-8">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-graduation-cap text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <span className="font-italic font-weight-light text-dark title">
                                            &nbsp;E&nbsp;d&nbsp;u&nbsp;c&nbsp;a&nbsp;t&nbsp;i&nbsp;o&nbsp;n
                                        </span>
                                    </div>
                                </div>
                                <div className="row pt-4">
                                    <div className="col-12 col-md-6 px-4">
                                        <h2 className="pt-2 font-weight-bold">
                                            MSC IN COMPUTER SCIENCE
                                        </h2>
                                        <h3 className="text-muted">
                                            University of London
                                        </h3>
                                        <div className="row">
                                            <div className="col-12 col-sm-5">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="image-educcation"
                                                    style={eduStyle}
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-1">
                                                <i className="far fa-clock fa-2x text-primary pt-2" />
                                            </div>
                                            <div className="col-md-11">
                                                <span className="font-weight-bold text-muted pl-2 years">
                                                    2007-2011
                                                </span>
                                            </div>
                                        </div>
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
                                    <div className="col-12 col-md-6 px-4 left-border">
                                        <h2 className="pt-2 font-weight-bold">
                                            BSC IN APPLIED MATHEMATICS
                                        </h2>
                                        <h3 className="text-muted">
                                            Bristol Universit
                                        </h3>
                                        <div className="row">
                                            <div className="col-12 col-sm-5">
                                                <img
                                                    src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                    className="image-education"
                                                    style={eduStyle}
                                                    alt="..."
                                                />
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="col-md-1">
                                                <i className="far fa-clock fa-2x text-primary pt-2" />
                                            </div>
                                            <div className="col-md-11">
                                                <span className="font-weight-bold text-muted pl-2 years">
                                                    2007-2011
                                                </span>
                                            </div>
                                        </div>
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
                            </section>
                            <hr className="border-bottom" />
                            <section id="section-9">
                                <div className="row mb-3">
                                    <div className="col-md-1 pr-0">
                                        <i className="fas fa-user-alt text-warning icon" />
                                    </div>
                                    <div className="col-md-11 pl-0">
                                        <label className="font-italic font-weight-light text-dark title">
                                            &nbsp;C&nbsp;o&nbsp;n&nbsp;t&nbsp;a&nbsp;c&nbsp;t
                                        </label>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1 ">
                                                <i className="fas fa-envelope fa-2x p-2" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    jason@jasonstatham.com
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-phone fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    Phone: 234 2342 342
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fas fa-globe fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    jasonstatham.com
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-linkedin fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    linkein.com/in/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-github fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    github.com/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-twitter fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
                                                    twitter.com/jasonstatham
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row row-icons pt-2">
                                            <div className="col-12 col-sm-1">
                                                <i className="fab fa-stack-overflow fa-2x" />
                                            </div>
                                            <div className="col-12 col-sm-11">
                                                <label className="text-icon">
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