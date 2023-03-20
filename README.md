# Hello World with Vanilla JS

Start coding a JS/HTML/CSS website in 30 seconds by opening this template in codespaces (coming soon) or [gitpod](https://gitpod.io#https://github.com/4GeeksAcademy/vanillajs-hello.git).

## Before you being

Install the packages by typing: `npm install`.


### How do I run my website to see live changes?  


Type on the command line `$ npm run start` and type localhost on the browser.

### Where do I write my code?  

It depends on the language, but you have `./src/js/app.js`, `./src/style/index.css` and `./isrc/index.html` respectively, you can add new `.html` as you please, just make sure to include import it on the index.js.

> Note: remember that the JS workflow starts inside `window.onload`.


## Troubleshooting

### I don't see my changes...

Everytime you change any file inside the `./src` folder the website public URL will automatically refresh the changes (it's a process called hot deploy)
Remember also to refresh cleaning the cache (command+shift+r on mac, control+shift+r on pc & linux)

### How do I include more images on my project?

Add them inside the `./src/assets/img` folder and import them from any of your JS files. E.g: `import "../assets/img/rigo-baby.jpg";`

### How do I include more JS files?

Just add the files into the JS folder and import the file/variables into your index.js. E.g: `import myVar from "./file2.js"`

### How do I publish the website?

This boilerplate is 100% compatible with the free github pages hosting. Publish your website by running:

```sh
$ npm run deploy
```

Very easy and in just one step!  Push to your __main__ branch and use the free hosting that comes with [GitHub pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages), the project is ready to be published. Remember to choose to run the Github Page from your master branch.

### Contributors

This template was built as part of the [Full Stack Developer course](https://4geeksacademy.com/us/coding-bootcamps/part-time-full-stack-developer) at [4Geeks Academy Coding Bootcamp](https://4geeksacademy.com/us/coding-bootcamp) by [Alejandro Sanchez](https://twitter.com/alesanchezr) and [many other contributors](https://github.com/4GeeksAcademy/vanillajs-hello/graphs/contributors).

You can find other templates and resources like this at the [school github page](https://github.com/4geeksacademy/).
