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
                            <div className="container">
                                <section className="section-1 border-section"  id="section-1">
                                    <div className="row pt-4">
                                        <div className="col-md-1 pr-0">
                                            <i className="fas fa-file-invoice text-warning icon-section-1" />
                                        </div>
                                        <div className="col-md-11 pl-0">
                                            <label className="font-italic title">
                                                {/* &nbsp;S&nbsp;u&nbsp;m&nbsp;m&nbsp;a&nbsp;r&nbsp;y */}
                                                Summary
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row pt-4">
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
                                <section className="section-2 border-section" id="section-2">
                                    <div className="row pt-4">
                                        <div className="col-md-1 pr-0">
                                            <i className="fas fa-language text-warning icon-section-2" />
                                        </div>
                                        <div className="col-md-11 pl-0">
                                            <label className="font-italic title">
                                                {/* &nbsp;L&nbsp;a&nbsp;n&nbsp;g&nbsp;u&nbsp;a&nbsp;g&nbsp;e&nbsp;s */}
                                                Languajes
                                            </label>
                                        </div>
                                    </div>
                                    <div className="container py-4">
                                        <div className="row idiom-p px-4">
                                            <div className="col-12 col-sm-4 ">
                                                <p><strong>Idiom:</strong>&nbsp;English</p>
                                                <p><strong>Level:</strong>&nbsp;Native</p>
                                            </div>
                                            <div className="col-12 col-sm-4 ">
                                                <p><strong>Idiom:</strong>&nbsp;French</p>
                                                <p><strong>Level:</strong>&nbsp;Professional</p>
                                            </div>
                                            <div className="col-12 col-sm-4 ">
                                                <p><strong>Idiom:</strong>&nbsp;Spanish</p>
                                                <p><strong>Level:</strong>&nbsp;Professional</p>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-3 border-section" id="section-3">
                                    <div className="row pt-4">
                                        <div className="col-md-1 pr-0">
                                            <i className="fas fa-bicycle text-warning icon-section-3" />
                                        </div>
                                        <div className="col-md-11 pl-0">
                                            <label className="font-italic title">
                                                {/* &nbsp;I&nbsp;n&nbsp;t&nbsp;e&nbsp;r&nbsp;e&nbsp;s&nbsp;t&nbsp;s */}
                                                Interests
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row p text-center pt-4">
                                        <div className="col-12 col-md-4">
                                            <p>Climbing</p>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <p>Snowboarding</p>
                                        </div>
                                        <div className="col-12 col-md-4">
                                            <p>Cooking</p>
                                        </div>
                                    </div>
                                </section>
                                <section className="section-4 border-section" id="section-4">
                                    <div className="row pt-4">
                                        <div className="col-md-1 pr-0">
                                            <i className="fas fa-chart-line text-warning icon-section-4" />
                                        </div>
                                        <div className="col-md-11 pl-0">
                                            <label className="font-italic title">
                                                {/* &nbsp;E&nbsp;x&nbsp;p&nbsp;e&nbsp;r&nbsp;i&nbsp;e&nbsp;n&nbsp;c&nbsp;e&nbsp;s */}
                                                Experiences
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-8">
                                            <h4 className="font-weight-bold py-4">LEAD DEVELOPER</h4>
                                            <h4 className="font-weight-bold text-muted">2015-Present</h4>
                                            <p className="font-weight-light text-muted ">Startup Hubs, San Francisco</p>
                                        </div>
                                        <div className="col-12 col-sm-4 border-left">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100 exp-img"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row border-bottom">
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
                                            <p className="p">-Bullet point</p>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-8">
                                            <h4 className="font-weight-bold py-4">SENIOR SOFTWARE ENGINEER</h4>
                                            <h4 className="font-weight-bold text-muted">2014-2015</h4>
                                            <p className="font-weight-light text-muted ">Google, London</p>
                                        </div>
                                        <div className="col-12 col-sm-4 border-left">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100 exp-img"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row border-bottom">
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
                                            <p className="p">-Bullet point</p>
                                        </div>
                                    </div>

                                    <div className="row pt-4">
                                        <div className="col-12 col-sm-8">
                                            <h4 className="font-weight-bold py-4">UI DEVELOPER</h4>
                                            <h4 className="font-weight-bold text-muted">2012-2014</h4>
                                            <p className="font-weight-light text-muted ">Amazon, London</p>
                                        </div>
                                        <div className="col-12 col-sm-4 border-left">
                                            <img
                                                src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png"
                                                className="img-fluid w-100 exp-img"
                                                alt="..."
                                            />
                                        </div>
                                    </div>
                                    <div className="row">
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
                                            <p className="p">-Bullet point</p>
                                        </div>
                                    </div>

                                </section>
                                <section className="section-5 border-section" id="section-5">
                                    <div className="row pt-4">
                                        <div className="col-md-1 pr-0">
                                            <i className="far fa-file-code text-warning icon-section-5" />
                                        </div>
                                        <div className="col-md-11 pl-0">
                                            <label className="font-italic title">
                                                {/* &nbsp;P&nbsp;r&nbsp;o&nbsp;j&nbsp;e&nbsp;c&nbsp;t */}
                                                Project
                                            </label>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="card-deck">
                                                <div className="card">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" class="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">VELOCITY</h5>
                                                    <p className="card-text text-info">#Velocity</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">DEVSTUDIO</h5>
                                                    <p className="card-text text-info">#Devstudio</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                                <div className="card">
                                                    <img src="https://course_report_production.s3.amazonaws.com/rich/rich_files/rich_files/5024/s300/4g-logo-negro-01.png" className="card-img-top" alt="..."/>
                                                    <div className="card-body">
                                                    <h5 className="card-title">TEMPO</h5>
                                                    <p className="card-text text-info">#Tempo</p>
                                                    <p className="card-text">A responsive website template
                                                        designed to help startup promote,
                                                        market and sell their products.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}