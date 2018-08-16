# Introduction
## What is handsfree.js?
Handsfree.js is a computer vision JavaScript library designed to help you add head- and arm-tracked mouse pointers and handsfree interfaces to your projects. It's essentially just a thin wrapper around [Tensorflow.js's PoseNet port](https://github.com/tensorflow/tfjs-models/tree/master/posenet) that:

- Initializes PoseNet
- Calculates where on the screen you're facing
- Approximates how far from the screen you are
- Has a plugin architecture, allowing the community to share functionality

::: tip 🐵 As you work with handsfree.js, keep the following in mind:
Anything - <i>literally anything</i> - that you can do on a mobile device right now with one finger is possible to do handsfree with handsfree.js!
:::

## How It Works

Handsfree.js adds a `<video>` and `<canvas>` tag to the page. The `<video>` is used to contain the webcam feed (adaptable to either the front or rear camera), and the `<canvas>` contains debug information. On a blank page, it looks like this:

```js
// Import the Handsfree.js module
const HandsfreeModule = require('handsfree')
// Initialize a Handsfree instance, autostart it, and display debug info
const handsfree = new HandsfreeModule({autoStart: true, debug: 'sidebar-container'})
```

## Follow Along with Dev Tool's

Because of how easy it is to work with `handsfree`, all of the examples on this site are designed to be run within [your browser's JavaScript console](https://webmasters.stackexchange.com/a/77337). Simply type `handsfree.start()` to run the demo on the page!

::: tip 🐵 A note about these demos:
This site is designed to be read sequentially, with each section building on the last. As you navigate around, the `handsfree` state travels with you. If you refresh the page or accidently add breaking code, simply type `handsfree.start()` to "reset" the state.
:::
