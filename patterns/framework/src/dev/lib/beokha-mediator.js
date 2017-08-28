"use strict";

let mediator = (function () {

    let subscribe = function (channel ,fn) {
        if(!mediator.channels[channel]) mediator.channels[channel] = [];
        mediator.channels[channel].push({context: this, callback: fn });
        return this;
    }

    let publish = function (channel) {
        if(!mediator.channels[channel]) return false;
        let args = Array.prototype.slice.call(arguments, 1);
        for(let i = 0, l = mediator.channels[channel].length; i < l; i += 1) {
            let subscription = mediator.channels[channel][i];
            subscription.callback.apply(subscription.context, args);
        }
    }

    return {
        channels: {},
        subscribe: subscribe,
        publish: publish,
        installTo: function (obj) {
            obj.subscribe = subscribe;
            obj.publish = publish;
        }
    };
})();

var obj = { name: 'sam' };

mediator.installTo(obj);
mediator.subscribe('nameChange', function(arg) {
    console.log(this.name);
    this.name = arg;
    console.log(this.name);

    console.log("================");
});
mediator.publish('nameChange', 'john'); //sam, john
mediator.publish('nameChange', 'jo'); //sam, john

/*

 var obj2 = {name: 'jjj'};
 mediator.installTo(obj2);
 obj2.subscribe('nameChange', function (arg) {
 console.log(this.name);
 this.name = arg;
 console.log(this.name);
 console.log("+++++++++++++++");
 });
 obj2.publish('nameChange', 'sas');
 obj2.publish('nameChange', 'sa');*/
