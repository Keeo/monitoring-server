var babel = require('broccoli-babel-transpiler');
var eslint = require('broccoli-eslint');
var jshint = require('broccoli-jshint');
var Funnel = require('broccoli-funnel');
var MergeTrees = require('broccoli-merge-trees');

const app = 'app';

var jshintTree = new Funnel(jshint(app), {
  destDir: 'jshint'
});

var es5Tree = babel(app, {
  sourceMaps: 'inline'
});

module.exports = new MergeTrees([jshintTree, es5Tree]);
