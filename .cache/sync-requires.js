const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-templates-online-cv-index-js": hot(preferDefault(require("/workspace/student-external-profile/src/templates/online-cv/index.js"))),
  "component---cache-dev-404-page-js": hot(preferDefault(require("/workspace/student-external-profile/.cache/dev-404-page.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("/workspace/student-external-profile/src/pages/index.js"))),
  "component---src-pages-profile-js": hot(preferDefault(require("/workspace/student-external-profile/src/pages/profile.js"))),
  "component---src-pages-students-js": hot(preferDefault(require("/workspace/student-external-profile/src/pages/students.js")))
}

