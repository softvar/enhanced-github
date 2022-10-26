Unless you're in alpha launch, you won't be able to use this directly with cloud hosted Turbosrc. You'll have to launch it locally or on the cloud yourself and edit where necessary to do so. Further documentation is forthcoming.

## extension install

Clone the repo.

```
git clone https://github.com/turbo-src/extension
```

Install.

`yarn install`

Build everything.

`yarn dev`

The above command will create or update a `dist/` directory, which is used to load the extension.

1. Go to extension page. For chrome extensions [chrome://extensions](chrome://extensions).

2. Enable developer mode.

3. Click on load unpacked extension and select the `dist/` folder.
