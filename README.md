# Create a ReactJS app without Webpack
Example of how to create a ReactJS app without WebPack. We'll

 * use babel to transpile our app from JSX to JS
 * not use `create-react-app`
 * create our own web-server
 * not use source maps - since this is for development purposes
 * create minified stuff when we're ready to deploy

## Setup

### Babel
The following commands will download babel for us to transpile JSX code to JS code

    npm install --save-dev @babel/core \
      @babel/cli \
      babel-plugin-add-import-extension \
      @babel/preset-react

Modify the package.json file and create a _scripts_ property

    "scripts": {
      "build": "babel react_src --out-dir=js/src",
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node server.js"
    },
      
`npm run build` will transpiles your JSX into JS and put the transpiled code in the _js/src/_ dir


### Create a .babelrc file
Because I'm using ES6 modules, I need all the JS files to have a .js extension
so, I used the babel extension, *"babel-plugin-add-import-extension"*

### React Library
Download the [React library files](https://reactjs.org/docs/cdn-links.html) and put them in *js/src/*.

 * react.production.min.js
 * react-dom.production.min.js

### OUR REACT CODE
Our ReactJS code **MUST** have a .jsx extension and lives in the directory *react_src*

### INDEX.HTML
We have an index.html file that serves the page

### SERVER
We need to add `"type": "module"` to the package.json to run the server using ES Modules. 

Node is moving away from CommanJS (CJS) Modules to ECMAScript Modules (ES Modules or ESM). 

What this means is we import using ESM instead of CJS

    // CJS
    var createServer = require('http').createServer;

    // ESM
    import { createServer } from "http";

and export our code from the module as

    // CJS
    module.exports = doSomething;

    // ESM
    export default doSomething

## INTRO
A lot of people start trying our React by using `create-react-app` while this isn't bad it hides a lot of what is going on

Also, `create-react-app` creates a pretty large JS file.

I'm hoping by this example it's pretty clear **WHAT** react is

## EXPLANATION
So, React is a libary for building front-ends. It really is nothing more than 

    document.getElementById('root')
    .innerHTML()

But, the way we get there is MUCH simpler.

This is an example of login page where the user must enter a valid email (no spaces allowed) and password and when there's values in both the username and password fields, the submit button becomes clickable and actually sends a POST request using the native `fetch API` 

Bootstrap is being used and I'm even using BootStrap's JS files.

## DETAILED EXPLANATION
First, note that I'm using React Functional components instead of React Class components. This is the way React is moving towards and classes should be avoided. 

Secondly, I'm using `hooks` for state management. The React website is still references `setState()` but that's going out of fashion as well, and should also be avoided.

Thirdly, you need to transpile the React code from JSX to JS that the browser can understand. Simply run `npm run build`

Then start the server `node server.js` or if you want to specify a port number you can via `node server.js PORT_NO` then you going to `localhost:8080` or `localhost:PORT_NO` if you specified a port number to listen to

`localhost:PORT_NO` loads _index.html_ which loads a JS module _App.js_ 

    <script type="module" src="js/src/App.js"></script>
This JS module finds the HTML element `root` from _index.html_ and replaces the HTML of `root` with the HTML produced by the component `<App>`