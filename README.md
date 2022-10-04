# 📦 Shopify Shell

This Projects aim to give access to a better, smoother and more modern workflow for building, testing and deploying Shopify themes and websites. It also include reusable components. 

This project is learning after working with Shopify from last several years so the goal behind this project is to reduce some of the downsides of working within the Shopify ecosystem and bring forward some of the nice features and benefits we get while building custom e-commerce websites (PWA) outside of it.

## Shopify Shell Store Details
**Store link:** [Store](https://anattadesign.myshopify.com/admin/themes?channel=true)

**Live Example:** [Example](https://anattadesign.myshopify.com)

## Supported Features

**Module Bundling:** 
We are using Webpack 4 to bundle and optimize all your Javascript and SCSS modules.

**Code Splitting:** 
Webpack creates pages and templates based on bundles rather than huge global bundles.

**Asset Optimization:**
Webpack will go through each and every asset and optimize them while building for production.

**Sourcemaps:** 
Provides support for JS and Sass sourcemaps when you are in development mode.

**JS Code Linting:**
ESlint is part of the build process. Predefined rules for .eslintrc in the project. 

**SCSS Code Linting:**
Stylelint is part of the build process. Predefined rules for .stylelintrc in the project. 

**Safe Watch and Deploy:**
Multiple checks to prevent to push in live theme. This minimizes the risks of deploying changes to the live site while in local development.

**Design Token System:**
Integrated SCSS advance and optimized token system to standardize styling rules (Breakpoints, Grid, Typography, etc) of Anatta 

**Modular Theme:** 
Shopify theme is constructed in the way to add or remove any component without breaking anything.  

**Modular CSS and JS:**
CSS and JS is written in the way to reuse components in other projects.

**Speed Optimization**
Modern speed optimization techniques applied. 

**Lazyload Components:**
 Each component either its plain js or vue , can be lazyloaded or import in demand.
 Check more in here: https://github.com/anattadesign/Shopify-Shell/issues/19

**Common chunks:**
Components are reused or reference is provided if same component is being used in multiple places. 
It is accomplished by creating a common chunk of the reused components.
It doesn't allow code repetation, which means optimised production build.
Check more in here: https://github.com/anattadesign/Shopify-Shell/issues/18

**Tree shaking:**
We might have imported modules, either 3rd party or custom components that are imported but not being used. 
Tree shaking refers to discard those import or any defined code that are not used(dead code). 
This feature eliminate these dead codes.
Check more in here: https://github.com/anattadesign/Shopify-Shell/issues/17

**Venodr chunks:**
All the 3rd party modules, that are being used in codebase is seperated out to vendor chunks. 
There is a rare chance for these modules to be updated, which in turns provides cacheing , so that these
large files(3rd party modules) are not loaded every time, which means performance boost.

**HMR:**
Once files are uploaded to shopify using themekit, browser will autoreload the webpage.
Check more in here: https://github.com/anattadesign/Shopify-Shell/issues/20

**Shopify CLI:**
Enable local development capabilities

## Know Issues


## Report an issue
- If you find any issue while using this tool, use github issues to submit with proper information.


## System Requirements
- [Node](https://nodejs.org/en/) (v14.18.2+)
- [NPM 5+](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)

## Getting Started
1. Clone this repo ( git clone git@github.com:anattadesign/shopify-starter.git ), rename the directory to your project.
2. Open in terminal and and run `npm install` or `yarn` to install all dependencies.

### First deployment
1. Run `npm build` or `yarn build` to create your first Webpack build.
2. Compress **dist** folder from your local directory.
3. In Shopify, upload the compressed **dist** folder in Shopify admin through Add Theme option in online store.
4. Add files to be ignored **.shopifyignore** while deployment.
5. In Shopify, copy the theme ID for the new theme, then update the `THEME_ID`, and `STORE_URL` in **.env** file.
6. Run `npm start` or `yarn start` to run your Webpack build and start watching for file changes to be uploaded to Shopify.

### Consequent deployment
1. Add files to be ignored **.shopifyignore** while deployment.
2. In Shopify, copy the theme ID for the new theme, then update the `THEME_ID`, and `STORE_URL` in **.env** file.
3. Run `npm start` or `yarn start` to run your Webpack build and start watching for file changes to be uploaded to Shopify.

## Configuration

### NPM/YARN

#### Commands
`npm start` or `yarn start`
- Completes a Webpack build in **development** mode
- Choose the partner account your store can be accessed in
- deloy the initial build to the shopify
- Webpack begins watching for file changes
- Shopify CLI begins watching for file changes in `dist/`
- Shopify CLI provides you Localhost and store URL

`npm run build` or `yarn build`
- Completes a Webpack build in **production** mode

`npm run deploy` or `yarn deploy`
- Completes a Webpack build in **production** mode
- Deploys and overwrites all theme files via Shopify CLI

`npm run eslint` or `yarn eslint`
- Lint all JavaScript files in `src/js`

### Webpack

#### Entry Points
All JavaScript files in the `js/bundles/layouts` and `js/bundles/templates`  directory & subdirectories are used as entry points. All other JavaScript modules should added to additional subdirectories of `js/`. An entry point file must be created for each liquid template file, including alternate templates. A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`. These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files
Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory. The CSS files imported in each bundle entry file will also generate CSS files. Webpack will add all output files to `dist/assets`.


### Shopify CLI

#### Config
The Shopify CLI configuration file uses `dist` as the root directory for watching files to upload.

#### File Uploads
When running `npm start` or `yarn start`, Webpack will use a plugin that runs `shopify login` to login to the partner account for the store and `shopify theme serve` after a successful build. Webpack will then be set to watch and recompile file changes, and Theme Kit will watch for file changes in the `dist` directory.

## Required Files
- The layout and template entry files in `src/js/bundles/` are necessary for Webpack to generate the CSS and JavaScript assets for each layout and template. Additional entry files will be required when creating new liquid templates or alternate templates, ie. `page.about.js`.
- The `style-bundle.liquid` and `script-bundle.liquid` snippets output dynamic asset URLs based on current layout and template. These have been added to sample `theme.liquid`. The `layout` variable is required.

#### Shopify Plus Stores
If your store is on Shopify Plus, you'll need to do the following:
- Create `checkout.scss` and add to `src/styles/layout/`.
- Create `checkout.js` and add to `src/js/bundles/layout/`.
- Add `import "Styles/layout/checkout.scss";` to `checkout.js`.
- Render these snippets in `checkout.liquid` by changing the snippet's layout variable to `checkout`. ie. `{% render 'style-bundle', layout: 'checkout' %}` and `{% render 'script-bundle', layout: 'checkout' %}`.

## Notes
- Subdirectories are allowed in `assets/`, `js/`, `styles/`, `snippets/`.
- A `Styles` module alias for the styles directory is ready to use. ie. `import "Styles/layout/theme.scss"`.
- To reference an asset url in an SCSS file such as a background image, just use `./filename.ext`, since all final CSS and images live in the `dist/assets/` directory.
- If you add a new JavaScript entry file to `js/bundles/` while Webpack and Theme Kit are watching for changes, you'll need to end the process and run `npm start` again so that Webpack is aware of the new entry file.
- A git pre-commit hook is installed that will run `webpack build` prior to the commit. This is useful if using a code deployment tool so that you never push and deploy an unbuilt theme.
- `clean-webpack-plugin` was intentionally not included to make incremental deployments faster using [Buddy](https://buddy.works/). If you remove a bundle entry file, you'll also need to delete the bundle files from `dist/assets`.
- If you update or switch node versions using `nvm`, you may need to run `npm rebuild node-sass` to refresh node-sass for your current environment.
- When merging 2 git feature branches, you only need to resolve the conlficts inside `src/`. Any conflicts inside `dist/` can be resolved with `npm run build`. Always run `npm run build` after resolving merge conflicts.

#### Basic folders structure 
```
├── assets
│   ├── favicon
│   ├── fonts
│   ├── images
│   └── svg
├── config
├── design-tokens
├── js / bundles
│   ├── components
│   ├── layout
│   └── templates
│       └── customers
├── liquid
│   ├── layout
│   ├── sections
│   ├── snippets
│   └── templates
│       └── customers
├── locales
└── styles
    ├── components
    │   ├── global
    │   └── shared
    ├── layout
    └── templates
        └── customers
```

#### ESlint (JavaScript Guidelines)
The `"extends": "eslint:recommended"` property in a configuration file enables rules that report common problems, which have a check mark below.
https://eslint.org/docs/rules/

#### Stylelint (Sass Guidelines)
https://github.com/stylelint/stylelint-config-standard

