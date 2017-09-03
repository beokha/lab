"use strict";
import iter from './beokha-iterator.js';
import facade from './beokha-facade.js';

let beo = (function () {
    function beo() {
        this.paintingObj_list = [];

        this.config = function (  ) {
            let obj = {};

            obj.initOnClick = false;

            return obj;
        }();
    }

    beo.prototype.action = function() {
        let getThis = (() => {
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
                let holst = this.getPaintingObject(obj);

                for(let key in style) {
                    if(style.hasOwnProperty(key)) {
                        if(!holst.style) { holst.style = {}; }
                        holst.style[key] = style[key];
                    }
                }
            },
            setConfig =  ( config ) => {

                for(let key in config) {
                    if(config.hasOwnProperty(key)) {

                        this.config[key] = config[key];
                    }
                }

                return this;
            };

        return {
            setPaintingObj: setPaintingObj,
            getPaintingObject: getPaintingObject,
            getPaintingObjects: getPaintingObjects,
            setStyle: setStyle,
            setConfig: setConfig
        }
    }

    beo.prototype.draw = function () {

        if(this.config.initOnClick) {
            let i, len, that = this;

            for(i = 0, len = this.paintingObj_list.length ; i < len ; i += 1) {
                                                // TODO: Rewrite function: Find and delete all canvas on page after calling 'draw' method
                this.paintingObj_list[i].elem.addEventListener('click', function(e) {
                    let src;
                    e = e || window.e;
                    src = e.target;


                                                // TODO: Hack - why new listener on the Canvas create?
                    if(src.tagName.toLowerCase() === 'canvas') { return; }

                    let srcIdent = iter(src.attributes),
                        srcIdentValue;

                    while(srcIdent.hasNext()) {

                        srcIdentValue = (srcIdent.current().name === 'class') ? src.className
                                            : src.id;

                        if(srcIdentValue != null) { break; }
                        srcIdent.increase()
                    }

                    let virtualElem = that.action().getPaintingObject(srcIdentValue);
                    checkForCanvasInDOM(virtualElem.elem, virtualElem);
                });
            }
        } else {

            this.paintingObj_list.map((holst) => {
                checkForCanvasInDOM(holst.elem, holst);
            });
        }

    }

    function checkForCanvasInDOM(src, holst) {
        // Check: IF element contain 'canvas' element
        if( src.hasChildNodes() ) {

            let children = iter(src.childNodes),
                isCanvas = false;

            while( children.hasNext() ) {

                if( children.current().nodeName.toLowerCase().includes('canvas') ) {

                    // Element contain canvas
                    isCanvas = true;
                    // TODO: Bad
                    children.current().remove();
                    break;
                }
                children.increase();
            }

            if( !isCanvas ) {
                createCanvasElement(src, holst);
            }
        }
    }

    function createCanvasElement(src, holst) {

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


        // Set style if exist
        // Add canvas to 'canvas array'
        Canvas.addCanvas(canvas, holst.style);
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

        src.appendChild(canvas);
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

        obj.canvasOutTimeout = null;

        return obj;
    })();

    Canvas.addCanvas = function (newCanvas, style) {
        let canvas = {
            canvas: newCanvas,
            ctx: newCanvas.getContext('2d'),
            style: style
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

        let ctx = Canvas.getCanvas(canvas).ctx,
            style = Canvas.getCanvas(canvas).style;

        ctx.beginPath();
        ctx.moveTo(Canvas.prevX, Canvas.prevY);
        ctx.lineTo(Canvas.currX, Canvas.currY);
                                                                                                                        // TODO: Canvas bone style
        ctx.strokeStyle = (!style) ? 'black' : (style.bone) ? style.bone.color : 'black';
        ctx.lineWidth = (!style) ? '2' : (style.bone) ? style.bone.size : '2';
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

                if( Canvas.dot ) {
                    let ctx = Canvas.getCanvas(canvas).ctx,
                        style = Canvas.getCanvas(canvas).style,
                        dotSize = 3;

                    ctx.beginPath();

                    ctx.fillStyle = (!style) ? 'black' : (style.dot) ? style.dot.color : 'black';
                    dotSize = (!style) ? '3' : (style.dot) ? style.dot.size : '3';
                    ctx.fillRect(Canvas.currX, Canvas.currY, dotSize, dotSize);

                    ctx.closePath();

                    Canvas.dot = false;
                }

                break;

            case 'up':
                Canvas.flag = false;
                break;

            case 'out':

                Canvas.currX = 0;
                Canvas.currY = 0;

                Canvas.canvasOutTimeout = setTimeout(function (  ) {
                    Canvas.flag = false;
                }, 1000);

                break;

            case 'move':

                if( Canvas.flag ) {

                    clearTimeout(Canvas.canvasOutTimeout);

                    if(Canvas.currX === 0 || Canvas.currY === 0) {
                        Canvas.prevX = e.clientX - canvas.getBoundingClientRect().left;
                        Canvas.prevY = e.clientY - canvas.getBoundingClientRect().top;
                    } else {
                        Canvas.prevX = Canvas.currX;
                        Canvas.prevY = Canvas.currY;
                    }

                    Canvas.currX = e.clientX - canvas.getBoundingClientRect().left;
                    Canvas.currY = e.clientY - canvas.getBoundingClientRect().top;

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
