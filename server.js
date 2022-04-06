/**
 * @description A server written in Node 16 that uses ESM (ECMAScript modules)
 * instead of CJS (commonJS). Run using `node server {PORT=8080}`
 * 
 * @copyright 2022
 * @author Kearney J. Taaffe
 * @license GPL-3.0-or-later
 */

import { createServer } from "http";
import { URL } from "url";
import { extname, join } from "path";
import { access, readFile, stat } from "fs";

const MIME_TYPES = {
  '.css'  : 'text/css',
  '.html' : 'text/html',
  '.jpg'  : 'image/jpg',
  '.js'   : 'text/javascript',
  '.json' : 'text/json',
  '.png'  : 'image/png',
  '.svg'  : 'image/svg+xml',
};

const PORT = process.argv[2] || 8080;

/**
 * 
 * @param {string} msg 
 * @param {string} color 
 */
function logger(msg, color='yellow') {
  const RESET = '\u001b[0m';

  switch(color.toUpperCase()) {
    case 'RED':
      color = '\u001b[31m';
      break;
    case 'GREEN':
      color = '\u001b[32m';
      break;
    case 'YELLOW':
      color = '\u001b[33m';
      break;
    case 'BLUE':
      color = '\u001b[34m';
      break;
    case 'WHITE':
    default:
      color = '\u001b[37m';
      break;
  }

  console.log(`${color}%s${RESET}`, msg);
};

/**
 * 
 * @param { string } filePath 
 * @returns 
 */
function fetchFile(filePath) {
  const findFile = (resolve) => {
    access(filePath, (err) => {
      if (err) {
        logger(filePath, 'red');
        filePath = join(process.cwd(), '/404.html');
        return resolve(filePath);
      }

      // test if the file is a directory
      stat(filePath, (err, stats) => {
        if (stats.isDirectory()) {
          logger(filePath, 'green');

          // redirect the user to the index.html in the requested folder
          filePath += 'index.html';
          return resolve(filePath);
        }

        // the file exists - read it
        return resolve(filePath);
      });
    });
  };
  
  return new Promise(findFile);
};

function getFileContents(filePath) {
  console.log('getFileContents filePath is', filePath);
  const getData = (resolve, reject) => {
    readFile(filePath, {encoding: 'binary'}, (err, data) => {
      logger(filePath);

      // at this point this error shouldn't happen
      if (err) {
        logger(filePath, 'red');
        return reject(err);
      }

      let mimeType = MIME_TYPES[extname(filePath)] || 'text/html';
      return resolve({ mimeType, data });
    });
  };

  return new Promise(getData);
};

/**
 * 
 * @param {IncomingMessage} request 
 * @param {ServerResponse} response 
 */
function onRequest(request, response) {
  const uri = new URL(request.url, `http://${request.headers.host}`);

  logger(request.url, 'blue');

  // get the /file.html from above and then find it from the current folder
  const filePath = join(process.cwd(), uri.pathname);

  // Check if the requested file exists
  fetchFile(filePath)
    .then(getFileContents)
    .then(file => {
      response.writeHead(200, {'Content-Type': file.mimeType});
      response.write(file.data, 'binary');
      return response.end();
    })
    .catch(err => {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '\n');
      return response.end();
    });
};

createServer(onRequest).listen(
  PORT, 
  () => console.log(`server started at http://localhost:${PORT}`)
);