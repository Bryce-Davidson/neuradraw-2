Neuradraw-2 is a developper facing drawing paradigm with a customizable API and guided asset creation process.

The point of neuradraw-2 is to be able to define your own custom assets and expose the abstracted drawing configurations to that asset in order for neuradraw to take control.

Neuradraw focuses on developper defined assets and follows a strict creation process on which there are many examples but follow the 4 main functions of:

```javascript
compute();
draw();
_draw_function();
__compute_function();
```

You can create your own custom asset from scratch and extend one of the many contrllers to get it up and running

state is readable as an object but should be saved with the function

```javascript
// A simple basic contrlled asset

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