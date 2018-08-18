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
  // {Function} Called when handsfree.stop() is called
  onStop () {}
}
```

All plugins must have a `name` and a `callback`. Running `handsfree.use(config)` simply adds the plugin to the instance as `handsfree.plugins[name] = config`.

Plugins are then run based on their `priority`, with smaller `priority`'s running before others. If the `priority` is not set, then the priority is automatically set to be the last plugin to run. Negative numbers are fine, and so are decimals.

During each frame, the `callback` is called for each tracked pose with the following signature:

```js
{
  callback ({x, y, z, pitch, yaw, pose}) {}
}
```

::: warning 🙉 Plugin Deep Dive
The rest of this document breaks down a few simple plugins to help you understand how the different properties and callbacks work.
:::

### Plugin: BasicPointer

The `BasicPointer` plugin is enabled by default, and just places a pointer on the screen with no functionality. Here's what the plugin looks like:

```js
// A reference to the pointer element, which handsfree automatically adds for you
const $pointer = document.querySelector('.handsfree-basic-pointer')

// The actual plugin
Handsfree.prototype.use({
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

::: warning 🙈 This may already be running
If you're running a demo from a previous page, this won't do anything new.
:::

<demo>
  if (typeof handsfree === 'undefined') {
    window.handsfree = new HandsfreeModule({debug: true, autostart: true})
  } else {
    window.handsfree.update({debug: true})
    window.handsfree.plugins.BasicPointer.disabled = false
    window.handsfree.start()
  }
</demo>

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

<demo>
  if (typeof handsfree === 'undefined') {
    window.handsfree = new HandsfreeModule({debug: true, autostart: true})
    window.handsfree.plugins.BasicPointer.disabled = true
  } else {
    window.handsfree.start()
    window.handsfree.plugins.BasicPointer.disabled = true
  }
</demo>

Notice how the pointer stopped updating it's position. You can re-enable it with:

```js
handsfree.plugins.BasicPointer.disabled = false
```

<demo>
  if (typeof handsfree === 'undefined') {
    window.handsfree = new HandsfreeModule({debug: true, autostart: true})
    window.handsfree.plugins.BasicPointer.disabled = false
  } else {
    window.handsfree.start()
    window.handsfree.plugins.BasicPointer.disabled = false
  }
</demo>

## Adding Page Scrolling

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

## Removing Functionality

To delete a plugin, simply delete the property, like `delete handsfree.plugins[name]`. Deleting a plugin removes it completely, and so it's probably better to disable the plugin instead.

Disabling plugins can be done by setting the `disabled` property, like `handsfree.plugin[name].disabled = true`. To re-enable the plugin, simply set it back to `false`.

::: tip 🐵 Toggle plugins whenever!
Plugins can be disabled and enabled at any time, even while `handsfree` is actively running!
:::
