"use strict";

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
                let i, len, j, attr_len, attr = [],
                    list = this.paintingObj_list;

                for( i = 0, len = list.length ; i < len ; i += 1 ) {

                    attr_len = list[i].elem.attributes.length;
                    if(attr_len > 0) {

                        attr = list[i].elem.attributes;
                        for( j = 0 ; j < attr_len ; j += 1 ) {

                            if(( attr[j].name === "class" || attr[j].name === "id" ) && ( obj === attr[j].value )) {

                                return list[i];
                            }
                        }
                    }
                }
            },
            getPaintingObjects = () => this.paintingObj_list,
            setBoneStyle = function(obj, style) {
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
            setBoneStyle: setBoneStyle
        }
    }

    beo.prototype.draw = function () {

        let i, len;

        for(i = 0, len = this.paintingObj_list.length; i < len; i += 1) {
            this.paintingObj_list[i].elem.addEventListener('click', function(e) {
                let src;
                e = e || window.e;
                src = e.target;

                console.log(src);
            });
        }
    }

    return beo;
})();


export default beo;
