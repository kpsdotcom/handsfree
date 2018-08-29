# PoseNet

This section outlines settings specific to configuring the [TensorFlow.js port of PoseNet](https://github.com/tensorflow/tfjs-models/tree/master/posenet). These are a subset of `settings`, so the following are accessible at `handsfree.settings.posenet` or via instantiation with `new HandsfreeModule({posenet: CONFIG})`.

::: warning 🙈 Not all of these can be updated
Because different PoseNet settings require entirely different models, it's not currently possible to easily change some of the following settings after instantiation.
:::

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

The float multiplier for the depth (number of channels) for all convolution operations. The value corresponds to a MobileNet architecture and checkpoint. The larger the value, the larger the size of the layers, and more accurate the model at the cost of speed. Set this to a smaller value to increase speed at the cost of accuracy.

Possible values are:

```
0.50
0.75
1.0
1.01
```

## {posenet: {outputStride: INTEGER}}
**Default:** `16`

The desired stride for the outputs when feeding the image through the model. The higher the number, the faster the performance but slower the accuracy, and visa versa.

Possible values are:

```
32
16
8
```
