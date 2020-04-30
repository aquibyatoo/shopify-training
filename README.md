# 📦 Shopify Theme Development Tool

## System Requirements
- [Node](https://nodejs.org/en/) (v10.16.3+)
- [NPM 5+](https://docs.npmjs.com/try-the-latest-stable-version-of-npm)
- [Theme Kit](https://shopify.github.io/themekit/)

## Getting Started
1. Clone this repo ( git clone git@github.com:anattadesign/shopify-starter.git ), rename the directory to your project.
2. Open in terminal and and run `npm install` to install all dependencies.
3. In Shopify, copy the theme ID for the new theme, then update the `<PASSWORD>`, `THEME_ID`, and `STORE_URL` in **config.yml** with your store & theme details.
4. Your `config.yml` file should look like this: 
    ```
    development:
      password: <PRIVATE_APP_PASSWORD>
      theme_id: "<THEME_ID>"
      store: <STORE_URL>
      directory: dist/
      ignore_files:
        - config/settings_data.json
    ```
5. Run `npm start` to run your first Webpack build and start watching for file changes to be uploaded to Shopify.

## Configuration

#### Commands
`npm start`
- Completes a Webpack build in **development** mode
- Webpack begins watching for file changes
- Theme Kit begins watching for file changes in `dist/`
- Theme Kit opens your development theme in your default browser

`npm run build`
- Completes a Webpack build in **production** mode

`npm run deploy`
- Completes a Webpack build in **production** mode
- Deploys and overwrites all theme files via Theme Kit

`npm run eslint`
- Lint all JavaScript files in `src/js`

#### Entry Points
All JavaScript files in the `js/bundles` directory & subdirectories are used as entry points. All other JavaScript modules should added to additional subdirectories of `js/`. An entry point file must be created for each liquid template file, including alternate templates. A CSS file for each template and layout should also be added to `styles/layout` and `styles/templates`. These CSS files should be imported at the top of each JavaScript entry file.

#### Output Files
Webpack will generate a JavaScript file for each template and layout file in the `bundles` directory. The CSS files imported in each bundle entry file will also generate CSS files. Webpack will add all output files to `dist/assets`.

#### Config
The Theme Kit configuration file uses `dist` as the root directory for watching files to upload.

#### Basic structure
```
├── assets
│   ├── favicon
│   ├── fonts
│   ├── images
│   └── svg
├── config
│   └── custom Theme Settings
├── design-tokens
│   └── _animation.scss
│   ├── _colors.scss
│   ├── _layouts.scss
│   ├── _sizes.scss
│   ├── _typography.scss
│   └── index.scss
├── js / bundles
│   ├── components
│   │   ├── announcement.js
│   │   └── buttons.js
│   │   └── hero.js
│   │   └── index.js
│   ├── layout
│   │   ├── theme.js
│   │   └── optional alternate layouts
│   └── templates
│       ├── 404.js
│       ├── article.js
│       ├── blog.js
│       ├── cart.js
│       ├── collection.js
│       ├── collection.list.js
│       ├── gift_card.js
│       ├── index.js
│       ├── list-collections.js
│       ├── page.contact.js
│       ├── page.js
│       ├── product.js
│       └── search.js
├── liquid
│   ├── layout
│   │   ├── theme.liquid
│   │   └── optional alternate layouts
│   ├── sections
│   │   ├── sample.liquid
│   │   ├── style-bundle.liquid
│   │   └── optional alternate sections
│   ├── snippets
│   │   ├── script-bundle.liquid.liquid
│   │   └── optional alternate sections
│   └── templates
│       ├── customers
│       │   ├── account.liquid
│       │   ├── activate_account.liquid
│       │   ├── addresses.liquid
│       │   ├── login.liquid
│       │   ├── order.liquid
│       │   ├── register.liquid
│       │   └── reset_password.liquid
│       ├── 404.liquid
│       ├── article.liquid
│       ├── blog.liquid
│       ├── cart.liquid
│       ├── collection.liquid
│       ├── collection.list.liquid
│       ├── gift_card.liquid
│       ├── index.liquid
│       ├── list-collections.liquid
│       ├── page.contact.liquid
│       ├── page.liquid
│       ├── product.liquid
│       └── search.liquid
├── locales
│   └── en.default.json
├── styles
│   ├── components
│   │   ├── announcement.scss
│   │   └── buttons.scss
│   │   └── hero.scss
│   │   └── index.scss
│   ├── layout
│   │   ├── theme.scss
│   │   └── optional alternate layouts
│   └── templates
│       ├── 404.scss
│       ├── article.scss
│       ├── blog.scss
│       ├── cart.scss
│       ├── collection.scss
│       ├── collection.list.scss
│       ├── gift_card.scss
│       ├── index.scss
│       ├── list-collections.scss
│       ├── page.contact.scss
│       ├── page.scss
│       ├── product.scss
│       └── search.scss
```

#### ESlint (JavaScript Guidelines)
https://github.com/airbnb/javascript

#### Stylelint (Sass Guidelines)
https://github.com/stylelint/stylelint-config-standard

#### Changelog
