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

        let i, len;

        for(i = 0, len = this.paintingObj_list.length ; i < len ; i += 1) {

            // TODO: Rewrite function: Find and delete all canvas on page after calling 'draw' method


            this.paintingObj_list[i].elem.addEventListener('click', function(e) {
                let src;
                e = e || window.e;
                src = e.target;

                checkForCanvasInDOM(src);
                //facade.stopDef(e);
            });
        }
    }

    function checkForCanvasInDOM(src) {
        // Check: IF element contain 'canvas' element
        if( src.hasChildNodes() ) {

            let children = iter(src.childNodes),
                isCanvas = false;

            while( children.hasNext() ) {

                if( children.current().nodeName.toLowerCase().includes('canvas') ) {

                    // Element contain canvas
                    isCanvas = true;

                    let canvas = children.current().remove();
                    break;
                }
                children.increase();
            }

            if( !isCanvas ) {
                createCanvasElement(src);
            }
        }
    }

    function createCanvasElement(src) {

        let canvas = document.createElement('canvas'),
            canvasClassName = src.getAttribute('id') || src.getAttribute('class') + '__canvas',
            parentSize;

        canvas.className = canvasClassName;
        canvas.classList.add('beo_canvas');
        // Add to canvas class
        canvas.classList.add('beo_canvas');

        // Get parent metrics
        parentSize = GetElemSize(src);
        // Set metrics
        canvas.setAttribute('height', `${parentSize.height}`);
        canvas.setAttribute('width', `${parentSize.width}`);

        // Add canvas to 'canvas array'
        Canvas.addCanvas(canvas);
        // Add listener to canvas
        canvas.addEventListener('mousemove', function (e) {
            Canvas.canvasAction('move', e, canvas);
        }, false);
        canvas.addEventListener('mousedown', function (e) {
            Canvas.canvasAction('down', e, canvas);
        }, false);
        canvas.addEventListener('mouseup', function (e) {
            Canvas.canvasAction('up', e, canvas);
        }, false);
        canvas.addEventListener('mouseout', function (e) {
            Canvas.canvasAction('out', e, canvas);
        }, false);

        return src.appendChild(canvas);
    }

    function GetElemSize(elem) {
        return {
            width: elem.offsetWidth,
            height: elem.offsetHeight
        }
    }
    
    let Canvas = (function Canvas() {
        let obj = {};

        obj.canvases = [];
        obj.flag = false;
        obj.prevX = null;
        obj.prevY = null;
        obj.currX = null;
        obj.currY = null;
        obj.dot = false;

        return obj;
    })();

    Canvas.addCanvas = function (newCanvas) {
        let canvas = {
            canvas: newCanvas,
            ctx: newCanvas.getContext('2d')
        };

        this.canvases.push( canvas );
    }
    Canvas.getCanvas = function (canvas) {

        let canvases = iter(Canvas.canvases);
        while(canvases.hasNext()) {
            if( canvases.current().canvas === canvas) {
                return canvases.current();
            }
            canvases.increase();
        }
    }
    Canvas.getCanvases = function () {
        return this.canvases;
    }
    Canvas.draw = function (canvas) {

        let ctx = Canvas.getCanvas(canvas).ctx;

        ctx.beginPath();
        ctx.moveTo(Canvas.prevX, Canvas.prevY);
        ctx.lineTo(Canvas.currX, Canvas.currY);
        ctx.strokeStyle = 'red';
        ctx.lineWidth = '2';
        ctx.stroke();
        ctx.closePath();

    }
    Canvas.canvasAction = function(type, e, canvas) {

        /*let currentMetrics = {
            height:
        }*/

        switch ( type ) {

            case 'down':
                Canvas.prevX = Canvas.currX;
                Canvas.prevY = Canvas.currY;
                Canvas.currX = e.clientX - canvas.getBoundingClientRect().left;
                Canvas.currY = e.clientY - canvas.getBoundingClientRect().top;

                Canvas.flag = true;
                Canvas.dot = true;

                /*if( Canvas.dot ) {
                    canvas.ctx.beginPath();
                    canvas.ctx.fillStyle = 'black';
                    canvas.ctx.fillRect(Canvas.currX, Canvas.currY, 2, 2);
                    canvas.ctx.closePath();

                    Canvas.dot = false;
                }*/

                break;

            case 'up' || 'out':
                Canvas.flag = false;
                break;

            case 'move':
                if( Canvas.flag ) {

                    Canvas.prevX = Canvas.currX;
                    Canvas.prevY = Canvas.currY;

                    Canvas.currX = e.clientX - canvas.getBoundingClientRect().left;
                    Canvas.currY = e.clientY - canvas.getBoundingClientRect().top;

                    console.log("window: " + e.clientX + " " + e.clientY);

                    Canvas.draw(canvas);
                }
                break;

            default:
                break;
        }
    }

    return beo;
})();


export default beo;
