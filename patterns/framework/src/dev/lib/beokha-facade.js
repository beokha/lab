'use strict';

let facade = {

    stopDef: function (e) {

        e = e || window.e;

        // All browser
        if ( e.preventDefault === 'function' ) {

            e.preventDefault();
        }

        if( e.stopPropagation === 'function' ) {

            e.stopPropagation();
        }

        // IE
        if( e.returnValue === 'boolean' ) {

            e.returnValue = false;
        }

        if ( e.cancelBubble === 'boolean' ) {
            e.cancelBubble = true;
        }
    }

}

export default facade;