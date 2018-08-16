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
