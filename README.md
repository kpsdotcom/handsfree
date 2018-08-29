# Handsfree.js

<div align="center">
  <p><img src="https://media.giphy.com/media/55vsITBRKRlaosFK7I/giphy.gif"></p>
  <p><img src="https://travis-ci.org/handsfreejs/handsfree.svg?branch=master"> <img src="https://img.shields.io/codecov/c/github/handsfreejs/handsfree/master.svg?style=flat">
  <img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg">
  <img src="https://img.shields.io/npm/v/handsfree.svg">
</div>

> Add client side, multi-user, head-tracked-from-afar mouse cursors and handsfree user interfaces to your projects just...like...✨...that!

## Links
- Documentation: https://handsfree.js.org
- Patreon: https://patreon.com/labofoz

## Requirements
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/lang/en/docs/install/) (optional)

## Building
**Note:** If you didn't install Yarn, replace `yarn` below with `npm run` instead.


```bash
# Install with yarn
yarn              # and `yarn --only=dev` if you have global NODE_ENV=production
# or npm
npm install

# Working on the module
yarn dev          # Development mode with stylus, templates, and hot-reload on localhost:8080
yarn build        # Build into /dist/
yarn test         # Run unit tests

# Working on the docs
yarn docs:dev     # Work on the docs in development mode with hotreload
yarn docs:build   # Build the docs
yarn docs:build   # Build and deploy docs
```

## Development

The module entry point is `/src/Handsfree.js`, and would is a great place to start.

We also provide `/sandbox/index.pug` and `/sandbox/index.js` for experimenting with the project as you develop. **Please do not commit files in /sandbox/**, it's a convenience folder for everyone with sane boilerplate code. The [Pug (formerly Jade)](https://pugjs.org/api/getting-started.html) file is essentially HTML without the XML sugar.

## Documentation

The documentation site is located in `/docs/` and uses [VuePress](https://vuepress.vuejs.org/). Here is a sample index of documentation routes-to-source files:

```
/                             =>  /docs/README.md
/guide/                       =>  /docs/guide/README.md
/guide/getting-started.html   =>  /docs/guide/getting-started.md
/tools/                       =>  /docs/tools/README.md
/tools/browse.html            =>  /docs/tools/browse.md   
```

To run documentation locally, use `yarn docs:dev` or `npm run docs:dev`.

The following is a collection of custom components available within documentation pages:

### &lt;demo />

The Demo Component makes codeblocks placed immediately before it executable. It takes the following form:

<pre>
```js
alert('hello world!')
```

&lt;demo />
</pre>

which would render the following:

```js
alert('hello world!')
```
<img src="https://i.imgur.com/04m95cO.png" width=200>

When the <kbd>Run Demo</kbd> button is clicked, an alert box with "hello world!" is shown. To see what other sugar is added to the codeblocks behind the scenes, refer to `/docs/.vuepress/components/demo.vue`
