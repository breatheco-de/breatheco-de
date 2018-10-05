# Hello World with Vanilla JS

> Requirements: Make sure you have node version 8

#### install the breathecode cli (command-line-interface)
```sh
npm i breathecode-cli -g
```

##### Download the boilerplate using the BreatheCode CLI
```
$ bc start:vanillajs-project -r
```
##### and install the npm package:
```
$ npm install
```

## Build and Start coding! 

Build the application for the first time...
```
$ npm run build
```
And start coding your Vanilla.js application, update the `index.html`, `index.css` or `index.js` depending on your needs.

## FAQ

#### 1) How do I run my code in Cloud 9?
Right click on `./index.html` and choose the __RUN__ option on the menu.

#### 2) Where do I write my code?
It depends on the language, but you have `./src/js/index.js`, `./src/css/index.css` and `./index.html` respectively, you can add new `.html` as you please, just make sure to include the bundle.js using the `<script>` tag.

__Note:__ remember that the JS workflow starts inside `window.onload`.

#### 3) I don't see my changes.
Remember that you have to re-bundle every time you update your SCSS or JS files `$ npm run build`. 
Remember also to refresh cleaning the cache (command+shift+r on mac, control+shift+r on pc & linux)

#### 4) I ran `$ npm run build` and I still don't see my changes
Please check the output on the console after bundling; maybe you have an error when bundling. 
Also, check the chrome inspector for errors on the console.

#### 5) How do I include more images on my project?
Just add them into your HTML file, the same way you did before knowing about WebPack.

#### 6) How do I include more JS files?
If the JS file is not your own, you can import it using `<script>` tags on your index.html before the `</body>` closing tag. If the file is yours is better to add it using the import statement inside index.js content.

#### 7) How can I run the development server?
This boilerplate does not support the webpack development server; you have to `$ npm run build` every time you update your JS or SCSS files.

#### 8) How do I publish the website?

This boilerplate is 100% compatible with the free github pages hosting. Publish your website by runing:
```sh
$ npm run deploy
```

Very easy and in just one step!  Push to your __master__ branch and use the free hosting that comes with [GitHub pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#enabling-github-pages-to-publish-your-site-from-master-or-gh-pages), the project is ready to be published. Remember to choose to run the Github Page from your master branch.
