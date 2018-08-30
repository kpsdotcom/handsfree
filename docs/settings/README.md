# Settings
Settings refer to any `handsfree` property that you can define when [instantiating](/guide/getting-started.html#instantiating) with `new HandsfreeModule(SETTINGS)` or using the `handsfree.update(SETTINGS)` method.

Settings can be accessed via `handsfree.settings[KEY]`. The following are all of the settings available:

## `{autostart: BOOLEAN}`
**Default:** `false`

This only really affects instantiation, and is the equivalent to running the following:

```js
handsfree = new HandsfreeModule()
handsfree.start()
```

Running `handsfree.update({autostart: true})` after instantiating `HandsfreeModule` has no affect.

## `{facingMode: STRING|OBJECT}`
**Default:** `"user"`

Sets the [MediaTrackConstraints facingMode](https://developer.mozilla.org/en-US/docs/Web/API/MediaTrackConstraints/facingMode), which represents the side or the direction (on adjustable cameras) to face.

The following `STRINGS` are accepted:

```bash
"user"        # The front camera on mobile devices or the webcam on laptops
"environment" # The camera facing away from the user or a phone's back camera
"left"        # The camera facing to the left of the user
"right"        # The camera facing to the left of the user
```

Additionally, you can pass a constraining object, such as:

```js
{exact: "user"}
```

```js
handsfree.stop()
handsfree.update({facingMode: {exact: 'environment'}})
handsfree.start()
```

<demo/>

::: danger 🙊 Possible crash warning
The above demo will crash if you don't have an environment facing camera since we're explicitely saying that we want it. Run the following if it does break to correct it.
:::

```js
handsfree.stop()
handsfree.update({facingMode: 'user'})
handsfree.start()
```

<demo />
