# Getting Started
::: danger 🙊 Assumptions
It's assumed that you have working knowledge of JavaScript. No other knowledge or experience is assumed (`handsfree` handles all the math/logic for you). If you're new to JavaScript, the [first 7 free lessons on Codecademy](https://www.codecademy.com/learn/introduction-to-javascript) are more than sufficient!
:::

## Installing from CDN
**This is the easiest and recommended solution**. Simply paste the following line anywhere in your projects `<head></head>`:

```html
<script async src="https://unpkg.com/handsfree@^1"></script>
```

This will inject the latest stable version `1` and create a global `HandsfreeModule` object, giving you the absolute latest bug fixes and features for version `1`. Then when version `2` is released with a potentially different API, you'll have to manually update the tag to:

```html
<script async src="https://unpkg.com/handsfree@^2"></script>
```

Finally, if you want the absolute bleeding edge (recommended only for development), you can simply remove the version number:

```html
<script async src="https://unpkg.com/handsfree"></script>
```

::: tip 🐵 Section Recap:
For almost everyone reading this, use <code>&lt;script src="https://unpkg.com/handsfree@^1">&lt;/script></code>
:::

## Installing with NPM
::: warning 🙈 This section is for advanced usage
&nbsp;
:::

If you want more control over the source code or are developing for offline environments, you can also install handsfree.js via NPM with:

```bash
npm i handsfree
```

You must then require `handsfree` in your scripts with:

```js
const HandsfreeModule = require('handsfree')
```

## Instantiating
After following one of the install steps above, you'll then have a `HandsfreeModule` class which you can instantiate with:

```js
let settings = {
  // your starting settings here
}
const handsfree = new HandsfreeModule(settings)
```

::: tip 🐵 Instantiate once per webcam
For the vast majority of applications, you'll only need one `handsfree` instance. However, there may be cases where you'll want to run multiple webcams on a single page (for example, to have both the front or back camera on a mobile).
:::

## Turning the Webcam On
Speaking of webcams, let's try the most basic example! Let's load your webcam into the sidebar, along with the PoseNet overlay data. We can do this in one of two ways:

**During instantiation:**

```js
const handsfree = new HandsfreeModule({debug: true, autostart: true})
```

**After instantiation:**

```js
handsfree.update({debug: true})
handsfree.start()
```

<demo>
if (typeof handsfree === 'undefined') {
  window.handsfree = new HandsfreeModule({debug: true, autostart: true})
} else {
  window.handsfree.update({debug: true})
  window.handsfree.start()
}
</demo>

## Turning the Webcam Off

Turning off the webcam is as simple as:

```js
handsfree.stop()
```

<demo>
if (typeof handsfree === 'undefined') {
  window.handsfree = new HandsfreeModule()
} else {
  window.handsfree.stop()
}
</demo>
