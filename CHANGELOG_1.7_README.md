## Change log Shopify Shell version 1.6

### Features

1. Tree Shaking
2. Common Chunks / Split Chunks
3. Lazy load files / components
4. Live reloading through shopify CLI

### Required files
1. webpack.config.js
2. package.json
3. .bablrc (File with new content)
4. Shopify CLI
5. .shopifyignore

### webpack.config.js

```
const glob = require('glob');
const path = require('path'); //get absolute paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from js imports
const CopyPlugin = require("copy-webpack-plugin"); //copy assets p.s, webpack also watch for all the copied files
const WebpackShellPluginNext = require('webpack-shell-plugin-next'); //execute shell commands
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const stats = mode === 'development' ? 'errors-only' : { children: false }; //hide or show warning
const { VueLoaderPlugin } = require('vue-loader')
require('dotenv').config();
const storeUrl = process.env.STORE_URL;
const themeId = process.env.THEME_ID;
console.log(storeUrl);
const templateEntryPoints = glob.sync('./src/js/bundles/templates/**/**.js').reduce((acc, path) => {
  const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
  acc[entry] = path;
  return acc;
}, {});

const layoutEntryPoints = glob.sync('./src/js/bundles/layout/**.js').reduce((acc, path) => {
  const entry = path.replace(/^.*[\\\/]/, '').replace('.js', '');
  acc[entry] = path;
  return acc;
}, {});

module.exports = {
  mode,
  stats,
  entry: {
    ...templateEntryPoints,
    ...layoutEntryPoints
  }, //webpack supports multiple entry as an object  {chunkname: entrypath}
  resolve: {
    alias: {
      Styles: path.resolve(__dirname, 'src/styles/'),
      vue: 'vue/dist/vue.cjs.js'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(sc|sa|c)ss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
    ]
  },
  output: {
    clean: true,
    filename: './assets/bundle.[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: './assets/bundle.[name].js?[chunkhash]' //added chunkhash for dynamically created chunk, else browser wont know if file has been changed and will show cached version.
  },

  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: './assets/bundle.[name].css'
    }),
    new CopyPlugin({
      patterns: [ //breaking change in webpack5 compability
        {
          from: 'src/liquid/templates/customers/*.liquid',
          to: 'templates/customers/[name][ext]'
        },
        {
          from: 'src/liquid/snippets/**/*.liquid',
          to: 'snippets/[name][ext]'
        },
        {
          from: 'src/liquid/sections/**/*.liquid',
          to: 'sections/[name][ext]'
        },
        {
          from: 'src/liquid/templates/**/*.*',
          to: 'templates/[name][ext]'
        },
        {
          from: 'src/liquid/layout/**/*.liquid',
          to: 'layout/[name][ext]'
        },
        {
          from: 'src/locales/*.json',
          to: 'locales/[name][ext]'
        },
        {
          from: 'src/config/settings_schema.json',
          to: 'config/[name][ext]'
        },
        {
          from:'src/assets/**/*',
          to:'assets/[name][ext]',
        }
      ],
    }),
  ],

};

//treeshake and watch on development
if (mode === 'development') {
  module.exports.devtool = false;
  module.exports.plugins.push(
    new WebpackShellPluginNext({
      onBuildStart: {
        scripts: ['echo Webpack build in progress...🛠']
      },
      onBuildEnd: {
        scripts: ['echo Build Complete 📦',`shopify login -s ${storeUrl} && cd dist && shopify theme serve -t ${themeId}`],
        parallel: true //this is required to make webpack watch run in background.
      }
    })
  );
}

//minification,create chunks,treeshake on production
if(mode === 'production') {
  module.exports.optimization = {
    usedExports: true, //check for ununsed exports for treeshaking within file
    splitChunks: {
      usedExports: true, //check for ununsed exports for treeshaking within chunk
      cacheGroups: {
        default: false, //override default
        Vendors: {  //create a seperate chunk for vendor
          test: /[\\/]node_modules[\\/]/, //required both / & \ to support cross platform between unix and windows
          name: 'vendors',//only create chunk for dependencies
          chunks :'all', //create chunk for all sync , async and cjs modules
          type: /javascript/,
          enforce: true // ignores minSize: 2000, minChunks: 1,priority: 0,
        },
        common: { //create a common chunk
          chunks: "all", //create chunk for all sync , async and cjs modules
          minChunks: 2, //minimum import for creating chunk
          name: 'common',
          priority: -20, //-ve value denotes that it will be in lowest priority
          minSize: 1000,//minimum size that required for creating a chunk, we would not want just few lines of code getting chunked together, so minimum size set to 1kb
          type: /javascript/
        }
      },
    }
  }
}

```

### Make sure to add your project specific modules/dependencies
```
{
  "name": "Anatta-Shopify-Development",
  "version": "1.7.0",
  "description": "Shopify theme development tool.",
  "private": true,
  "main": "webpack.config.js",
  "sideEffects": [
    "*.css",
    "*.scss",
    "*.vue"
  ],
  "scripts": {
    "build": "webpack",
    "deploy": "webpack && cd dist && shopify theme push",
    "start": "NODE_ENV=development webpack --watch",
    "eslint": "eslint 'src/js/**'",
    "stylelint": "stylelint '**/*.scss'"
  },
  "husky": {
    "hooks": {
      "pre-commit": "npm run eslint && npm run stylelint"
    }
  },
  "keywords": [
    "shopify",
    "theme",
    "webpack"
  ],
  "author": "@monkviper",
  "contributors": [
    "@jingleBaba"
  ],
  "license": "ISC",
  "repository": {
    "type": "git",
    "url": "https://github.com/anattadesign/shopify-starter.git"
  },
  "dependencies": {
    "vue": "^3.2.31",
    "vue-loader": "^17.0.0"
  },
  "devDependencies": {
    "@babel/core": "^7.9.0",
    "@babel/plugin-transform-runtime": "^7.9.0",
    "@babel/preset-env": "^7.9.0",
    "@shopify/theme-addresses": "^4.1.1",
    "@shopify/theme-currency": "^4.1.1",
    "@shopify/themekit": "^1.1.4",
    "accoutrement": "^2.1.3",
    "autoprefixer": "^10.4.4",
    "babel-loader": "^8.1.0",
    "browser-sync": "^2.27.9",
    "copy-webpack-plugin": "^10.2.4",
    "css-loader": "^6.7.1",
    "dotenv": "^16.0.0",
    "eslint": "^8.12.0",
    "fs": "^0.0.1-security",
    "glob": "^7.1.6",
    "husky": "^4.2.5",
    "jquery": "^3.6.0",
    "lazysizes": "^5.2.1",
    "mini-css-extract-plugin": "^2.6.0",
    "node-sass": "^7.0.1",
    "postcss-loader": "^6.2.1",
    "pre-commit": "^1.2.2",
    "sass-loader": "^12.6.0",
    "stylelint": "^14.6.1",
    "stylelint-config-standard": "^25.0.0",
    "webpack": "^5.70.0",
    "webpack-cli": "^4.9.2",
    "webpack-shell-plugin-next": "^2.2.2",
    "yaml": "^1.10.2"
  }
}

```

## .bablrc
```
{
  "presets": [["@babel/preset-env",  {
    "targets": {
      "esmodules": true //target browser that support esbuilds
    },
    "modules": false //dont compile the module files to es5 , required for tree shaking
  }]],
  "plugins": ["@babel/plugin-transform-runtime"]
}
```
## .shopifyignore
```
config/settings_data.json
```