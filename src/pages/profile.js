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
                <div className="col-12">
                <div className="parallax">
                <div className="row">
                <div className="col-12 col-sm-2">
                <nav className="list-group vertical-menu">
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
                <div className="col-12 col-sm-10">
                <div className="row d-flex justify-content-end">
                    <div className="col-12 col-sm-2 text-right">
                        <img
                            src="https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/4geeks-icon-black.png"
                            className="geeks-img"
                            alt="..."
                        />
                    </div>
                </div>
                </div>
                </div>
                </div>
                <div className="row">
					<div className="col-12">
						<div className="d-flex flex-column text-center gradient">
							<div className="bd-highlight pt-4">
								<h1 className="display-4">
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
                </div>
                </div>
			</div>
		);
	}
}