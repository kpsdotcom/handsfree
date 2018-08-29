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

# Working with both the dev (localhost:8080) and docs (localhost:8081)
yarn dev
yarn build

# Working on the module (localhost:8080)
yarn lib:dev          # Development mode with stylus, templates, and hot-reload on localhost:8080
yarn lib:build        # Build into /dist/

# Working on the docs (localhost:8081)
yarn docs:dev     # Work on the docs in development mode with hotreload
yarn docs:build   # Build the docs
yarn docs:deploy   # Build and deploy docs

yarn test         # Run unit tests
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


## License

### BRFv4
```
    Stump-based 24x24 discrete(?) adaboost frontal face detector.
    Created by Rainer Lienhart.

////////////////////////////////////////////////////////////////////////////////////////

  IMPORTANT: READ BEFORE DOWNLOADING, COPYING, INSTALLING OR USING.

  By downloading, copying, installing or using the software you agree to this license.
  If you do not agree to this license, do not download, install,
  copy or use the software.


                        Intel License Agreement
                For Open Source Computer Vision Library

 Copyright (C) 2000, Intel Corporation, all rights reserved.
 Third party copyrights are property of their respective owners.

 Redistribution and use in source and binary forms, with or without modification,
 are permitted provided that the following conditions are met:

   * Redistribution's of source code must retain the above copyright notice,
     this list of conditions and the following disclaimer.

   * Redistribution's in binary form must reproduce the above copyright notice,
     this list of conditions and the following disclaimer in the documentation
     and/or other materials provided with the distribution.

   * The name of Intel Corporation may not be used to endorse or promote products
     derived from this software without specific prior written permission.

 This software is provided by the copyright holders and contributors "as is" and
 any express or implied warranties, including, but not limited to, the implied
 warranties of merchantability and fitness for a particular purpose are disclaimed.
 In no event shall the Intel Corporation or contributors be liable for any direct,
 indirect, incidental, special, exemplary, or consequential damages
 (including, but not limited to, procurement of substitute goods or services;
 loss of use, data, or profits; or business interruption) however caused
 and on any theory of liability, whether in contract, strict liability,
 or tort (including negligence or otherwise) arising in any way out of
 the use of this software, even if advised of the possibility of such damage.
```
