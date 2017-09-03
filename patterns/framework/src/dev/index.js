"use strict";

import beo from './lib/beokha-core.js';
import iterator from './lib/beokha-iterator.js';

let o = new beo;

o.action().setPaintingObj('block_1', 'block_2', 'block_3', 'block_4', 'block_5', 'block_6');


o.action().setStyle('block_2', {bone: {color: "red", size: 4}, dot: {color: 'blue', size: '10'}}   );
o.action().setConfig({initOnClick: false}); // false default
o.draw();

console.log(o);
