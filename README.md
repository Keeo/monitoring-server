This project uses broccoli as process pipeline. Tested on w7x64 with node 0.12.9.

#Required packages for development#

 - mocha (test runner)
 - broccoli-timepiece (compilation pipeline)
 - supervisor (watches over file change and restarts app)[does not work on w7x64 with node 5.3.0]

Install them with `npm install -g mocha broccoli-timepiece supervisor`

#How to run server#

 - npm install
 - broccoli-timepiece ./dist
 - npm test
 - npm start 
