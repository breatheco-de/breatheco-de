let studentData = localStorage.getItem("student-data");
console.log(window.location.search, "locaion");

const params = new URLSearchParams(window.location.search);
let studentIndex = params.get("id");

let studentDataObject = JSON.parse(studentData);
window.onload = function() {
  document.getElementById("student-details").innerHTML = `<div class="wrapper">
    <div class="main-wrapper">
        <section class="section summary-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x "></i>
                    <i class="fas fa-user fa-stack-1x fa-inverse "></i> </span>Career Profile</h2>
            <div class="summary">
            ${
              studentDataObject[studentIndex]?.basic_info?.summary
                ? studentDataObject[studentIndex]?.basic_info?.summary
                : "No summary provided"
            }
                </div>
        </section>
        <section class="section experiences-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x "></i> <i
                        class="fas fa-briefcase fa-stack-1x fa-inverse "></i> </span> Experiences</h2>
                        ${
                          studentDataObject[studentIndex].experiences
                            ? studentDataObject[studentIndex].experiences
                                .map((exp) => {
                                  return `<div class="item">
                                              <div class="mb-5">
                                                  <div class="meta">
                                                      <div class="upper-row">
                                                          <h3 class="job-title">${
                                                            exp.role
                                                              ? exp.role
                                                              : ""
                                                          }</h3>
                                                          <div class="time">${
                                                            exp.time
                                                              ? exp.time
                                                              : ""
                                                          }</div>
                                                      </div>
                                                      <div class="company">${
                                                        exp.company
                                                          ? exp.company
                                                          : ""
                                                      }</div>
                                                  </div>
                                                  <div class="details">${
                                                    exp.details
                                                      ? exp.details
                                                      : ""
                                                  }</div>
                                              </div>
                                          </div>`;
                                })
                                .join("")
                            : "No experiences specified"
                        } 
               
        </section>
        <section class="section projects-section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x"></i> <i
                        class="fas fa-archive fa-stack-1x fa-inverse "></i> </span> Projects</h2>
            <div class="intro">
  
                <p>${
                  studentDataObject[studentIndex]?.projects?.intro
                    ? studentDataObject[studentIndex]?.projects?.intro
                    : ""
                }</p>
            </div>
            <div class="item mb-2">
  
            ${
              studentDataObject[studentIndex]?.projects?.assignments
                ? studentDataObject[studentIndex].projects.assignments
                    .map((assignment, i) => {
                      return `<div key=${i} class=" mb-3">
                    <span class="project-title">${
                      assignment?.title ? assignment?.title : ""
                    }</span>
                    <span class="project-tagline">
                      ${assignment?.tagline ? assignment?.tagline : ""}
                    </span>
                    ${
                      assignment.link
                        ? `<a
                      target="_blank"
                      rel="noopener noreferrer"
                      href=${assignment.link}
                      class="project-link text-dark"
                    >
                      view live
                    </a>`
                        : ""
                    }
                    
                  </div>`;
                    })
                    .join("")
                : "No projects available"
            }
  
            </div>
        </section>
        <section class="skills-section section">
  
            <h2 class="section-title"> <span class="fa-stack fa-xs"> <i
                        class="fas fa-circle fa-stack-2x"></i> <i
                        class="fas fa-wrench fa-stack-1x fa-inverse "></i> </span> Skills &amp;
                Proficiency</h2>
  
                ${
                  studentDataObject[studentIndex]?.skills?.toolset
                    ? studentDataObject[studentIndex]?.skills?.toolset
                        .map((skill, i) => {
                          return `<div class="skillset" key=${i}>
                            <div class="item">
                                <h3 class="level-title">${skill?.name}</h3>
                                <div class="level-bar">
                                <div
                                    class="level-bar-inner"
                                    data-level="70%"
                                    style=" width: ${
                                      skill?.level ? skill?.level : "75%"
                                    }"
                                ></div>
                                </div>
                            </div>
                          </div>`;
                        })
                        .join("")
                    : "No skills specified"
                }
  
  
  
        </section>
    </div>
    <div class="sidebar-wrapper">
        <div class="profile-container">
            ${
              studentDataObject[studentIndex]?.basic_info?.avatar
                ? `<img
                class="avatar"
                src=${studentDataObject[studentIndex]?.basic_info?.avatar}
                alt="profile"
              />`
                : ""
            } 
            <h1 class="name p-0" id="student-profile-name">
            ${studentDataObject[studentIndex].basic_info.first_name} ${
    studentDataObject[studentIndex].basic_info.last_name
  }
            </h1>
            <h3 class="tagline">${
              studentDataObject[studentIndex].basic_info.motto
                ? studentDataObject[studentIndex].basic_info.motto
                : ""
            }</h3>
        </div>
        <div class="contact-container container-block">
            <ul class="list-unstyled contact-list">
            ${
              studentDataObject[studentIndex].basic_info.website
                ? `<li class="website ml-0">
            <i class="fas fa-globe-americas"></i>
            <a href=${studentDataObject[studentIndex].basic_info.website} target="_blank" rel="noopener noreferrer">
              ${studentDataObject[studentIndex].basic_info.website}
            </a>
          </li>`
                : ""
            }
          ${
            studentDataObject[studentIndex].basic_info.linkedin
              ? `<li class="linkedin ml-0">
          <i class="fab fa-linkedin"></i>
          <a href=${studentDataObject[studentIndex].basic_info.linkedin} target="_blank" rel="noopener noreferrer">
            ${studentDataObject[studentIndex].basic_info.linkedin}
          </a>
        </li>`
              : ""
          }
                ${
                  studentDataObject[studentIndex].basic_info.twitter
                    ? `<li class="twitter ml-0">
                <i class="fab fa-twitter"></i>
                <a href="https://twitter.com/${studentDataObject[studentIndex].basic_info.twitter}" target="_blank" rel="noopener noreferrer">
                  ${studentDataObject[studentIndex].basic_info.twitter}
                </a>
              </li>`
                    : ""
                }
              ${
                studentDataObject[studentIndex].basic_info.github
                  ? `<li class="github ml-0">
              <i class="fab fa-github"></i>
              <a href="https://github.com/${studentDataObject[studentIndex].basic_info.github}" target="_blank" rel="noopener noreferrer">
                github.com/${studentDataObject[studentIndex].basic_info.github}
              </a>
            </li>`
                  : ""
              }
  
            </ul>
        </div>
  
        <div class="education-container container-block">
            <h2 class="container-block-title"> Education</h2>
  
            ${
              studentDataObject[studentIndex]?.education
                ? studentDataObject[studentIndex]?.education
                    .map((education, i) => {
                      return `<div class="mb-3" key=${i}>
                    <div class="item">
                      <h4 class="degree">${
                        education?.degree ? education?.degree : ""
                      }</h4>
                      <h5 class="meta">${
                        education?.university ? education?.university : ""
                      }</h5>
                      <div class="time">${
                        education?.time ? education?.degree : ""
                      }</div>
                    </div>
                  </div>`;
                    })
                    .join("")
                : "No education provided"
            }
  
        </div>
        <div class="languages-container container-block">
            <h2 class="container-block-title"> Languages</h2>
            <ul class="list-unstyled interests-list">
  
            ${
              studentDataObject[studentIndex]?.basic_info?.languages
                ? studentDataObject[studentIndex].basic_info.languages
                    .map((language, i) => {
                      return `<div key=${i}>
                    <li class="ml-0">
                      ${language?.idiom ? language?.idiom : ""}
                      <span class="lang-desc">(${
                        language?.level ? language?.level : ""
                      })</span>
                    </li>
                  </div>`;
                    })
                    .join("")
                : "No languages provided"
            }
  
            </ul>
        </div>
        <div class="interests-container container-block">
            <h2 class="container-block-title"> Interests</h2>
            <ul class="list-unstyled interests-list">
            ${
              studentDataObject[studentIndex]?.basic_info?.interests
                ? studentDataObject[studentIndex].basic_info.interests
                    .map((interest, i) => {
                      return `<div key=${i}>
                    <li class="ml-0"> ${interest?.item}</li>
                  </div>`;
                    })
                    .join("")
                : "No interest provided"
            }
  
            </ul>
        </div>
    </div>
  </div>`;
};
