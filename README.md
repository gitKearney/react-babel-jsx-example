# Create a ReactJS app without Webpack
Many front-end devs know how to create a react web app with `create-react-app` but not many know how to create a react web app from scratch.

`create-react-app` is nice because
 * it comes with a built in web-server
 * it automatically transpiles your JSX code to JS code
 * it creates source maps which makes debugging easier
 * it minifies and uglifies your js code into a single JS file
 
However, C.R.A. is huge. the directory created by C.R.A. is something like 175MB!
C.R.A. combines your JS and CSS into 1 giant JS and CSS file respectively and serves them up in pieces. But we can do better. Why download JS code when we don't need them?
C.R.A. serves on port 3000 and that cannot be changed!!!

## STEPS TO PREP
To prep the code to run

 * Download the [React library files](https://reactjs.org/docs/cdn-links.html) and put them in *js/src/*.
    * react.production.min.js
    * react-dom.production.min.js
 * write ReactJS code in the directory *react_src*. React files **must** have a _.jsx_ extension

## HOW TO RUN
These are the steps on how to run this ReactJS example

 * `npm run build` transpiles your JSX into JS and put the transpiled code in the _js/src/_ dir
 * `npm run start` starts the nodeJS server on port 8080 by default. But, by passing in a number we can change the listening port

## EXPLANATION - WHAT IS REACT?
So, React is a libary for building front-ends. It really is nothing more than 

    document.getElementById('root')
    .innerHTML()

But, the way we get there is MUCH simpler.

This is an example of login page where the user must enter a valid email (no spaces allowed) and password and when there's values in both the username and password fields, the submit button becomes clickable and actually sends a POST request using the native `fetch API` 

Bootstrap is being used and I'm even using BootStrap's JS files.

## DETAILED EXPLANATION
First, note that I'm using React Functional components instead of React Class components. This is the preferred way to use React. Classes should be avoided. 

Secondly, I'm using `hooks` for state management. The React website is still references `setState()` which is how to set state using React Class components, but classes and setState and should be avoided.

Thirdly, you **MUST** transpile the React code from JSX to JS that the browser can understand. Simply run `npm run build`

The server loads _index.html_ which loads a JS module _App.js_ 

    <script type="module" src="js/src/App.js"></script>
This JS module finds the HTML element `root` from _index.html_ and replaces the HTML of `root` with the HTML produced by the component `<App>`