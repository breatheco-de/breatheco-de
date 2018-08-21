# Hello World with Vanilla JS

#### Make sure you have node version 8
```sh
$ nvm i 8
```

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

## Start coding! 

Start coding your Vanilla.js application, update the index.html, index.css or index.js depending on your needs.

## FAQ

##### 1) How do I run my code in Cloud 9?
Right click on /docs/index.html and choose the RUN option on the menu9.
##### 2) Were do I write my code?
It depends on the language, but you have index.js, index.css and index.html respectively.
Note: remember that the JS workflow starts inside window.onload.
##### 3) I dont see my changes.
Remember that you have to re-bundle every time you update your CSS or JS files `$ npm run build`.
Remember also to refresh cleaning the cache (command+shift+r on mac, control+shift+r on pc & linux)
##### 4) I runned `$ npm run build` and I still don't see my changes
Please check the ourput on the console after bundling, mybe you have an error when bundling.
Alse check the chrome inspector for errors on the console.
##### 5) How do I include more images on my project?
Just add them into your HTML file, the same way you did before knowing about webpack.
##### 6) How do I include more JS files?
If the JS file is not yours you can import it using `<scrip>` tags on your index.html before the `</body>` closing tag.
If the file is yours is better to add it using the `import` statement inside index.js content. 
##### 7) How do I publish the website?
Use the free hosting that comes with github pages, the `/docs` directory is ready.