import React from 'react';
import "../templates/online-cv/styles/profile2.css"
import "bootstrap/dist/css/bootstrap.css";

export default class Profile2 extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 p-0">
                        <div className="parallax">
                            <nav className="vertical-menu">
                                <ul className="pointer">
                                    <li className="border-bottom">
                                        <a href="#section-top"
                                            className="section-top">
                                            <img
                                                src="https://frostsnow.com/uploads/biography/2016/12/19/xjason-statham.jpg.pagespeed.ic.mFhCmaxibX.jpg"
                                                className="img-menu"
                                                alt="Avatar"
                                                />
                                        </a>
                                    </li>
                                    <li className="border-bottom summary">
                                        <a href="#section-1">
                                            <i className="fas fa-file-invoice fa-3x" />
                                        </a>
                                        <span className="overlay">Summary</span>
                                    </li>
                                    <li className="border-bottom language">
                                        <a href="#section-2">
                                            <i className="fas fa-language fa-3x" />
                                        </a>
                                        <span className="overlay">Language</span>
                                    </li>
                                    <li className="border-bottom interests">
                                        <a href="#section-3">
                                            <i className="fas fa-bicycle fa-3x" />
                                        </a>
                                        <span className="overlay">Interests</span>
                                    </li>
                                    <li className="border-bottom experiences">
                                        <a href="#section-4">
                                            <i className="fas fa-chart-line fa-3x" />
                                        </a>
                                        <span className="overlay">Experiences</span>
                                    </li>
                                    <li className="border-bottom project">
                                        <a href="#section-5">
                                            <i className="far fa-file-code fa-3x" />
                                        </a>
                                        <span className="overlay">Project</span>
                                    </li>
                                    <li className="border-bottom skills">
                                        <a href="#section-6">
                                            <i className="far fa-star fa-3x" />
                                        </a>
                                        <span className="overlay">Skills</span>
                                    </li>
                                    <li className="border-bottom education">
                                        <a href="#section-7">
                                            <i className="fas fa-graduation-cap fa-3x" />
                                        </a>
                                        <span className="overlay">Education</span>
                                    </li>
                                    <li className="border-bottom contact">
                                        <a href="#section-8">
                                            <i className="fas fa-user-alt fa-3x" />
                                        </a>
                                        <span className="overlay">Contact</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="row">
                            <div className="col-12 text-center">
                                <p className="display-4">JASON<strong>&nbsp;STATHAM</strong></p>
                                <p className="name-2" style={{fontSize:'36px'}}>full-Stack Developer</p>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>
        );
    }
}