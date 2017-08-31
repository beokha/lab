"use strict";
import iter from './beokha-iterator.js';
import facade from './beokha-facade.js';

let beo = (function () {
    function beo() {
        this.paintingObj_list = [];
    }

    beo.prototype.action = function() {
        let init = () => {

            },
            getThis = (() => {
                return this;
            })(),
            setPaintingObj = function() {
                let args = Array.prototype.slice.call(arguments),
                    i, len;


                for(i = 0, len = args.length; i < len; i += 1) {
                    let current = args[i];
                    if(document.querySelector('#' + current)) {

                        getThis.paintingObj_list.push({ elem: document.querySelector('#' + current) });
                    }
                    if(document.querySelector('.' + current)) {

                        getThis.paintingObj_list.push({ elem: document.querySelector('.' + current) });
                    }

                }
            },
            getPaintingObject = (obj) => {
                let attr_len, attr = [],
                    list = iter(this.paintingObj_list);

                // i, len, j,
                /*for( i = 0, len = list.length ; i < len ; i += 1 ) {

                    attr_len = list[i].elem.attributes.length;
                    if(attr_len > 0) {

                        attr = list[i].elem.attributes;
                        for( j = 0 ; j < attr_len ; j += 1 ) {

                            if(( attr[j].name === "class" || attr[j].name === "id" ) && ( obj === attr[j].value )) {

                                return list[i];
                            }
                        }
                    }
                }*/

                // My realization of iterations
                while( list.hasNext() ) {

                    attr_len = list.current().elem.attributes.length;
                    if( attr_len > 0 ) {

                        attr = iter(list.current().elem.attributes);
                        while( attr.hasNext() ) {

                            if(( attr.current().name === 'class' || attr.current().name === 'id' ) && ( obj === attr.current().value )) {

                                return list.current();
                            }
                            attr.increase();
                        }
                    }

                    list.increase();
                }
            },
            getPaintingObjects = () => this.paintingObj_list,
            setStyle = function(obj, style) {
                let listObj = this.getPaintingObject(obj);

                for(let key in style) {
                    if(style.hasOwnProperty(key)) {
                        listObj[key] = style[key];
                    }
                }
            };

        return {
            init: init,
            setPaintingObj: setPaintingObj,
            getPaintingObject: getPaintingObject,
            getPaintingObjects: getPaintingObjects,
            setStyle: setStyle
        }
    }

    beo.prototype.draw = function () {

        let i, len,
            attr, attr_len,
            that = this;

        for(i = 0, len = this.paintingObj_list.length ; i < len ; i += 1) {
            this.paintingObj_list[i].elem.addEventListener('click', function(e) {
                let src;
                e = e || window.e;
                src = e.target;

                // Actually not needed check, because:
                // we set listeners on elem, of this array and here
                // we check: is our array contain element on what we clicked
                /*attr_len = src.attributes.length;
                if( attr_len > 0 ) {

                    attr = iter(src.attributes);
                    while( attr.hasNext() ) {

                        if( attr.current().name === 'class' || attr.current().name === 'id' ) {


                            if( !that.paintingObj_list.includes( attr.current().value ) ) {
                                console.log(attr.current().value);
                                console.log(that.paintingObj_list);
                                console.log('false');
                            } else {
                                console.log('true');
                            }
                            //console.log(attr.current().name + " " + attr.current().value);
                        }

                        attr.increase();
                    }
                }*/

                // Check: IF element contain 'canvas' element
                if( src.hasChildNodes() ) {

                    let children = iter(src.childNodes),
                        isCanvas = false;

                    while( children.hasNext() ) {

                        if( children.current().nodeName.toLowerCase().includes('canvas') ) {

                            // Element contain canvas
                            isCanvas = true;
                            break;
                        }
                        children.increase();
                    }

                    if( !isCanvas ) {
                        createCanvasElement(src);
                    }
                }

                facade.stopDef(e);
            });
        }
    }

    function createCanvasElement(src) {

        let canvas = document.createElement('canvas'),
            canvasClassName = src.getAttribute('id') || src.getAttribute('class') + '__canvas';

        canvas.className = canvasClassName;
        return src.appendChild(canvas);
    }

    return beo;
})();


export default beo;
