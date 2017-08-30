"use strict";

import lib from './lib/beokha-core.js';

let o = new lib;

o.action().setPaintingObj('block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6');

//console.log(o.action().getPaintingObjects());
//console.log(o.action().getPaintingObject('block_2'));

o.draw();
o.action().getPaintingObject('block_2');

o.action().setBoneStyle('block_2', {color: "red"});

//console.log(o.action.getThis());
