"use strict";
let iterator = (function (array) {

    let data = array,
        index = 0,
        length = data.length;

    return {
        current: function () {
          return data[index];
        },
        increase: () => {
            index += 1;
        },
        next: function() {
            if(!this.hasNext()) {
                return null;
            }

            index += 1;
            return data[index];
        },
        hasNext: function() {
            return index < length;
        }
    }
});


export default iterator;

/*
import iterator from './lib/beokha-iterator.js';

let array = [1,2,3,4,5,6,5,4,3,32,1],
    counter = iterator(array);

counter.setThis();
while (counter.hasNext()) {
    console.log(counter.next());
}
*/
