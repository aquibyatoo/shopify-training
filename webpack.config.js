const glob = require('glob');
const path = require('path'); //get absolute paths
const MiniCssExtractPlugin = require('mini-css-extract-plugin'); //extract css from js imports
const CopyPlugin = require("copy-webpack-plugin"); //copy assets p.s, webpack also watch for all the copied files
const WebpackShellPluginNext = require('webpack-shell-plugin-next'); //execute shell commands
const mode = process.env.NODE_ENV === 'development' ? 'development' : 'production';
const stats = mode === 'development' ? 'errors-only' : { children: false }; //hide or show warning
const liveReloadPlugin = require('./liveReload'); //custom webpack plugin for hotreloading based on theme watch status
const { VueLoaderPlugin } = require('vue-loader')

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
      //make sure to keep it last as it'll remove unused packages from node_modules, which removed vue-loader(spent 2 hours on figuring it out)
      {
        include: path.resolve(__dirname, "node_modules"),
        sideEffects: false //external libraries wont treeshake without this, sideEffect refers that each imported modules is a pure function
      }
    ]
  },
  output: {
    clean: true,
    filename: './assets/bundle.[name].js',
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: './assets/bundle.[name].js?h=[hash]' //added hash for dynamically created chunk, else browser wont know if file has been changed and will show cached version.
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
          from: 'src/liquid/templates/**/*.liquid',
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
          from: 'src/config/**',
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
        scripts: ['echo Build Complete 📦','echo Started Watching for a theme changes','shopify-themekit deploy && shopify-themekit watch --notify=/tmp/theme.updatetheme'],
        parallel: true
      }
    }),
    new liveReloadPlugin() //Custom webpack plugin for live reloading when theme watch uploads the file to shopify
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
          priority: -10, //first priority
          name: 'vendors',
          minChunks: 1, //only create chunk for dependencies
          chunks :'all', //create chunk for all sync , async and cjs modules
          minSize: 2000,
          type: /javascript/,
          enforce: true 
        },
        common: { //create a common chunk
          chunks: "all", //create chunk for all sync , async and cjs modules
          minChunks: 2, //minimum import for creating chunk
          name: 'common',
          priority: -20, //only includes the files that are not part of vendor chunk
          minSize: 1000,//minimum size that required for creating a chunk, we would not want just few lines of code getting chunked together, so minimum size set to 1kb
          type: /javascript/
        },
      },
    }
  }
}

