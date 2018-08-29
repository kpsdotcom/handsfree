# Debugging
You can activate debug mode by passing `{debug: true}` into `Handsfree` when instantiating, and turning it off with `{debug: false}`. An additional property `{target: DOM_ELEMENT}` allows you to set where to inject the debug canvas.

By default, `target` is defined with:

```js
{
  target: document.getElementById('handsfree-debug')
}
```

If the debug container element does not exist in the DOM, then the debugger is injected at the end of the document body.

## Creating Settings Panels

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
