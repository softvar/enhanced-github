- **v3.0.0** _- 28th Dec, 2019_

  - Since GitHub is now SPA, changes are made to handle SPA behavior
  - Introduced background script to get web requests and append elements when page is rendered. For this, `webRequest` permission is required.
  - Minimize API hits. API call is made only when required. No calls on `onpopstate` event.
  - Refactored the entire code, made it modular

- **v2.1.0** _- 16th Nov, 2019_

  - Remove gulp and used webpack for bundling and automation
  - Remove clipboard from source code and instead use a dep bundled with (minified)inject.js
  - Remove jshint and used eslint for linting
  - Used prettier for auto-formatting files
  - Used husky and lint-staged to configure and run git-hooks

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
