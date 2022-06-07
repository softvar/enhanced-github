See service tags to see which versions are compatible.

Please make sure you're signed into Github when using this extension for the time being. Working on it so you don't have to.


## extension install

Clone the repo.

```
git clone https://github.com/turbo-src/extension turbosrc-extension`
```

Install.

```
yarn install
```

Build everything.

`yarn dev`

The above command will create or update a `dist/` directory, which is used to load the extension.

## load the extension

1. Go to extension page. For chrome extensions [chrome://extensions](chrome://extensions).

2. Enable developer mode.

3. Click on load unpacked extension and select the generated folder.

## Permissions required

- `"*://*.github.com/*"` - for running on `github.com` domain.
- `storage` - for storing GitHub access token on your local system. GitHub Access token is required for private repos and for handling API rate-limiting issues.
- `webRequest` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).
- `webNavigation` - to support GitHub being a single-page-application now. Read this [detailed blog](https://medium.com/@softvar/making-chrome-extension-smart-by-supporting-spa-websites-1f76593637e8).

## GitHub API Rate Limiting

Since this extension fetches data using GitHub public v3 API for showing file _size_ and _download_url_, it consumes free quota which is very less [GitHub API Rate Limiting](https://developer.github.com/v3/rate_limit/).

To tackle this, create a new GitHub Access Token.

1. If logged-in, visit [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Generate a new token, select `repo` scope and create a one.
3. Copy and store the generated token which looks something like: `17c1a8d5b399d66b6212382d98d4c67a94d58955` (a fake one :P).
4. Click on extension icon and then on `Settings-Options` on top right.

   OR

   Right-click on extension and click on `Options` in the dropdown menu.

5. Enter the valid GitHub Access Token
6. Click on `SAVE` and Enjoy the benefits.

This browser extension will automatically pick this valid access token and Bingo!

## Screenshots

## Demos

https://www.youtube.com/watch?v=9c75aMLMUng

## Libraries Used

- Thanks to [@zenorocha](https://github.com/zenorocha/) for [Clipboard.js](https://github.com/zenorocha/clipboard.js) - Modern copy to clipboard. No Flash. Just 3kb gzipped.

## Development

1. `git clone https://github.com/turbo-src/extension turbo-src-extension`
2. Run `yarn dev` for generating packaged folder specifically for extension stuff.
3. Go to extension page. For chrome extensions [chrome://extensions](chrome://extensions), Firefox Add-ons [about:debugging](about:debugging), and Microsoft Edge Extensions [edge://extensions/](edge://extensions/).
4. Enable developer mode
5. Click on load unpacked extension and select the generated folder.
6. [Admin Access Only] - run `yarn build` for generating zip file to be uploaded on _Chrome Web Store_, _Firefox Add-ons_, and _Microsoft Edge Addons_.
