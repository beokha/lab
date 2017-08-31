"use strict";

import beo from './lib/beokha-core.js';
import iterator from './lib/beokha-iterator.js';

let o = new beo;

o.action().setPaintingObj('block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6');

//console.log(o.action().getPaintingObjects());
//console.log(o.action().getPaintingObject('block_2'));

o.draw();
o.action().getPaintingObject('block_2');

o.action().setStyle('block_2', {bone: {color: "red"}}   );

//console.log(o.action.getThis());
