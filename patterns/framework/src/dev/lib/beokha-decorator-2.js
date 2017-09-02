"use strict";

function Sale(price = 100) {
    this.price = price;
    this.decorators_list = [];
}
Sale.prototype.decorate = function (decorator) {
    this.decorators_list.push(decorator);
    return this;
}
Sale.prototype.getPrice = function () {
    let price = this.price,
        i,
        len = this.decorators_list.length,
        name;

    for (i = 0; i < len; i += 1) {
        name = this.decorators_list[i];
        price = Sale.decorators[name].getPrice(price);
    };

    return price;
}

Sale.decorators = {};
Sale.decorators.fedtax = {
    getPrice: function (price) {
        return price + price * 5 / 100;
    }
}

export default Sale;
/*
import decorator2 from './lib/beokha-decorator-2.js';
let sale = new decorator2(123);

//sale.decorate('fedtax');
console.log(sale.decorate('fedtax').getPrice());*/
