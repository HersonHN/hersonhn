'use strict';

const { execSync } = require('child_process');
const CONSTANTS = {};


init();


function init() {
  declareConstants();
  registerHelpers();
}

function declareConstants() {
  CONSTANTS.APP_URL = appURL();
  CONSTANTS.ENV = enviroment();
  CONSTANTS.GIT_ID = gitId();
}

function registerHelpers() {
  hexo.extend.helper.register('env',     () => CONSTANTS.ENV);  
  hexo.extend.helper.register('version', () => `v=${CONSTANTS.GIT_ID}`);
  hexo.extend.helper.register('app_url', () => CONSTANTS.APP_URL);
}


function gitId() {
  let id = execSync('git rev-parse --short HEAD');
  id = id.toString().trim();
  return id;
}


function appURL() {
  let env = enviroment();
  // configuration from _config.yml
  let APP = hexo.config.APP;
  // search the url accoring to the environment
  let url = APP[env];

  return url;
}


function enviroment() {
  // actual enviroment
  // if running `hexo generate` =>  production
  // if running `hexo server`   =>  local
  let args = process.argv;
  let isProd  = searchInArray(args, 'g');
  let isLocal = searchInArray(args, 's');

  let envOriginal = '';

  if (isProd)  envOriginal = 'production';
  if (isLocal) envOriginal = 'local';

  // environment from the command line
  // example:  --env='production'
  let envParam = hexo.env.args.env;

  // environment from the command line has the priority
  let env = envParam || envOriginal;

  return env;
}


function searchInArray(list, initialCharacter) {
  var found = list.findIndex((term) => term.startsWith(initialCharacter));
  return found > -1;
}
