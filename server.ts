import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
// const expressStaticGzip = require("express-static-gzip");
import * as express from 'express';
import { join } from 'path';
const cors = require('cors');

import { AppServerModule } from './src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync, readFileSync } from 'fs';
import 'localstorage-polyfill'
import * as FormData from 'form-data';

const domino = require('domino');

const distFolder = join(process.cwd(), 'dist/questnr-front-end/browser');

const template = readFileSync(join(distFolder, 'index.html')).toString();

const win = domino.createWindow(template);

global['localStorage'] = localStorage;
global['FormData'] = FormData;
global['window'] = win;
global['Node'] = win.Node;
global['navigator'] = win.navigator;
global['Event'] = win.Event;
global['Event']['prototype'] = win.Event.prototype;
global['document'] = win.document;

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();

  server.use(cors());

  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // server.get('*.*', expressStaticGzip(distFolder, {
  //   enableBrotli: true
  // }))

  // Example Express Rest API endpoints
  // server.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder, {
    maxAge: '1y'
  }));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from './src/main.server';