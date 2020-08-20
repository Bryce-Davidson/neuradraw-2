import { push, pop } from '../../../Controllers/Context/State';
import circle from '../../Primitives/Canvas/circle';
import line from '../../Primitives/Canvas/line';
import fill from '../../../Controllers/Context/Cosmetic/fill';
import stroke from '../../../Controllers/Context/Cosmetic/stroke';
import stroke_weight from '../../../Controllers/Context/Cosmetic/stroke_weight';

import includes_any from '../../../Utility/includes_any';

import AnimationController from '../../../Controllers/AnimationController';

export default class DNN extends AnimationController {
    /**
     * 
     * @param {String} name - The name of the deep neural network instance
     * @param {Number} frameIn - The name of the deep neural network instance
     * @param {Number} frameOut - The name of the deep neural network instance
     * @param {Object} default_config - The default drawing config
     * @param {Number} default_config.x - The default x value for the DNN
     * @param {Number} default_config.y - The default y value for the DNN
     * @param {Number} default_config.diameter - The default node diameter value for the DNN
     * @param {Number} default_config.layer_spacing - The default layer spacing for the DNN
     * @param {Number} default_config.node_spacing - The default node spacing for the DNN
     * @param {[Number] | Number} default_config.weight_colors - The default weight color(s) for the DNN
     * @param {[Number] | Number} default_config.weight_thicknesses - The default weight thickneses for the DNN
     */
    constructor(name, frameIn, frameOut, default_config) {
        super(name, frameIn, frameOut, default_config);
        this.save({ layer_configs: [], edges: [] })
    }

    draw(new_config) {
        super.update(new_config);

        if(this.state.layer_configs.length==0)
            throw new Error('Layer configs is empty, please add a layer using add_layer()');

        this._draw_edges();
        this._draw_nodes();
        return;
    }

    compute(compute_keys) {
        // Just need to write out what you wan't to compute etc
        if(includes_any(compute_keys, ["x", "y", "layer_spacing", "node_spacing", "diameter"])) {
            this.__compute_node_coordinates();
            this.__compute_edge_coordinates();
        }
        if(compute_keys.includes("weight_colors"))
            this.__compute_edge_colors();
        if(compute_keys.includes("weight_thicknesses"))
            this.__compute_edge_thicknesses();
    }

    add_layer(size, color, name, annotations) {
        for(var i in this.state.layer_configs)
            if(this.state.layer_configs[i].name == name)
                throw new Error(`"${name}" is already a layer in the network`)
        let new_layer = new DNNLayer(size, color, name, annotations);
        this.state.layer_configs.push(new_layer);
    }

    __compute_node_coordinates() {
        const {x, y, diameter, layer_spacing, node_spacing} = this.config;

        const vertical_spacing = diameter + node_spacing
        const horizontal_spacing = diameter + layer_spacing
        var sizes = [];

        for(var i=0; i < this.state.layer_configs.length; i++)
            sizes.push(this.state.layer_configs[i].size);

        for(var i=0; i < this.state.layer_configs.length; i++) {
            const cur_layer = this.state.layer_configs[i];
            const layer_top = vertical_spacing*(cur_layer.size+Math.max(...sizes))/2 + y;

            this.save({
                [cur_layer.name]: {
                    node_coords: [] 
                }
            })

            for(var j=0; j < cur_layer.size; j++) {
                let center_x = x + 1+diameter/2 + i*horizontal_spacing;
                let center_y = layer_top - j*vertical_spacing;

                this.save({
                    [cur_layer.name]: {
                        node_coords: [
                            ...this.state[cur_layer.name].node_coords, 
                            [center_x, center_y]
                        ] 
                    }
                })
            }
        }
    }

    __compute_edge_coordinates() {
        var cur_edge_idx = 0;
        for(var i=0; i < this.state.layer_configs.length - 1; i++) {
            var cur_layer = this.state.layer_configs[i];
            var next_layer = this.state.layer_configs[i+1];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.state[cur_layer.name].node_coords[j];
                for(var k=0; k < next_layer.size; k++) {
                    var next_node = this.state[next_layer.name].node_coords[k];
                    
                    var edge_coords = [
                        cur_node[0]+this.config.diameter/2, 
                        cur_node[1], 
                        next_node[0]-this.config.diameter/2, 
                        next_node[1],
                    ]

                    if(this.state.edges[cur_edge_idx]) {
                        for(var p=0; p < edge_coords.length; p++)
                            this.state.edges[cur_edge_idx][p] = edge_coords[p];
                    } else
                        this.state.edges.push(edge_coords);
                    cur_edge_idx++;
                }
            }
        }
    }

    __compute_edge_colors() {
        const { weight_colors } = this.config;
        const EDGE_COLOR_IDX = 4;
        for(var i=0; i < this.state.edges.length; i++) {
            let color;

            if(Array.isArray(weight_colors))
                color = weight_colors[i]
            else
                color = weight_colors || 'black';
            
            if(this.state.edges[i][EDGE_COLOR_IDX])
                this.state.edges[i][EDGE_COLOR_IDX] = color;
            else
                this.state.edges[i].push(color)
        }
    }

    __compute_edge_thicknesses() {
        const { weight_thicknesses } = this.config;   
        const EDGE_THICKNESS_IDX = 5;
        for(var i=0; i < this.state.edges.length; i++) {
            let thickness = weight_thicknesses[i] || weight_thicknesses;
            if(this.state.edges[i][EDGE_THICKNESS_IDX])
                this.state.edges[i][EDGE_THICKNESS_IDX] = thickness;
            else
                this.state.edges[i].push(thickness)
        }
    }

    _draw_edges() {
        const X_1_IDX = 0;
        const Y_1_IDX = 1;
        const X_2_IDX = 2;
        const Y_2_IDX = 3;
        const COLOR_IDK = 4;
        const EDGE_THICKNESS_IDX = 5;

        for(var i=0; i < this.state.edges.length; i++) {
            let e = this.state.edges[i];
            push();
            stroke(e[COLOR_IDK]);
            stroke_weight(e[EDGE_THICKNESS_IDX]);
            line(e[X_1_IDX], e[Y_1_IDX], e[X_2_IDX], e[Y_2_IDX])
            pop();
        }
    }

    _draw_nodes() {
        for(var i=0; i < this.state.layer_configs.length; i++) {
            var cur_layer = this.state.layer_configs[i];
            for(var j=0; j < cur_layer.size; j++) {
                var cur_node = this.state[cur_layer.name].node_coords[j];
                push();
                fill(cur_layer.color)
                stroke(cur_layer.color)
                circle(cur_node[0], cur_node[1], this.config.diameter/2);
                pop();
            }
        }
    }
    
    get num_edges() {
        var edges = 0;
        for(var i=0; i < this.state.layer_configs.length-1; i++) {
            var cur_layer = this.state.layer_configs[i];
            var next_layer = this.state.layer_configs[i+1];
            edges += cur_layer.size * next_layer.size;
        }
        return edges;
    }
}

class DNNLayer {
    constructor(size, color, name, annotations) {
        this.size = size;
        this.name = name;
        this.color = color;
        this.annotations = annotations || {};
    }

    /**
    * @param {Object} annotations - the annotations to be provided to the layer
    */
    add_annotations(annotations) {
        this.annotations = annotations;
    }
}