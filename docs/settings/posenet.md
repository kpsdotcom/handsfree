# PoseNet

This section outlines settings specific to configuring the [TensorFlow.js port of PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet). These are a subset of `settings`, so the following are accessible at `handsfree.settings.posenet` or via instantiation with `new HandsfreeModule({posenet: CONFIG})`.

::: tip 🐵 Demo via the settings panel
The following can be demoed by adjusting the settings in the settings panel!
:::

## {posenet: {imageScaleFactor: INTEGER}}
**Default:** `0.2`

A number between 0.2 and 1.0 representing what to scale the image by before feeding it through the network. Set this number lower to scale down the image and increase the speed when feeding through the network at the cost of accuracy.

## {posenet: {maxUsers: INTEGER}}
**Default:** `1`

The maximum number of users to track. There is a noticeable performance drop when switching to more than 1, but the difference between having more 2 or 5 or even 20 is negligable.

::: warning 🙈 Only one pointer is shown currently with BasicPointer
The BasicPointer plugin only shows one pointer per person. This is simply because I don't have extra people to test with. However, you still have access to everyone's data and still create multi-user projects.
:::

## {posenet: {minPartConfidence: NUMBER}}
**Default:** `0.5`

The minimum confidence score for an individual keypoint, like the nose or a shoulder, to be detected.

## {posenet: {minPoseConfidence: NUMBER}}
**Default:** `0.1`

The minimum overall confidence score required for the a pose/person to be detected.

## {posenet: {multiplier: NUMBER}}
**Default:** `0.75`

::: warning 🙈 Cannot yet be edited in realtime
Changing this value would require an entirely different PoseNet model, and so it's not currently possible to edit this in realtime. To change it, simply destroy the existing `handsfree` instance and instantiate it with a new one.
:::

The float multiplier for the depth (number of channels) for all convolution operations. The value corresponds to a MobileNet architecture and checkpoint. The larger the value, the larger the size of the layers, and more accurate the model at the cost of speed. Set this to a smaller value to increase speed at the cost of accuracy.

Possible values are:

```
0.50
0.75
1.0
1.01
```

## {posenet: {nmsRadius: INTEGER}}
**Default:** `20`

Non-maximum suppression part distance. It needs to be strictly positive. Two parts suppress each other if they are less than nmsRadius pixels away.


## {posenet: {scoreThreshold: INTEGER}}
**Default:** `0.5`

Only return instance detections that have root part score greater or equal to this value.
