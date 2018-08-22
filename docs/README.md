---
sidebar: false
---
<div class="roomy text-center">
  <p>
    <img src="https://media.giphy.com/media/55vsITBRKRlaosFK7I/giphy.gif" height=200>
  </p>
  <h1>handsfree.js</h1>
  <blockquote style="text-align: left">Add client side, multi-user, head-tracked-from-afar mouse cursors and handsfree user interfaces to your projects just...like...✨...that!</blockquote>

  <p><a href="guide/" class="nav-link action-button">🐵 Get Started 🐵</a></p>

  <p class="callout">I have no money or income and have been working feverishly on this <a href="https://twitter.com/LabOfOz/status/996603307589189632">since March 4th, 2018</a>. If you believe in me or the mission, please consider dropping $5 at <a href="https://cash.me/$heyozramos">$heyozramos</a>. Thanks!</p>
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
