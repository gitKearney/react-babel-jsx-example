# Setup
Notes on how this is set up

# Babel
The following commands will download babel for us to transpile JSX code to JS code

    npm install --save-dev @babel/core \
      @babel/cli \
      babel-plugin-add-import-extension \
      @babel/preset-react

# Package.json - Scripts
The _scripts_ property of the package.json file to start the server and transpile JSX to JS code

    "scripts": {
      "build": "babel react_src --out-dir=js/src",
      "test": "echo \"Error: no test specified\" && exit 1",
      "start": "node server.js"
    },

# babelrc file
The _.babelrc_ file contains the extension *"babel-plugin-add-import-extension"* which adds a _.js_ to every import statement. This is because I'm using ES Modules to import my code from one file into another.

# Package.json - run node server with ESM instead of CJS
We need to add `"type": "module"` to the _package.json_ to run the server using ES Modules. 

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