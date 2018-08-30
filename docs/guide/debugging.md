# Debugging
You can activate debug mode by passing `{debug: true}` into `Handsfree` when instantiating, and turning it off with `{debug: false}`. You can also toggle debug mode with `handsfree.update({debug: BOOLEAN})` after instantiating.

Additionally, you can turn specific debug features on and off. To do so, set any of the following:

```js
{
  debug: {
    canvas: BOOLEAN || {show: BOOLEAN, parent: DOM},
    settings: BOOLEAN || {show: BOOLEAN, parent: DOM},
    stats: BOOLEAN || {show: BOOLEAN, parent: DOM}
  }
}
```

For example, to hide only the settings:

```js
handsfree.update({debug: {settings: false}})
handsfree.start()
```

<demo/>

To set where the debug canvases are placed, use the form `debug.FEATURE.parent = DOM`:

```js
new HandsfreeModule({
  debug: {
    canvas: {
      show: true,
      parent: document.getElementById('#my-target')
    }
  }
})
```

## Adding Settings Panels

Handsfree provides a simple settings panel API via [dat.gui](https://github.com/dataarts/dat.gui), which is accessible via `handsfree.gui`. The best way to see how this works is by creating a simple plugin:

```js
const guiDemoSettings = {
  flipBasicPointerColors: false
}

handsfree.use({
  name: 'guiDemo',
  onInit () {
    // Add a new folder
    this.gui.addFolder('GUI Demo')

    // Add a checkbox that flips the colors used by the basic plugin
    this.gui.add(guiDemoSettings, 'flipBasicPointerColors').onChange(() => {
      // Get the GUI of the Basic Pointer plugin
      const gui = this.gui.__folders['Basic Pointer'].__controllers
      // Get the colors
      const bg = gui[2].getValue()
      const border = gui[3].getValue()
      // Set colors
      gui[2].setValue(border)
      gui[3].setValue(bg)
    })
  }
})

handsfree.start()
```
<demo/>

Here's what's happening:
- First we add a plugin with `handsfree.use()`
- When the plugin is initialized, we add a folder to the settings panel called "GUI Demo"
- Inside that folder, we add a checkbox with `handsfree.gui.add()`
- When the checkbox state is changed, we dig into the `Basic Pointer` folder and flip the values of the cursors background/border colors

You should end up with something like this:

<img src="https://i.imgur.com/b1Fn8rVl.png" width=300>
