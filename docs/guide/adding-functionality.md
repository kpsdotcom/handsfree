# Adding Functionality

All functionality in Handsfree.js happens through plugins, which you can create with the `handsfree.use()` method. Plugins can be added and removed, enabled and disabled, and can share and reuse logic and data between them!

## `handsfree.use`

This method accepts a `config` object with the following signature:

```js
{
  // {String} [Required]
  name: '',
  // {Boolean} [Default: false]
  disabled: false,
  // {Number} [Default: Total number of plugins]
  priority: 0,
  // {Function} Called on every frame
  callback () {},
  // {Function} Called when handsfree.start() is called, or when the plugin is first initialized
  onStart () {},
  // {Function} Called when handsfree.stop() is called
  onStop () {}
}
```

All plugins must have a `name`. Running `handsfree.use(config)` simply adds the plugin to the instance as `handsfree.plugins[name] = config`.

Plugins are then run based on their `priority`, with smaller `priority`'s running before others. If the `priority` is not set, then the priority is automatically set to be the last plugin to run. Negative numbers are fine, and so are decimals.

During each frame, the `callback` is called for each tracked pose with the following signature:

```js
{
  callback ({x, y, z, pitch, yaw, pose}) {}
}
```

Additionally the `onStart` and `onStop` callbacks are called when `handsfree.start()` or `handsfree.stop()` are called. `onStart` is also called when the plugin is first initialized via `handsfree.use()` if `autostart` is true.

::: warning 🙉 Plugin Deep Dive
The rest of this document breaks down a few simple plugins to help you understand how the different properties and callbacks work.
:::

### Plugin: BasicPointer

The `BasicPointer` plugin is enabled by default, and just places a pointer on the screen with no functionality. Here's what the plugin looks like:

```js
// A reference to the pointer element, which handsfree automatically adds for you
const $pointer = document.querySelector('.handsfree-basic-pointer')

// The actual plugin
HandsfreeModule.prototype.use({
  name: 'BasicPointer',
  priority: 0,
  disabled: false,

  /**
   * Position the cursor
   */
  callback: ({x, y}) => {
    $pointer.style.left = `${x}px`
    $pointer.style.top = `${y}px`
  },

  /**
   * "Hide" the cursor
   */
  onStop: () => {
    $pointer.style.left = '-100px'
    $pointer.style.top = '-100px'
  }
})
```

As you can see, the cursor's position is updated on every frame! And while we're only actively using the `y` argument, we also have access to the following:

```js
// x    = The x position on the screen that you're facing in pixels
// y    = The y position on the screen that you're facing in pixels
// z    = How far away you are from the screen
// tilt = The degree of your head tilted up and down
// yaw  = The degree of your head rotated left and right
// pose = Other raw pose data, which are used to derive the above
callback({x, y, z, tilt, yaw, pose}) {}
```

### Disabling and Enabling Plugins

You can disable the plugin by running `handsfree.plugins[name].disabled = true`. In this case, we'll do it with:

```js
handsfree.plugins.BasicPointer.disabled = true
```

<demo/>

Notice how the pointer stopped updating it's position. You can re-enable it with:

```js
handsfree.plugins.BasicPointer.disabled = false
```

<demo/>

Finally, you'll notice the `onStop` method, which "hides" the pointer from view. This method is called whenever `handsfree.stop()` is called, and is useful for cleaning up any plugin code.

If you inspect your console, you'll see the pointer is correctly set to `(-100px, -100px)` when you stop the `handsfree`:

```js
handsfree.stop()
```

<demo/>

::: tip 🐵 Toggle plugins whenever!
Plugins can be disabled and enabled at any time, even while `handsfree` is actively running!
:::


## Adding Page Scrolling

Let's experiment with adding some functionality in real-time! Hit one of the demos above to start the webcam. Then, copy/paste the following in your [browsers console](https://webmasters.stackexchange.com/a/77337):

```js
// Add the plugin
handsfree.use({
  // The name for this plugin
  name: 'demoPageScrolling',

  // This runs on every frame, for every tracked pose
  callback: ({y}) => {
    // Scroll up when you face above the screen
    if (y < 0)
      // The 0.05 is just to slow down the rate at which you scroll
      window.scrollTo(0, window.scrollY + y * 0.05)
    // Scroll down when you face below the screen
    else if (y > window.innerHeight)
      window.scrollTo(0, window.scrollY + (y - window.innerHeight) * 0.05)
  }
})
```

You should now be able to scroll the page! Try experimenting with disabling the `BasicPlugin` as well. What you should notice is that while the cursor disappears, you're still able to scroll the page.

This is because these are two separate plugins working off of the same underlying data.

## Removing Functionality

To delete a plugin, simply delete the property, like `delete handsfree.plugins[name]`. Deleting a plugin removes it completely, and so it's probably better to disable the plugin instead.
