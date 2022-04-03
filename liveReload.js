const bs = require("browser-sync").create('theme watch');

  //Not using arrow funtion, else "this" will point to window object
function debounce(func, timeout = 1000){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { func.apply(this, args); }, timeout);
  };
}

var init = false;

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
      proxy: "https://jinglebaba.myshopify.com",
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
    compiler.hooks.done.tap(
      'Theme Watch',
      (
        stats
      ) => {
        !init && this._init();
        this._watchChange();
      }
    );
  }
}

module.exports = webpackThemeWatch;