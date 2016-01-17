MONITORING SERVER
=================

Quick and light rest api server for your monitoring data. 


CONTENTS OF THIS FILE
---------------------
   
 * [Introduction](#introduction)
 * [Requirements](#requirements)
 * [Development modules](#development-modules)
 * [Installation](#installation)
 * [Configuration](#configuration)
 * [Troubleshooting](#troubleshooting)
 * [Maintainers](#maintainers)
 * [Licence](#licence)
 
 
INTRODUCTION
------------

Monitoring server is aimed to be easy and quick to deploy and modify if necessary. 
This server provides REST which is extensively used by nodes and by gui.

 * For a full description of the api, visit the project route folder:  
   https://github.com/one-coffee/monitoring-server/tree/master/app/hapi/route

 * To submit bug reports and feature suggestions, or to track changes:  
   https://github.com/one-coffee/monitoring-server/issues


REQUIREMENTS
------------

This project does not require any globally installed modules once already built.


DEVELOPMENT MODULES
-------------------

For development, building or testing this project requires following global packages.

 * [babel-cli](https://babeljs.io/docs/usage/cli/)
 * [mocha](https://drupal.org/project/panels)
 * [jscs](http://jscs.info/)
 * [jshint](http://jshint.com/)
 * [supervisor](https://github.com/petruisfan/node-supervisor)
 

INSTALLATION
------------

1. Clone project from github. `git clone git@github.com:one-coffee/monitoring-server.git`
2. Install all development modules. `npm install -g jscs mocha babel-cli jshint supervisor`
3. Test code. `npm run test`
4. Build code. `npm run build`
5. Start server `node dist/app.php`
 

CONFIGURATION
-------------

Copy `./dist/config.default.js` into `./dist/config.js` and make required changes.


TROUBLESHOOTING
---------------

This project has been tested on strange mixed environment and it's possible it won't work on yours. If that happens don;t hesitate to create issue.


MAINTAINERS
-----------

Current maintainers:
 * Martin Morávek <moravek.martin@gmail.com> - https://github.com/Keeo


LICENCE
-----------
[MIT](https://github.com/one-coffee/monitoring-server/blob/master/LICENSE)
