# Neuradraw-2

A simple drawing paradigm with guided asset creation for mathematical animations and images.

## Summary

Neuradraw came from the desire to be able to draw complex neural network architectures with a variety of different colors and annotations. The project's conception is based in the `neuradraw` repository but continues on these different flavors and versions. Those flavors and versions are:

[`Neuradraw-node`](https://github.com/Bryce-Davidson/neuradraw-node), [`Neuradraw-ts`](https://github.com/Bryce-Davidson/neuradraw-ts) & the original [`Neuradraw`](https://github.com/Bryce-Davidson/neuradraw)

The reasons for moving on to developing on a different code base and paradigm are included below in the discontinued section.

# Discontinued Reasons

Decided that drawing on the canvas did not include many of the features in the project’s intended goals and features. While fast, the canvas object does not include an easy interface for morphing and interpolating canvas path’s as well as the lack of canvas documentation and packages to aid with the development. 

The next version of neuradraw will be written in [typescript](https://www.typescriptlang.org/) and [W3-SVG](https://www.w3.org/TR/SVG2/) to take advantage of the comprehensive libraries, documentation and support for SVG.


# Table of Contents

- [Neuradraw-2](#neuradraw-2)
  - [Summary](#summary)
- [Discontinued Reasons](#discontinued-reasons)
- [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [Installation](#installation)
- [Drawing Example](#drawing-example)
- [Guided Asset Creation](#guided-asset-creation)
  - [Draw Lifecycle Methods](#draw-lifecycle-methods)
  - [Primitive Shapes](#primitive-shapes)
- [Asset Controllers](#asset-controllers)
  - [Asset Controller](#asset-controller)
  - [Animation Controller](#animation-controller)
  - [Scene](#scene)
  - [Timeline](#timeline)
- [Asset Animation](#asset-animation)

# Overview

Neuradraw-2 is a developer facing drawing paradigm with a customizable API and guided asset creation.


Neuradraw-2 focuses on giving developers the ability to design and define their own assets and extend one of the AssetControllers to give thier assets easy to use animation controls.

Through the asset creation process the developper will define simple functions included within thier asset class such as:


```javascript
compute();
draw();
_draw_function();
__compute_function();
```
Examples can be seen below.

# Installation

To install `Neuradraw-2` run the command:

`git clone https://github.com/Bryce-Davidson/neuradraw-2`

And then run `npm install`

# Drawing Example

Inside `index.js`

# Guided Asset Creation
## Draw Lifecycle Methods
## Primitive Shapes
# Asset Controllers
## Asset Controller
## Animation Controller
## Scene
## Timeline
# Asset Animation