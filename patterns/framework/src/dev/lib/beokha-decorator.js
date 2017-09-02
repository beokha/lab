"use strict";
function Sale(price = 100) {
    this.price = price;
}

Sale.prototype.getPrice = function() {
    console.log("Base");
    return this.price;
}

Sale.decorators = {};
Sale.decorators.fedtax = {
    getPrice: function () {
        console.log("Fedtax");
        let price = this.uber.getPrice();
        price += price * 5 / 100;
        return price;
    }
}
Sale.decorators.money = {
    getPrice: function () {
        return `$ ${this.uber.getPrice().toFixed(2)}`;
    }
}

Sale.prototype.decorate = function (decorator) {
    let F = function () {},
        overrides = this.constructor.decorators[decorator],
        i, newobj;

    F.prototype = this;
    newobj = new F();
    newobj.uber = F.prototype;
    for(i in overrides) {
        if(overrides.hasOwnProperty(i))
            newobj[i]= overrides[i];
    }

    return newobj;
}

export default Sale;

/*
import decorator from './lib/beokha-decorator.js';

//console.log(decor);
let sale = new decorator(123);
console.log(sale.decorate('fedtax').getPrice());
//console.log(sale.g*/
