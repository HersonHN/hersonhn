'use strict';

hexo.extend.helper.register('env', function () {
  return enviroment();
});


hexo.extend.helper.register('app_url', function () {

  let env = enviroment();
  // configuration from _config.yml
  let APP = hexo.config.APP;
  // search the url accoring to the environment
  let url = APP[env];

  return url;

});


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
