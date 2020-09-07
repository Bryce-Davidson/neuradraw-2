# Summary

Neuradraw came from the desire to be able to draw complex neural network architectures with a variety of different colors and annotations. The project's conception is based in the `neuradraw` repository but continues on these different flavors and versions. Those flavors and versions are:

[`Neuradraw-node`](https://github.com/Bryce-Davidson/neuradraw-node), [`Neuradraw-ts`](https://github.com/Bryce-Davidson/neuradraw-ts) & the original [`Neuradraw`](https://github.com/Bryce-Davidson/neuradraw)

The reasons for moving on to developing on a different code base and paradigm are included below in the discontinued section.

## Discontinued Reasons

Decided that drawing on the canvas did not include many of the features in the project’s intended goals and features. While fast, the canvas object does not include an easy interface for morphing and interpolating canvas path’s as well as the lack of canvas documentation and packages to aid with the development. 

The next version of neuradraw will be written in [typescript](https://www.typescriptlang.org/) and [W3-SVG](https://www.w3.org/TR/SVG2/) to take advantage of the comprehensive libraries, documentation and support for SVG.

---

# Overview

Neuradraw-2 is a developper facing drawing paradigm with a customizable API and guided asset creation process.

Neuradraw focuses on mainly on these developper defined assets and follows a strict creation process on which there are many examples but follow the 4 main functions of:

```javascript
compute();
draw();
_draw_function();
__compute_function();
```

```javascript
// A simple basic constrolled asset

import AssetController from 'neuradraw-2';

export default class CircleBasic extends AssetController {
    // Each asset must have a name and a default drawing config
    constructor(name) {
        var default_config = {
            x:100,
            y:100,
            radius: 45,
            fill: 'red',
            stroke: 'black'
        }
        super(name, default_config)
    }

    // OPTIONAL
    compute(compute_keys){
        // Compute should handle the conditional computation of any asset state
        // and it should save it's state onto the this.state object by calling
        var some_state = {
            person: "James"
        }
        this.save("state_name", some_state)
    };

    // REQUIRED
    draw(new_config) {
        // The main draw functinon in the class needs to call super.update(new_config) 
        super.update(new_config);
        // After and only after should the internal drawing functions be called
        // Drawing functions should be called from back to front to structure the
        // painting of the asset
        this._draw_circle();
    }

    // All class based drawing commands need to reference from the this.config object.
    // And the this.state object.
    _draw_circle() {
        push();
        stroke(this.config.stroke);
        fill(this.config.fill);
        circle(this.config.x, this.config.y, this.config.radius);
        pop();
    }
}
```
