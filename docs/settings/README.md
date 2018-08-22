# Settings
Settings refer to any `handsfree` property that you can define when [instantiating](/guide/getting-started.html#instantiating) with `new HandsfreeModule(SETTINGS)` or using the `handsfree.update(SETTINGS)` method.

Settings can be accessed via `handsfree.settings[KEY]`. The following are all of the settings available:

## `{target: DOM_ELEMENT}`
**Default:** `document.getElementById('handsfree-debug')`

This setting lets you set where to inject the debug video and canvas. If omitted during instantiation, `handsfree` will first search the DOM for an element with ID `handsfree-debug`. If one isn't found, and no element is provided, then the debugger will be injected at the end of the document.

`target`'s are given a class of `.handsfree-debug-wrap`, allowing you to add custom styles.

You can also update the location of the debugger, which is useful in Single Page Applications after a route change where the previous target was removed.

The following example demonstrates updating the `target` after instantiation to move it above this codeblock, and then puts it back in the sidebar after 3 seconds.

<div id="demo-target-change-wrap"></div>

```js
handsfree.update({target: document.getElementById('demo-target-change-wrap')})
handsfree.start()

setTimeout(() => {
  handsfree.update({target: document.getElementById('handsfree-debug')})
  console.log('moved')
}, 3000)
```
<demo/>
