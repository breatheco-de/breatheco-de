let studentData = localStorage.getItem("student-data");
console.log(window.location.search, "locaion");

const params = new URLSearchParams(window.location.search);
let studentIndex = params.get("id");

let studentDataObject = JSON.parse(studentData);
window.onload = function() {
  //   const experiences = () => {
  //     studentDataObject.experiences[2].map((item, i) => {
  //       return (
  //         <div key={i} class="item">
  //           <div class="mb-5">
  //             <div class="meta">
  //               <div class="upper-row">
  //                 <h3 class="job-title">{item.role}</h3>
  //                 <div class="time">{item.time}</div>
  //               </div>
  //               <div class="company">{item.company}</div>
  //             </div>
  //             <div class="details">{item.details}</div>
  //           </div>
  //         </div>
  //       );
  //     });
  //   };

  document.getElementById("student-details").innerHTML = `<div class="wrapper">
    <div class="main-wrapper">
        <section class="section summary-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x "></i>
                    <i class="fas fa-user fa-stack-1x fa-inverse "></i> </span>Career Profile</h2>
            <div class="summary">
  
                ${studentDataObject[studentIndex].basic_info.summary}</div>
        </section>
        <section class="section experiences-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x "></i> <i
                        class="fas fa-briefcase fa-stack-1x fa-inverse "></i> </span> Experiences</h2>
            <div class="item">
  
                <div class="mb-5">
                    <div class="meta">
                        <div class="upper-row">
                            <h3 class="job-title">Front End</h3>
                            <div class="time">Aug 2022-2023</div>
                        </div>
                        <div class="company">BreathCode</div>
                    </div>
                    <div class="details">developed websites</div>
                </div>
  
  
            </div>
        </section>
        <section class="section projects-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x"></i> <i
                        class="fas fa-archive fa-stack-1x fa-inverse "></i> </span> Projects</h2>
            <div class="intro">
  
                <p>All of my projects</p>
            </div>
            <div class="item mb-2">
  
                <div class=" mb-3">
                    <span class="project-title">Buddy App</span>
                    <span class="project-tagline">
                        App for buddies
                    </span>
                    <a target="_blank" rel="noopener noreferrer" href={assignment.link}
                        class="project-link text-dark">
                        view live
                    </a>
  
                </div>
  
            </div>
        </section>
        <section class="skills-section section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x"></i> <i
                        class="fas fa-wrench fa-stack-1x fa-inverse "></i> </span> Skills &amp;
                Proficiency</h2>
  
            <div class="skillset">
                <div class="item">
                    <h3 class="level-title">javascript</h3>
                    <div class="level-bar">
                        <div class="level-bar-inner" data-level="70%"></div>
                    </div>
                </div>
            </div>
  
  
  
        </section>
    </div>
    <div class="sidebar-wrapper">
        <div class="profile-container">
            <!-- <img
    class="avatar"
    src={studentDetails?.basic_info?.avatar}
    alt="profile"
  /> -->
            <h1 class="name p-0" id="student-profile-name">
            ${studentDataObject[studentIndex].basic_info.first_name} ${studentDataObject[studentIndex].basic_info.last_name}
            </h1>
            <h3 class="tagline">You only live once</h3>
        </div>
        <div class="contact-container container-block">
            <ul class="list-unstyled contact-list">
                <li class="website ml-0">
                    <i class="fas fa-globe-americas"></i>
                    <a href="google.com" target="_blank" rel="noopener noreferrer">
                        google.com
                    </a>
                </li>
                <li class="linkedin ml-0">
                    <i class="fab fa-linkedin"></i>
                    <a href="google.com" target="_blank" rel="noopener noreferrer">
                        google.com
                    </a>
                </li>
                <li class="twitter ml-0">
                    <i class="fab fa-twitter"></i>
                    <a href="google.com" target="_blank" rel="noopener noreferrer">
                        @twitter
                    </a>
                </li>
                <li class="github ml-0">
                    <i class="fab fa-github"></i>
                    <a href="google.com" target="_blank" rel="noopener noreferrer">
                        github.com/username
                    </a>
                </li>
  
            </ul>
        </div>
  
        <div class="education-container container-block">
            <h2 class="container-block-title"> Education</h2>
  
            <div class="mb-3">
                <div class="item">
                    <h4 class="degree">Computer Proramming</h4>
                    <h5 class="meta">Youtube University</h5>
                    <div class="time">2010</div>
                </div>
            </div>
  
        </div>
        <div class="languages-container container-block">
            <h2 class="container-block-title"> Languages</h2>
            <ul class="list-unstyled interests-list">
  
                <div>
                    <li class="ml-0">
  
                        English
                        <span class="lang-desc">Native</span>
                    </li>
                </div>
  
            </ul>
        </div>
        <div class="interests-container container-block">
            <h2 class="container-block-title"> Interests</h2>
            <ul class="list-unstyled interests-list">
  
                <div>
                    <li class="ml-0"> Music</li>
                </div>
  
            </ul>
        </div>
    </div>
  </div>`;
};
