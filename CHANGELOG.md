- **v3.1.0** _- 6th Jan, 2020_

  - Extension only utilizes `webNavigation` history for GitHub website using webNavigation event filters. Rest assured, history of any other website is not permitted.
  - Updated README with the doc link explaining introduction of `webRequest` and `webNavigation` API for supporting single-page GitHub website.

- **v3.0.1** _- 3rd Jan, 2020_

  - Use `webNavigation` API in background to detect page-url changes
  - Remove `setInterval` and `onpopstate` for page-url change listener from `inject.js`

- **v3.0.0** _- 28th Dec, 2019_

  - Since GitHub is now SPA, changes are made to handle SPA behavior
  - Introduce background script to get web requests and append elements when page is rendered. For this, `webRequest` permission is required.
  - Minimize API hits. API call is made only when required. No calls on `onpopstate` event.
  - Refactor the entire code, made it modular
  - Permissions required:
    - `webRequest` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).
    - `webNavigation` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).

- **v2.1.0** _- 16th Nov, 2019_

  - Remove gulp and used webpack for bundling and automation
  - Remove clipboard from source code and instead use a dep bundled with (minified)inject.js
  - Remove jshint and used eslint for linting
  - Use prettier for auto-formatting files
  - Use husky and lint-staged to configure and run git-hooks

- **v2.0.3** _- 27th Oct, 2018_

  - Fix selector path for inserting _copy file_ and _download file_ buttons while viewing a file
  - Minify content script thereby saving `4KB` per request. `inject.js` from `12KB` to `4KB`

- **v2.0.2** _- 26th Oct, 2018_

  - Fix buttons alignment in options.js

- **v2.0.0** _- 09th Aug, 2018_

  - Improvement :: Update logos/icons to adhere with [GitHub logo policy](https://github.com/logos)
  - Improvement :: Show GitHub-styled tooltip when hovering hover file download link

- **v1.0.8** _- 1st May, 2018_

  - Fix :: Update classes to fix download. (Cmd/Ctr + Click) to download file

- **v0.1.8** _- 10th Mar, 2017_

  - Imporvemnt :: Use `clipboard` as a dependency and use it via `manifest.json`

- **v0.1.7** _- 10th Mar, 2017_

  - Fix :: Add proper toggle class [github changed class names] which fixes flickering while hover
  - Fix :: Dont add `td` when there's no file present.

- **v0.1.6** _- 27th Aug, 2016_

  - Fix :: not showing repo size when navigating back; fix no hash change detection

- **v0.1.5** _- 22nd Aug, 2016_

  - Feature :: Show repo size on GitHub's repo homepage
  - Fix :: bugfix of default branch other than **master**

- **v0.1.4** _- 20th Aug, 2016_

  - Improvement :: Better way of adding GitHub Access token - click extension or click options - Enhanced GitHub after opening _chrome://extension_

- **v0.1.3** _- 14th Aug, 2016_

  - Fix :: fix focus effect on up-tree not removing blank td while navigating [#3](https://github.com/softvar/enhanced-github/pull/3)

- **v0.1.2** _- 14th Aug, 2016_

  - Fix :: fix bug file on commits/<branch> url

- **v0.1.1** _- 13th Aug, 2016_

  - Initial Launch
