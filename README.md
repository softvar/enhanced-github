This only works for Chrome or anything downstream of Chromium. Unless you're in alpha launch, you won't be able to use this directly with cloud hosted Turbosrc. You'll have to launch it locally or on the cloud yourself and edit where necessary to do so. Further documentation is forthcoming.

## extension install

Clone the repo.

```
git clone https://github.com/turbo-src/extension
```

Install.

`yarn install`

Build everything.

`yarn devLocal`

Build for online endpoint

`yarn devOnline`

But you'll need a config.devOnline.json in the project root directory.

```
{
    "port": "https://your-domain"
}
```

Note you'll likely want to setup you endoint so that you don't need to append `/graphql` to the port.

The above command will create or update a `dist/` directory, which is used to load the extension.

1. Go to extension page. For chrome extensions [chrome://extensions](chrome://extensions).

2. Enable developer mode.

3. Click on load unpacked extension and select the `dist/` folder.
