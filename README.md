<<<<<<< HEAD
# Hello World with Vanilla JS

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/vanillajs-hello.git)

### Installation without Gitpod:

1) Remember to install the npm packages first:
```
$ npm install
```

2) Build and Start coding!

Build the application for the first time...

```
$ npm run start
```

And start coding your Vanilla.js application, update the `src/index.html`, `src/index.scss` or `src/index.js` depending on your needs.

## FAQ

#### 1) How do I run my code?

- Type on the command line `$ npm run start` and type localhost on the browser.

#### 2) Where do I write my code?
It depends on the language, but you have `./src/js/index.js`, `./src/style/index.scss` and `./isrc/index.html` respectively, you can add new `.html` as you please, just make sure to include import it on the index.js.

__Note:__ remember that the JS workflow starts inside `window.onload`.

#### 3) I don't see my changes.

Everytime you change any file inside the `./src` folder the website public URL will automatically refresh the changes (it's a process called hot deploy)
Remember also to refresh cleaning the cache (command+shift+r on mac, control+shift+r on pc & linux)

#### 4) How do I include more images on my project?
Add them inside the `./src/assets/img` folder and import them from any of your JS files. E.g: `import "../assets/img/rigo-baby.jpg";`

#### 5) How do I include more JS files?
Just add the files into the JS folder and import the file/variables into your index.js. E.g: `import myVar from "./file2.js"`

#### 6) How do I publish the website?

This boilerplate is 100% compatible with the free github pages hosting. Publish your website by running:
```sh
$ npm run deploy
```

Very easy and in just one step!  Push to your __master__ branch and use the free hosting that comes with [GitHub pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages), the project is ready to be published. Remember to choose to run the Github Page from your master branch.
=======

# ![4Geeks Logo](http://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=4geeks,16) HTML Hello

[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io#https://github.com/4GeeksAcademy/vanillajs-hello.git)

The most basic boilerplate for any 4Geeks Academy Student using the [gitpod.io](gitpod.io) coding editor.

## What to do next?

Create a `index.html` file with the [basic HTML structure](http://content.breatheco.de/lesson/what-is-html-learn-html#page-structure) and see it live by running web-server using the following command:
```sh
$ pip3 install flask      (only the first time)
$ python3 server.py
```

- You can create as many HTML files you want
- You can also create CSS files and you can import them onto your website using a `<link>` tag placed between the `<head></head>` tags, like this:

```html
<head>
  ...
  <link rel="stylesheet" type="text/css" href="styles.css">
  ...
</head>
```

<p align="center">
  <img src="https://assets.breatheco.de/apis/img/images.php?blob&random&cat=icon&tags=4geeks,128">
</p>

<p align="center">
    <h2 align="center"> Student External Profile </h2>
</p>

![Travis Build](https://api.travis-ci.org/4GeeksAcademy/student-external-profile.svg?branch=master)

This website serves like a Student Profile Showcase.

Each student must upload a `<your_github_username>.yml` file inside `/src/students/` with all his information via Pull Request. For example: [rigoberto.yml](https://github.com/4GeeksAcademy/student-external-profile/blob/master/src/students/example.yml).

The `yml` file must be filled with all your personal and professional information, after complating the YML fill the application will automatically generate a student portfolio like the following:

<p align="center">
  <img height="350" src="https://raw.githubusercontent.com/4GeeksAcademy/student-external-profile/master/preview.png">
</p>

<p align="center">
  <a href="https://4geeksacademy.github.io/student-external-profile/sharu725" target="_blank">Wach Live Demo Here</a>
</p>

```
Note: You can test your yaml syntax here: http://www.yamllint.com/
```

## Completing the YML file

The YML file is comprised of 4 fundamental sections:
```yml
theme: You can choose a theme and skin colors.
basic_info: Your personal info
education: Previous studies.
experiences: Previous jobs.
projects: Describe the projects you have build as a developer.
publications: Any articles you have published.
skills: List your skills with percentage of expertise.
```

<p align="center">
  <img height="350" src="https://raw.githubusercontent.com/4GeeksAcademy/student-external-profile/master/static/yml.png">
</p>

You can pick between your template and your skin, for example:
```yml
template: "online-cv"
skin: "orange"

>>>>>>> d32c942a258b014629ade4d453b3d75d294d520b
