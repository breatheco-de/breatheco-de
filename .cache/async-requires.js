// prefer default export if available
const preferDefault = m => m && m.default || m

exports.components = {
  "component---src-templates-online-cv-index-js": () => import("/workspace/student-external-profile/src/templates/online-cv/index.js" /* webpackChunkName: "component---src-templates-online-cv-index-js" */),
  "component---cache-dev-404-page-js": () => import("/workspace/student-external-profile/.cache/dev-404-page.js" /* webpackChunkName: "component---cache-dev-404-page-js" */),
  "component---src-pages-index-js": () => import("/workspace/student-external-profile/src/pages/index.js" /* webpackChunkName: "component---src-pages-index-js" */),
  "component---src-pages-profile-js": () => import("/workspace/student-external-profile/src/pages/profile.js" /* webpackChunkName: "component---src-pages-profile-js" */),
  "component---src-pages-students-js": () => import("/workspace/student-external-profile/src/pages/students.js" /* webpackChunkName: "component---src-pages-students-js" */)
}

exports.data = () => import(/* webpackChunkName: "pages-manifest" */ "/workspace/student-external-profile/.cache/data.json")

