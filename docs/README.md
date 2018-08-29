---
sidebar: false
---
<div class="roomy text-center">
  <p>
    <img src="https://media.giphy.com/media/55vsITBRKRlaosFK7I/giphy.gif" height=200>
  </p>
  <h1>handsfree.js</h1>
  <div><img src="https://img.shields.io/npm/v/handsfree.svg"> <img src="https://img.shields.io/github/last-commit/handsfreejs/handsfree.svg"> <img src="https://travis-ci.org/handsfreejs/handsfree.svg?branch=master"> <img src="https://img.shields.io/codecov/c/github/handsfreejs/handsfree/master.svg?style=flat"></div>
  <br>
  <blockquote style="text-align: left">Add client side, multi-user, head-tracked-from-afar mouse cursors and handsfree user interfaces to your projects just...like...✨...that!</blockquote>

  <p><a href="guide/" class="nav-link action-button">🐵 Get Started 🐵</a></p>

  <p class="callout">This project is made possible by Patrons on Patreon <a href="https://patreon.com/labofoz"><img src="https://c5.patreon.com/external/logo/become_a_patron_button@2x.png" width=200 style="margin-left: 10px"></a></p>
</div>

## It's really easy!

#### Via HTML
```html
<script src="https://unpkg.com/handsfree"></script>
```

#### Or NPM
```bash
npm i handsfree
```

#### Then in your project
```html
<script>
  const HandsfreeModule = require('handsfree')
  const handsfree = new HandsfreeModule({autoPointers: true, autoStart: true})
</script>
```
