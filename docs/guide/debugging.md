# Debugging
You can activate debug mode by passing `{debug: true}` into `Handsfree` when instantiating, and turning it off with `{debug: false}`. An additional property `{target: DOM_ELEMENT}` allows you to set where to inject the debug canvas.

By default, `target` is defined with:

```js
{
  target: document.getElementById('handsfree-debug')
}
```

If the debug container element does not exist in the DOM, then the debugger is injected at the end of the document body.
