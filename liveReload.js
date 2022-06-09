//dependecies
const bs = require("browser-sync").create('theme watch');
const yaml = require('yaml');
const fs = require('fs');
require('dotenv').config()

//variables
let init = false; //flag for init
let urlString = null;

//get url data from config.yml
const configs = fs.readFileSync('./config.yml', 'utf8')
const {development: {store = null, theme_id = null} = {} } = yaml.parse(configs);

//check .env file and get reload flag
const enableLiveReload = JSON.parse(process.env.LIVE_RELOAD ?? false); //default value set to false
if(enableLiveReload) {
  urlString = `https://${store}?_ab=0&_fd=0&_sc=1&preview_theme_id=${theme_id}`;
}


//Not using arrow funtion, else "this" will point to window object
function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

//HMR for css , this is not applicable for us as our css change, our js change as well, interesting idea tho
// bs.watch("dist/assets/*.css", function (event, file) {
//   console.log(file,"file");
//   if (event === "change") {
//     bs.reload("*.css");
//   }
// });

class webpackThemeWatch {
  _watchChange(){
    bs.watch("/tmp/theme.updatetheme", function (event, file) {
      if (event === "change") {
        debounce(bs.reload());
      }
    });
  }

  _init(){
    bs.init({
      proxy: urlString,
      notify: false,
      logLevel: "silent",
      injectChanges: true,
      snippetOptions: {
        rule: {
          match: /<head[^>]*>/i,
          fn: function(snippet, match) {
            return match + snippet;
          }
        }
      }
    }, function() {
      init = true;
    });
  }

  apply(compiler) {
    compiler.hooks.emit.tap(
      'Theme Watch',
      (
        stats
      ) => {
        if(!store || !theme_id) {
          console.log('\x1b[31m','ERROR: Invalid config.yml');
          process.exit(1);
        }
        urlString && !init && this._init();
        this._watchChange();
      }
    );
  }
}

module.exports = webpackThemeWatch;