import React from 'react';
import "../templates/online-cv/styles/profile2.css"
import "bootstrap/dist/css/bootstrap.css";

export default class Profile2 extends React.Component{
    render(){
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 parallax p-0">
                        
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
                                        <span className="overlay border">SUMMARY</span>
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
                            <img
                                        src="https://www.4geeksacademy.co/wp-content/themes/the-fastest/assets/img/4geeks-icon-black.png"
                                        className="geeks-img float-right"
                                        alt="..."/>
                    </div>
                </div>
                        
                        <div className="row gradient">
                        </div>
                        <div className="row programmer">
                            <div className="col-12 text-center">
                                    <p className="font-weight-light name">JASON<strong className="font-weight-bold">&nbsp;STATHAM</strong></p>
                                    <p className="font-weight-light profession">Full-Stack Developer</p>
                                    <hr className="bottom-line"/>
                            </div>
                        </div>
                        <div className="container pt-4">
                            <div className="row text-center bubbles pt-4">
                                <div className="col-12 col-sm-6"> 
                                    <div className="bubble font-italic ">
                                        <p>I like saving the world</p>
                                    </div>
                                        <p className="font-weight-light font-italic motto">Motto</p>
                                </div>
                                <div className="col-12 col-sm-6">
                                    <div className="bubble font-italic right-bubble">
                                        <p>Killing Bad Boys</p>
                                    </div>
                                        <p className="font-weight-light font-italic focus">Focus</p>
                                </div>
                            </div>
                            <div className="container pt-4">
                                <section className="section-1"  id="section-1">
                                    <div className="row pt-4">
                                        <div className="col-12 ">
                                            <label><i className="fas fa-file-invoice text-warning icon-section-1" /><span className="title font-italic">Summary</span></label>
                                        </div>
                                        
                                    </div>
                                    <div className="row py-4 border-section">
                                    <div className="col-12">
                                        <p className="p text-justify">
                                            Mision-driven full stack developer with a
                                            passion for thoughtful UI design,
                                            collaboration, and teaching.
                                        </p>
                                        <p className="p text-justify">
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
                                        <p className="p text-justify">
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
                                <section className="section-2" id="section-2">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="fas fa-language text-warning icon-section" /><span className="title font-italic">Language</span></label>
                                        </div>
                                    </div>
                                    <div className="row py-4  border-section">
                                        <div className="col-12 col-sm-4">
                                            <p className="pl-4 idiom"><strong>Idiom:</strong><span className="pl-2 p">English</span></p>
                                            <p className="pl-4 level"><strong>Level:</strong><span className="pl-2 p">Native</span></p>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <p className="pl-4 idiom"><strong>Idiom:</strong><span className="pl-2 p">Spanish</span></p>
                                            <p className="pl-4 level"><strong>Level:</strong><span className="pl-2 p">Professioanl</span></p>
                                        </div>
                                        <div className="col-12 col-sm-4">
                                            <p className="pl-4 idiom"><strong>Idiom:</strong><span className="pl-2 p">French</span></p>
                                            <p className="pl-4 level"><strong>Level:</strong><span className="pl-2 p">Professional</span></p>
                                        </div>
                                    </div>
                                    
                                </section>
                                
                                <section className="section-3" id="section-3">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="fas fa-bicycle text-warning icon-section" /><span className="title font-italic">Interests</span></label>
                                        </div>
                                    </div>
                                    <div className="row p py-4 border-section">
                                        <div className="col-12 col-sm-4 pl-4 climbing">
                                            <p className="text-left p pl-2">Climbing</p>
                                        </div>
                                        <div className="col-12 col-sm-4 pl-4 snowboarding">
                                            <p className="text-left pl-2">Snowboarding</p>
                                        </div>
                                        <div className="col-12 col-sm-4 pl-4 cooking">
                                            <p className="text-left pl-2">Cooking</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-4 " id="section-4">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="fas fa-chart-line text-warning icon-section" /><span className="title font-italic">Experiences</span></label>
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-9">
                                            <h4 className="font-weight-bold pt-2 exp-text">LEAD DEVELOPER</h4>
                                            <h5 className="text-muted exp-text">2015-Present</h5>
                                            <label className="font-weight-light text-muted exp-text">Startup Hubs, San Francisco</label>
                                        </div>
                                        <div className="col-12 col-sm-3 border-side">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row exp-border">
                                        <div className="col-12">
                                            <p className="text-justify p py-4">
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
                                            
                                            <p className="p">-Bullet point</p>
                                            <p className="p bullet">-Bullet point</p>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-9">
                                            <h4 className="font-weight-bold pt-2 exp-text">SENIOR SOFTWARE ENGINEER</h4>
                                            <h5 className="text-muted exp-text">2014-2015</h5>
                                            <label className="font-weight-light text-muted exp-text">Google, London</label>
                                        </div>
                                        <div className="col-12 col-sm-3 border-side">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row exp-border">
                                        <div className="col-12">
                                            <p className="text-justify p py-4">
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
                                            <p className="p">-Bullet point</p>
                                            <p className="p bullet">-Bullet point</p>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-9">
                                            <h4 className="font-weight-bold pt-2 exp-text">UI DEVELOPER</h4>
                                            <h5 className="text-muted exp-text">2012-2014</h5>
                                            <label className="font-weight-light text-muted exp-text">Amazon, London</label>
                                        </div>
                                        <div className="col-12 col-sm-3 border-side">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row border-section">
                                        <div className="col-12">
                                            <p className="text-justify p py-4">
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
                                            <p className="p">-Bullet point</p>
                                            <p className="p bullet">-Bullet point</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-5" id="section-5">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="far fa-file-code text-warning icon-section" /><span className="title font-italic">Project</span></label>
                                        </div>
                                    </div>
                                    <div className="row py-4">
                                        <div className="col-12">
                                            <div className="card-group exp-border pb-4">
                                                <div className="card px-2 border-0">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" class="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">VELOCITY</h5>
                                                    <p className="card-label">#Velocity</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card px-2 border-top-0 border-right-0 border-bottom-0 border-side">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">DEVSTUDIO</h5>
                                                    <p className="card-label">#Devstudio</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card px-2 border-top-0 border-right-0 border-bottom-0 border-side">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">TEMPO</h5>
                                                    <p className="card-label">#Tempo</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row border-section">
                                        <div className="col-12">
                                            <div className="card-group pb-4">
                                                <div className="card px-2 border-0">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" class="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">VELOCITY</h5>
                                                    <p className="card-label">#Velocity</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card px-2 border-top-0 border-right-0 border-bottom-0 border-side">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">DEVSTUDIO</h5>
                                                    <p className="card-label">#Devstudio</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card px-2 border-top-0 border-right-0 border-bottom-0 border-side">
                                                    
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-6" id="section-6">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="far fa-star text-warning icon-section" /><span className="title font-italic">Skills</span></label>
                                        </div>
                                    </div>
                                    <div className="row  justify-content-around py-4 border-section">
                                        <div className="col-12 col-md-6 px-4">
                                            <div className="p-2 ml-2">
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
                                            <div className="p-2 ml-2">
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
                                            <div className="p-2 ml-2">
                                                <label className="p font-weight-bold">
                                                    Ruby on Rails
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
                                            <div className="p-2 ml-2">
                                                <label className="p font-weight-bold">
                                                    Javascript &amp; jQuery
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
                                            <div className="p-2 ml-2">
                                                <label className="p font-weight-bold">
                                                    HTML5 &amp; CSS
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
                                            <div className="p-2 ml-2">
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
                                </section>
                                <section className="section-7" id="section-7">
                                    <div className="row py-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="fas fa-graduation-cap text-warning icon-section" /><span className="title font-italic">Education</span></label>
                                        </div>
                                    </div>
                                    <div className="row py-4 border-section">
                                        <div className="col-12 col-md-6">
                                        
                                            <label className="font-weight-bold edu-title">MCS IN COMPUTER SCIENCE</label>
                                            <p className="p city">University of London</p>
                                            <div className="row">
                                                <div className="col-12 col-sm-8">
                                                    <img
                                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                            className="w-100 img-fluid"
                                                            alt="..."
                                                        />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                     <label><i className="far fa-clock fa-2x clock"/><span className="year">2011-2012</span></label>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                <p className="pt-4 text-justify edu-p">
                                                    Describe your role here lorem ipsum dolor
                                                    sit amet, consetetuer adipiscing elit.
                                                    Aenean commodo ligula eget dolor. Aenean
                                                    massa. Cum soccis natoque penatibus el
                                                    magnis dis paturrient montes, nascetur
                                                    ridiculus mus. Donec quam felis, ultricies
                                                    nec, pellentesque eu, pretium quis sem.
                                                </p>
                                                <p className="edu-p">-Bullet point</p>
                                                <p className="edu-p bullet">-Bullet point</p>
                                                </div>
                                            </div>          
                                        
                                        </div>
                                        <div className="col-12 col-md-6 border-side">
                                        
                                            <label className="font-weight-bold edu-title">BSC IN APPLIED MATHEMATICS</label>
                                            <p className="p city">Bristol University</p>
                                            <div className="row">
                                                <div className="col-12 col-sm-8">
                                                    <img
                                                            src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                            className="w-100 img-fluid"
                                                            alt="..."
                                                        />
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-12">
                                                     <label><i className="far fa-clock fa-2x clock"/><span className="year">2007-2011</span></label>
                                                </div>
                                                
                                            </div>
                                            <div className="row">
                                            <div className="col-12">
                                                <p className="pt-4 text-justify edu-p">
                                                        Describe your role here lorem ipsum dolor
                                                        sit amet, consetetuer adipiscing elit.
                                                        Aenean commodo ligula eget dolor. Aenean
                                                        massa. Cum soccis natoque penatibus el
                                                        magnis dis paturrient montes, nascetur
                                                        ridiculus mus. Donec quam felis, ultricies
                                                        nec, pellentesque eu, pretium quis sem.
                                                </p>
                                                <p className="edu-p">-Bullet point</p>
                                                <p className="edu-p bullet">-Bullet point</p>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-8 contact" id="section-8">
                                    <div className="row pt-4">
                                        <div className="col-12 pt-4">
                                            <label><i className="fas fa-user-alt text-warning icon-section" /><span className="title font-italic">Contact</span></label>
                                        </div>
                                    </div>
                                    <div className="row pl-4">
                                        <div className="col-12 pl-4">
                                            <label className="pt-2"><i className="fas fa-envelope fa-2x"/><span className="pl-2 p ">jason@jasonstatham.com</span></label>
                                            <br/>
                                            <label className="pt-2"><i className="fas fa-phone fa-2x"/><span className="pl-2 p">Phone: 234 2342 342</span></label>
                                            <br/>
                                            <label className="pt-2"><i className="fas fa-globe fa-2x"/><span className="pl-2 p">jasonstatham.com</span></label>
                                            <br/>
                                            <label className="pt-2"><i className="fab fa-linkedin fa-2x"/><span className="pl-2 p">linkein.com/in/jasonstatham</span></label>
                                            <br/>
                                            <label className="pt-2"><i className="fab fa-twitter fa-2x"/><span className="pl-2 p">twitter.com/jasonstatham</span></label>
                                            <br/>
                                            <label className="pt-2"><i className="fab fa-stack-overflow fa-2x"/><span className="pl-2 p">123456 / alandoe</span></label>
                                        </div>
                                    </div>

                                </section>
                                
                                
                            </div>
                        </div>
            </div>
        );
    }
}