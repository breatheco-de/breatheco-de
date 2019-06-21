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
                                        <span className="overlay border"><b>SUMMARY</b></span>
                                    </li>
                                    <li className="border-bottom language">
                                        <a href="#section-2">
                                            <i className="fas fa-language fa-3x" />
                                        </a>
                                        <span className="overlay border">LANGUAGE</span>
                                    </li>
                                    <li className="border-bottom interests">
                                        <a href="#section-3">
                                            <i className="fas fa-bicycle fa-3x" />
                                        </a>
                                        <span className="overlay border">INTERESTS</span>
                                    </li>
                                    <li className="border-bottom experiences">
                                        <a href="#section-4">
                                            <i className="fas fa-chart-line fa-3x" />
                                        </a>
                                        <span className="overlay border">EXPERIENCES</span>
                                    </li>
                                    <li className="border-bottom project">
                                        <a href="#section-5">
                                            <i className="far fa-file-code fa-3x" />
                                        </a>
                                        <span className="overlay border">PROJECT</span>
                                    </li>
                                    <li className="border-bottom skills">
                                        <a href="#section-6">
                                            <i className="far fa-star fa-3x" />
                                        </a>
                                        <span className="overlay border">SKILLS</span>
                                    </li>
                                    <li className="border-bottom education">
                                        <a href="#section-7">
                                            <i className="fas fa-graduation-cap fa-3x" />
                                        </a>
                                        <span className="overlay border">EDUCATION</span>
                                    </li>
                                    <li className="contact">
                                        <a href="#section-8">
                                            <i className="fas fa-user-alt fa-3x" />
                                        </a>
                                        <span className="overlay border">CONTACT</span>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                        <div className="row gradient">
                            <div className="col-12 text-center">
                            <div className="container">
                                <p className="font-weight-light" style={{fontSize:'105px', paddingTop:'34px'}}>JASON<strong className="font-weight-bold">&nbsp;STATHAM</strong></p>
                                <p className="font-weight-light border-bottom" style={{fontSize:'40px', marginTop:'-61px'}}>Full-Stack Developer</p>
                            </div>
                            </div>
                        </div>
                        <div className="container">
                            <div className="row text-center">
                                <div className="col-12 col-md-6">
                                    <p className="font-italic bubble">I like saving the world</p>
                                    <p className="font-weight-light font-italic" style={{fontSize:'33px'}}>Motto</p>
                                </div>
                                <div className="col-12 col-md-6">
                                    <p className="font-italic bubble">Killing bad boys</p>
                                    <p className="font-weight-light font-italic" style={{fontSize:'33px'}}>Focus</p>
                                </div>
                            </div>

                            <section className="section-1"  id="section-1">

                            </section>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}